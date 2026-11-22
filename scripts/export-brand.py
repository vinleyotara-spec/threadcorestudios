#!/usr/bin/env python3
"""
Renders the logo PNGs from the SVGs written by build-logo.py, using headless
Google Chrome (macOS path below). Transparent backgrounds except the profile
picture. Run after build-logo.py:

    python3 scripts/export-brand.py
"""
import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "public" / "brand"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def dims(svg: Path):
    s = svg.read_text()
    return int(float(re.search(r'width="([\d.]+)"', s).group(1))), int(float(re.search(r'height="([\d.]+)"', s).group(1)))


def shot(html: str, out: Path, w: int, h: int, transparent=True):
    with tempfile.TemporaryDirectory() as d:
        page = Path(d) / "p.html"
        page.write_text(html)
        args = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                f"--window-size={w},{h}", f"--screenshot={out}", f"file://{page}"]
        if transparent:
            args.insert(5, "--default-background-color=00000000")
        subprocess.run(args, capture_output=True, check=True)


for name in ["threadcore-logo", "threadcore-logo-reversed", "threadcore-logo-full", "threadcore-logo-full-reversed", "threadcore-mark",
             "threadcore-mark-reversed"]:
    svg = BRAND / f"{name}.svg"
    w, h = dims(svg)
    shot(f'<html><body style="margin:0;background:transparent"><img src="file://{svg}" width="{w}" height="{h}" style="display:block"></body></html>',
         BRAND / f"{name}.png", w, h)

# Profile picture (WhatsApp / Instagram / Facebook crop this to a circle): navy square, reversed mark centred.
mark = BRAND / "threadcore-mark-reversed.svg"
shot(f'<html><body style="margin:0;background:#0a2459;width:512px;height:512px;display:flex;align-items:center;justify-content:center">'
     f'<img src="file://{mark}" width="330"></body></html>', BRAND / "threadcore-profile.png", 512, 512, transparent=False)

# Apple touch icon (180x180) from the profile picture
subprocess.run(["sips", "-z", "180", "180", str(BRAND / "threadcore-profile.png"), "--out", str(ROOT / "app" / "apple-icon.png")],
               capture_output=True, check=True)
print("PNG exports written to", BRAND)
