<?php

declare(strict_types=1);

return [
    'embedding' => [
        'provider' => env('RAG_EMBEDDING_PROVIDER', 'gemini'),
        'model' => env('RAG_EMBEDDING_MODEL', 'gemini-embedding-001'),
        'dimensions' => (int) env('RAG_EMBEDDING_DIMENSIONS', 384),
        'batch_size' => (int) env('RAG_EMBEDDING_BATCH_SIZE', 32),
        'huggingface_api_key' => env('HUGGINGFACE_API_KEY'),
    ],
    
    'llm' => [
        'provider' => env('RAG_LLM_PROVIDER', 'gemini'),
        'model' => env('RAG_LLM_MODEL', 'gemini-1.5-flash'),
        'temperature' => (float) env('RAG_LLM_TEMPERATURE', 0.1),
        'max_tokens' => (int) env('RAG_LLM_MAX_TOKENS', 2048),
        'providers' => [
            'groq' => [
                'api_key' => env('GROQ_API_KEY'),
                'model' => env('GROQ_MODEL', 'llama-3.3-70b-versatile'),
                'base_url' => env('GROQ_BASE_URL', 'https://api.groq.com/openai/v1'),
            ],
            'gemini' => [
                'api_key' => env('GEMINI_API_KEY'),
                'model' => env('GEMINI_MODEL', env('RAG_LLM_MODEL', 'gemini-1.5-flash')),
            ],
        ],
    ],
    
    'retrieval' => [
        'dense_top_k' => (int) env('RAG_DENSE_TOP_K', 50),
        'sparse_top_k' => (int) env('RAG_SPARSE_TOP_K', 50),
        'rrf_k' => (int) env('RAG_RRF_K', 60),
        'rerank_top_n' => (int) env('RAG_RERANK_TOP_N', 5),
        'confidence_threshold' => (float) env('RAG_CONFIDENCE_THRESHOLD', 0.01),
        'reranker_threshold' => (float) env('RAG_RERANKER_THRESHOLD', 0.1),
    ],
    
    'chunking' => [
        'min_tokens' => (int) env('RAG_CHUNK_MIN_TOKENS', 100),
        'max_tokens' => (int) env('RAG_CHUNK_MAX_TOKENS', 512),
        'parent_max_tokens' => (int) env('RAG_CHUNK_PARENT_MAX_TOKENS', 2048),
        'overlap_tokens' => (int) env('RAG_CHUNK_OVERLAP_TOKENS', 50),
    ],
    
    'ingestion' => [
        'queue' => env('RAG_INGESTION_QUEUE', 'rag-ingestion'),
        'retry' => (int) env('RAG_INGESTION_RETRY', 3),
        'backoff' => [30, 60, 120],
    ],
    
    'logging' => [
        'channel' => env('RAG_LOG_CHANNEL', 'rag'),
    ],
    
    'confidence' => [
        'min_score' => (float) env('RAG_CONFIDENCE_MIN_SCORE', 0.01),
        'min_chunks' => (int) env('RAG_CONFIDENCE_MIN_CHUNKS', 1),
        'no_answer_message' => env('RAG_NO_ANSWER_MESSAGE', 'Maaf, informasi tersebut tidak ditemukan dalam basis pengetahuan SMKN 26 Jakarta.'),
    ],
];
