<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$pipeline = app(App\RAG\Pipeline\RagPipeline::class);
$query = "Apa keunggulan dan jurusan di SMKN 26 Jakarta?";
echo "QUERY: " . $query . "\n\n";

$result = $pipeline->query($query);

echo "================ ANSWER ================\n";
echo $result->answer . "\n\n";
echo "================ CITATIONS ================\n";
print_r($result->citations);
echo "\n================ RETRIEVAL STATS ================\n";
echo "Confidence Score: " . $result->confidenceScore . "\n";
echo "Execution Time: " . $result->retrievalLatencyMs . " ms\n";
