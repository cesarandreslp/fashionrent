import zipfile
import xml.etree.ElementTree as ET
import os

def get_docx_text(path):
    try:
        if not os.path.exists(path):
            return f"Error: File {path} not found."
        
        doc = zipfile.ZipFile(path)
        xml_content = doc.read('word/document.xml')
        root = ET.fromstring(xml_content)
        
        text_parts = []
        w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
        
        for elem in root.iter():
            if elem.tag == f'{{{w_ns}}}p':
                text_parts.append('\n')
            elif elem.tag == f'{{{w_ns}}}t':
                if elem.text:
                    text_parts.append(elem.text)
            elif elem.tag == f'{{{w_ns}}}tab':
                text_parts.append('\t')
            elif elem.tag == f'{{{w_ns}}}cr':
                text_parts.append('\n')
                
        return ''.join(text_parts).strip()
    except Exception as e:
        import traceback
        return f"Error: {str(e)}\n{traceback.format_exc()}"

if __name__ == "__main__":
    text = get_docx_text("Propuesta Maria Paula Orejuela.docx")
    with open("propuesta.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully wrote propuesta.txt")
