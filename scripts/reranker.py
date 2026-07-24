import os
import sys
import json

if 'USERNAME' not in os.environ:
    os.environ['USERNAME'] = os.environ.get('USER', 'lenovo')

os.environ["OMP_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["OPENBLAS_NUM_THREADS"] = "1"
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

from sentence_transformers import CrossEncoder

def main():
    try:
        input_data = sys.stdin.readline()
        if not input_data or not input_data.strip():
            input_data = sys.stdin.read()

        if not input_data or not input_data.strip():
            print(json.dumps({"error": "No input provided"}))
            return
            
        data = json.loads(input_data.strip())
        query = data.get('query')
        documents = data.get('documents', [])
        
        if not query or not documents:
            print(json.dumps({"error": "Missing query or documents"}))
            return
            
        model_name = 'cross-encoder/ms-marco-MiniLM-L-6-v2'
        try:
            model = CrossEncoder(model_name, local_files_only=True)
        except Exception:
            model = CrossEncoder(model_name)
        
        pairs = [[query, doc] for doc in documents]
        scores = model.predict(pairs)
        
        results = []
        for i, score in enumerate(scores):
            results.append({
                "index": i,
                "score": float(score),
                "text": documents[i]
            })
            
        results = sorted(results, key=lambda x: x['score'], reverse=True)
        
        print(json.dumps({
            "results": results,
            "model": model_name
        }))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
