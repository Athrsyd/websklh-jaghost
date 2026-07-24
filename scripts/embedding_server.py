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

from sentence_transformers import SentenceTransformer

def main():
    try:
        input_data = sys.stdin.readline()
        if not input_data or not input_data.strip():
            input_data = sys.stdin.read()
            
        if not input_data or not input_data.strip():
            print(json.dumps({"error": "No input provided"}))
            return
            
        data = json.loads(input_data.strip())
        
        if data.get('action') != 'embed':
            print(json.dumps({"error": "Invalid action"}))
            return
            
        texts = data.get('texts', [])
        if not texts:
            print(json.dumps({"error": "No texts provided"}))
            return
            
        model_name = 'paraphrase-multilingual-MiniLM-L12-v2'
        try:
            model = SentenceTransformer(model_name, local_files_only=True)
        except Exception:
            model = SentenceTransformer(model_name)
        
        embeddings = model.encode(texts, convert_to_numpy=True).tolist()
        
        result = {
            "embeddings": embeddings,
            "model": model_name,
            "dimensions": 384
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
