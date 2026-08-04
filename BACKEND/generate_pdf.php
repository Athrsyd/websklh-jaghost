<?php

// Simple Raw PDF Generator in Pure PHP
function createSimplePdf(string $outputPath, string $text) {
    $pdfText = str_replace(["\r", "\n"], ["", "\\n"], $text);
    
    $content = "BT /F1 12 Tf 50 750 Td ($pdfText) Tj ET";
    $contentLength = strlen($content);
    
    $pdf = "%PDF-1.4\n";
    $pdf .= "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
    $pdf .= "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
    $pdf .= "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n";
    $pdf .= "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
    $pdf .= "5 0 obj\n<< /Length {$contentLength} >>\nstream\n{$content}\nendstream\nendobj\n";
    $pdf .= "xref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000060 00000 n \n0000000117 00000 n \n0000000244 00000 n \n0000000315 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n380\n%%EOF";
    
    file_put_contents($outputPath, $pdf);
}

$dir = __DIR__ . '/storage/app/knowledge';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$schoolKnowledgeText = "SMK Negeri 26 Jakarta (Pembangunan) merupakan Sekolah Menengah Kejuruan Negeri unggulan di Jakarta yang menyelenggarakan program keahlian bidang teknik, rekayasa, dan teknologi.";
createSimplePdf($dir . '/sekolah.pdf', $schoolKnowledgeText);

echo "sekolah.pdf created successfully at " . $dir . '/sekolah.pdf' . "\n";
