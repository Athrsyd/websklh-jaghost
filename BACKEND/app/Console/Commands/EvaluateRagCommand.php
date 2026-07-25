<?php
declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\RAG\Pipeline\RagPipeline;

class EvaluateRagCommand extends Command
{
    protected $signature = 'rag:evaluate';
    protected $description = 'Evaluate RAG pipeline using golden dataset';

    public function handle(RagPipeline $pipeline): int
    {
        $path = storage_path('app/knowledge/golden_dataset.json');
        if (!file_exists($path)) {
            $this->error("Golden dataset not found at $path");
            return 1;
        }

        $dataset = json_decode(file_get_contents($path), true);
        $total = count($dataset);
        $this->info("Evaluating $total questions...");

        $bar = $this->output->createProgressBar($total);
        $results = [];

        foreach ($dataset as $item) {
            $res = $pipeline->query($item['question']);
            $results[] = [
                'question' => $item['question'],
                'answer' => $res->answer,
                'latency' => $res->retrievalLatencyMs
            ];
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->table(['Question', 'Answer', 'Latency (ms)'], $results);

        return 0;
    }
}