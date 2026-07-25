<?php

require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Process\Process;

$process = new Process(['python', '-u', 'scripts/embedding_server.py']);
$process->setInput(json_encode([
    'action' => 'embed',
    'texts' => ['Apa jurusan di SMKN 26 Jakarta?']
]) . "\n");

$start = microtime(true);
$process->run();
$duration = microtime(true) - $start;

echo "DURATION: " . round($duration, 3) . "s\n";
echo "OUTPUT: " . substr($process->getOutput(), 0, 150) . "...\n";
if (!$process->isSuccessful()) {
    echo "ERROR: " . $process->getErrorOutput() . "\n";
}
