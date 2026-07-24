<?php

declare(strict_types=1);

namespace App\AI\Providers;

use App\AI\Contracts\RerankerProviderInterface;
use App\DTO\RerankedDocument;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;
use RuntimeException;
use Throwable;

/**
 * Local reranker provider calling a Python script.
 */
readonly class LocalRerankerProvider implements RerankerProviderInterface
{
    private string $scriptPath;

    public function __construct()
    {
        $this->scriptPath = base_path('scripts/reranker.py');
    }

    public function model(): string
    {
        return 'ms-marco-MiniLM-L-6-v2';
    }

    /**
     * @param string $query
     * @param array<string> $documents
     * @return array<RerankedDocument>
     */
    public function rerank(string $query, array $documents): array
    {
        if (empty($documents)) {
            return [];
        }

        try {
            $payload = json_encode([
                'query' => $query,
                'documents' => $documents,
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

            $results = [];
            foreach ($data['results'] ?? [] as $res) {
                $results[] = new RerankedDocument(
                    index: (int)$res['index'],
                    text: (string)$res['text'],
                    score: (float)$res['score']
                );
            }

            return $results;
        } catch (Throwable $e) {
            Log::channel('rag')->error('LocalRerankerProvider error', [
                'error' => $e->getMessage(),
            ]);
            throw new RuntimeException('Failed to rerank documents: ' . $e->getMessage(), 0, $e);
        }
    }
}
