<?php

namespace Tests\Feature;

use Tests\TestCase;

class RagApiTest extends TestCase
{
    public function test_api_docs_endpoint_returns_200(): void
    {
        $response = $this->get('/api/docs');
        $response->assertStatus(200);
        $response->assertSee('Dokumentasi API');
        $response->assertSee('/api/v1/chat/completions');
    }

    public function test_get_documents_endpoint(): void
    {
        $response = $this->getJson('/api/v1/documents');
        $response->assertStatus(200);
        $response->assertJsonIsArray();
    }

    public function test_chat_completions_validation_error(): void
    {
        $response = $this->postJson('/api/v1/chat/completions', []);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['messages']);
    }

    public function test_chat_completions_live_rag_query(): void
    {
        $payload = [
            'messages' => [
                ['role' => 'user', 'content' => 'Apa itu SMKN 26 Jakarta?']
            ],
            'stream' => false
        ];

        $response = $this->postJson('/api/v1/chat/completions', $payload);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'object',
            'created',
            'model',
            'choices' => [
                [
                    'index',
                    'message' => [
                        'role',
                        'content'
                    ],
                    'finish_reason'
                ]
            ],
            'citations',
            'retrieval_metadata' => [
                'trace_id',
                'confidence_score',
                'retrieval_latency_ms'
            ]
        ]);

        $content = $response->json('choices.0.message.content');
        $this->assertNotEmpty($content);
    }
}
