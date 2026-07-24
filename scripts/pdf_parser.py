import sys
import json
import pymupdf4llm
import fitz

def parse_pdf(file_path: str):
    try:
        # Load PDF using pymupdf
        doc = fitz.open(file_path)
        
        md_text = pymupdf4llm.to_markdown(doc)
        
        # Simplified structured parsing
        pages = []
        for i in range(len(doc)):
            page = doc[i]
            text = page.get_text("text")
            
            # Here you would ideally extract elements based on dict output,
            # but for this script we will use basic extraction to keep it robust.
            elements = [
                {"type": "paragraph", "text": text.strip()}
            ]
            
            pages.append({
                "page_number": i + 1,
                "text": text.strip(),
                "elements": elements
            })
            
        metadata = doc.metadata
        
        result = {
            "title": metadata.get("title", ""),
            "total_pages": len(doc),
            "extraction_method": "pymupdf",
            "extraction_confidence": 0.95,
            "pages": pages,
            "metadata": {
                "author": metadata.get("author", ""),
                "created": metadata.get("creationDate", ""),
                "subject": metadata.get("subject", "")
            }
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Missing PDF file path argument"}))
        sys.exit(1)
        
    parse_pdf(sys.argv[1])
