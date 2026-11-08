import os
import sys
import socket
import webbrowser
import threading
import time

def get_local_ip():
    """Finds the local network / Wi-Fi IP address of this laptop."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # Doesn't need to actually connect to external network
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def open_browser_delayed(url, delay=1.2):
    def _open():
        time.sleep(delay)
        print(f"Opening browser at {url} ...")
        webbrowser.open(url)
    t = threading.Thread(target=_open, daemon=True)
    t.start()

def main():
    local_ip = get_local_ip()
    port = 8000
    local_url = f"http://localhost:{port}"
    lan_url = f"http://{local_ip}:{port}"

    print("\n" + "=" * 68)
    print("   🛡️  GulfRay® Medical - Saudi Factory & Product Showcase (Local Mode)")
    print("=" * 68)
    print(f"   💻 On this laptop:             {local_url}")
    if local_ip != "127.0.0.1":
        print(f"   📱 On any other laptop/tablet: {lan_url}")
        print("   ℹ️  (Ensure the other device is on the same Wi-Fi or mobile hotspot)")
    print("=" * 68)
    print("   Press CTRL+C anytime to stop the local showcase.")
    print("=" * 68 + "\n")

    # Auto-open browser
    open_browser_delayed(local_url)

    # Launch Uvicorn on 0.0.0.0 so other laptops on the same Wi-Fi can connect
    try:
        import uvicorn
        uvicorn.run("server:app", host="0.0.0.0", port=port, reload=False, log_level="info")
    except ImportError:
        print("Uvicorn not found in current environment. Opening static HTML directly...")
        index_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "static", "index.html"))
        webbrowser.open(f"file:///{index_path}")

if __name__ == "__main__":
    main()
