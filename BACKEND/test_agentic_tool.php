<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\RAG\Pipeline\RagPipeline;
use App\RAG\Tools\NavigationTool;

echo "========================================================================\n";
echo "           UJI AGENTIC AI NAVIGATION TOOL (NAVIGASI WEB)                \n";
echo "========================================================================\n\n";

// 1. Test NavigationTool Schema & Definition
echo "1. Cek Definisi NavigationTool Schema:\n";
$def = NavigationTool::getDefinition();
echo json_encode($def, JSON_PRETTY_PRINT) . "\n\n";

// 2. Test NavigationTool Resolution
echo "2. Test Resolusi Rute 'tentang' dengan section 'mars-smkn26':\n";
$resolved = NavigationTool::resolve('tentang', 'mars-smkn26');
echo json_encode($resolved, JSON_PRETTY_PRINT) . "\n\n";

// 3. Test Live Query via RagPipeline
$pipeline = app(RagPipeline::class);
$userQuery = "dimana halaman mars smk26 apa ya?";

echo "3. Mengeksekusi Query User: \"{$userQuery}\"\n";
$result = $pipeline->query($userQuery);

echo "------------------------------------------------------------------------\n";
echo "JAWABAN:\n" . ($result->answer ?: "[Hanya Tool Call dikembalikan]") . "\n\n";
echo "TOOL CALLS:\n";
if (!empty($result->toolCalls)) {
    echo json_encode($result->toolCalls, JSON_PRETTY_PRINT) . "\n\n";
} else {
    echo "[Tidak ada tool call dipanggil]\n\n";
}
echo "FINISH REASON : " . $result->finishReason . "\n";
echo "CONFIDENCE    : " . $result->confidenceScore . "\n";
echo "SITASI        : " . count($result->citations) . " item\n";
echo "========================================================================\n";
