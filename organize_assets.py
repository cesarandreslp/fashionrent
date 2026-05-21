import os
import shutil
import glob

def organize():
    # Workspace path
    workspace_dir = r"c:\Projects\fashionrent"
    assets_dir = os.path.join(workspace_dir, "assets")
    os.makedirs(assets_dir, exist_ok=True)
    
    # Brain directory path (from app data)
    brain_dir = r"C:\Users\Cesar\.gemini\antigravity\brain\c0587755-f16c-49ed-bc5d-f352f5b07bc6"
    
    print(f"Scanning brain directory: {brain_dir}")
    if not os.path.exists(brain_dir):
        print("Brain directory does not exist.")
        return
        
    files = glob.glob(os.path.join(brain_dir, "*.png"))
    print(f"Found {len(files)} PNG files in brain dir.")
    
    for f in files:
        filename = os.path.basename(f)
        dest_name = ""
        if "dg_dress" in filename:
            dest_name = "dg_dress.png"
        elif "lv_dress" in filename:
            dest_name = "lv_dress.png"
        elif "versace_dress" in filename:
            dest_name = "versace_dress.png"
        elif "silvia_dress" in filename:
            dest_name = "silvia_dress.png"
        else:
            dest_name = filename
            
        dest_path = os.path.join(assets_dir, dest_name)
        shutil.copy2(f, dest_path)
        print(f"Copied {filename} to {dest_path}")

if __name__ == "__main__":
    organize()
