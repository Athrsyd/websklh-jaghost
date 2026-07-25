<?php
declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Jobs\ProcessDocumentIngestion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DocumentController extends Controller
{
    public function ingest(Request $request): JsonResponse
    {
        $request->validate(['file_path' => 'required|string']);
        
        $id = Str::uuid()->toString();
        
        DB::table('documents')->insert([
            'id' => $id,
            'file_path' => $request->input('file_path'),
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        ProcessDocumentIngestion::dispatch($id, $request->input('file_path'));

        return response()->json(['id' => $id, 'status' => 'ingestion_started']);
    }

    public function index(): JsonResponse
    {
        $docs = DB::table('documents')->get();
        return response()->json($docs);
    }

    public function status(string $id): JsonResponse
    {
        $doc = DB::table('documents')->where('id', $id)->first();
        if (!$doc) {
            return response()->json(['error' => 'Not found'], 404);
        }
        return response()->json(['id' => $id, 'status' => $doc->status]);
    }

    public function destroy(string $id): JsonResponse
    {
        DB::table('documents')->where('id', $id)->delete();
        return response()->json(['status' => 'deleted']);
    }
}