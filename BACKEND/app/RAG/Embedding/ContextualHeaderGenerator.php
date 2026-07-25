<?php

declare(strict_types=1);

namespace App\RAG\Embedding;

use App\AI\Contracts\LlmProviderInterface;
use App\DTO\ChunkData;
use Illuminate\Support\Facades\Log;

/**
 * Class ContextualHeaderGenerator
 * 
 * Generates contextual headers for chunks using an LLM.
 */
readonly class ContextualHeaderGenerator
{
    /**
     * @param LlmProviderInterface $llmProvider
     */
    public function __construct(private LlmProviderInterface $llmProvider)
    {
    }

    /**
     * Generates a contextual header for a chunk.
     *
     * @param ChunkData $chunk
     * @param string $fullDocumentContext
     * @return string
     */
    public function generate(ChunkData $chunk, string $fullDocumentContext): string
    {
        $prompt = <<<EOT
<document>
{$fullDocumentContext}
</document>

Here is the chunk we want to situate within the whole document:
<chunk>
{$chunk->text}
</chunk>

Please give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk. Answer only with the succinct context and nothing else.
EOT;

        $header = $this->llmProvider->generateText($prompt);

        Log::channel('rag')->info('Contextual header generated', [
            'chunk_id' => $chunk->id,
            'header_length' => strlen($header)
        ]);

        return trim($header);
    }
}
