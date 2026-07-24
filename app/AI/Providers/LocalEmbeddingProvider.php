<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\EmbeddingProviderInterface;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;
use RuntimeException;
use Throwable;

/**
 * Local embedding provider calling a Python script.
 */
readonly class LocalEmbeddingProvider implements EmbeddingProviderInterface
{
    private string $scriptPath;

    public function __construct()
    {
        $this->scriptPath = base_path('scripts/embedding_server.py');
    }

    public function embed(string $text): array
    {
        $results = $this->embedBatch([$text]);
        return $results[0] ?? [];
    }

    /**
     * @param array<string> $texts
     * @return array<int, array<float>>
     */
    public function embedBatch(array $texts): array
    {
        if (empty($texts)) {
            return [];
        }

        $allEmbeddings = [];
        $batches = array_chunk($texts, 50);

        foreach ($batches as $batch) {
            try {
                $payload = json_encode([
                    'action' => 'embed',
                    'texts' => array_values($batch),
                ], JSON_THROW_ON_ERROR);

                $pythonBinary = config('rag.pdf_parser.python_path', 'python');

                $env = array_merge(
                    getenv(),
                    [
                        'USERNAME' => getenv('USERNAME') ?: get_current_user(),
                        'USERPROFILE' => getenv('USERPROFILE') ?: ('C:\\Users\\' . get_current_user()),
                        'SYSTEMROOT' => getenv('SYSTEMROOT') ?: 'C:\\Windows',
                        'SystemRoot' => getenv('SystemRoot') ?: 'C:\\Windows',
                        'PATH' => getenv('PATH') ?: 'C:\\Windows\\system32;C:\\Windows',
                        'OMP_NUM_THREADS' => '1',
                        'TOKENIZERS_PARALLELISM' => 'false',
                        'HF_HUB_DISABLE_SYMLINKS_WARNING' => '1',
                    ]
                );

                $process = new Process(['cmd', '/c', $pythonBinary, '-u', $this->scriptPath], null, $env);
                $process->setInput($payload . "\n");
                $process->setTimeout(600);
                $process->run();

                if (!$process->isSuccessful()) {
                    $err = $process->getErrorOutput();
                    throw new RuntimeException("Process failed [exit {$process->getExitCode()}]: " . ($err ?: $process->getOutput()));
                }

                $output = trim($process->getOutput());
                $data = json_decode($output, true, 512, JSON_THROW_ON_ERROR);

                if (isset($data['error'])) {
                    throw new RuntimeException($data['error']);
                }

                $batchEmbeddings = $data['embeddings'] ?? [];
                foreach ($batchEmbeddings as $emb) {
                    $allEmbeddings[] = $emb;
                }
            } catch (Throwable $e) {
                Log::channel('rag')->error('LocalEmbeddingProvider error', [
                    'error' => $e->getMessage(),
                ]);
                throw new RuntimeException('Failed to generate embeddings: ' . $e->getMessage(), 0, $e);
            }
        }

        return $allEmbeddings;
    }

    public function dimensions(): int
    {
        return 384;
    }

    public function model(): string
    {
        return 'paraphrase-multilingual-MiniLM-L12-v2';
    }

    public function version(): string
    {
        return '1.0';
    }
}
