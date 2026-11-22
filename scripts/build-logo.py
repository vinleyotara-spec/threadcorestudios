#!/usr/bin/env python3
"""
Builds the Threadcore Studios logo files as clean vectors.

The mark was redrawn as geometry from the supplied artwork: a slanted navy T,
a white-outlined needle, and an orange thread loop. Text is converted to
outlines (Poppins ExtraBold / SemiBold, SIL Open Font License) so the SVGs
need no fonts installed and can go straight to printers and embroidery
digitisers.

Requirements: python3, `pip install fonttools uharfbuzz`
Run:          python3 scripts/build-logo.py
Writes:       public/brand/*.svg, lib/logo-geometry.ts, app/icon.svg
PNG exports and the brand board are rendered from these by scripts/export-brand.sh
"""
import math
import os
import urllib.request
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "public" / "brand"
FONTS = ROOT / "scripts" / ".fonts"
BRAND.mkdir(parents=True, exist_ok=True)
FONTS.mkdir(parents=True, exist_ok=True)

NAVY = "#0a2459"
ORANGE = "#fc7e18"
WHITE = "#ffffff"

# ---------------------------------------------------------------------------
# Fonts (downloaded once from the open-source google/fonts repository)
# ---------------------------------------------------------------------------
def font(name: str) -> str:
    p = FONTS / f"Poppins-{name}.ttf"
    if not p.exists():
        url = f"https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-{name}.ttf"
        urllib.request.urlretrieve(url, p)
    return str(p)


def text_path(fontfile, text, size, tracking=0.0):
    """Shape `text` (with kerning) and return (svg path data, advance width, cap height).
    The baseline sits at y=0 and the text starts at x=0."""
    face = hb.Face(hb.Blob.from_file_path(fontfile))
    hbfont = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": False})
    tt = TTFont(fontfile)
    gs, order = tt.getGlyphSet(), tt.getGlyphOrder()
    scale = size / face.upem
    x, parts = 0.0, []
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.1f}")
        gs[order[info.codepoint]].draw(TransformPen(pen, (scale, 0, 0, -scale, x + pos.x_offset * scale, 0)))
        parts.append(pen.getCommands())
        x += pos.x_advance * scale + tracking * size
    return " ".join(p for p in parts if p), x - tracking * size, tt["OS/2"].sCapHeight * scale


# ---------------------------------------------------------------------------
# The mark (coordinates are in the artwork's own 560 x 540 space)
# ---------------------------------------------------------------------------
def catmull_rom(pts, n=14):
    P = [pts[0]] + list(pts) + [pts[-1]]
    out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(n):
            t = k / n
            t2, t3 = t * t, t * t * t
            out.append(tuple(
                0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                       + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3) for j in (0, 1)))
    out.append(tuple(pts[-1]))
    return out


def ribbon(center, widths, n=14):
    """A smooth, variable-width ribbon along `center` (thin ends, thick middle)."""
    c = catmull_rom(center, n)
    w = [p[1] for p in catmull_rom([(i, v) for i, v in enumerate(widths)], n)]
    left, right = [], []
    for i, (x, y) in enumerate(c):
        a, b = c[max(i - 1, 0)], c[min(i + 1, len(c) - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]
        d = math.hypot(dx, dy) or 1
        nx, ny, h = -dy / d, dx / d, max(w[min(i, len(w) - 1)], 0) / 2
        left.append((x + nx * h, y + ny * h))
        right.append((x - nx * h, y - ny * h))
    pts = left + right[::-1]
    return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"


SWOOSH_CENTER = [(300, 82), (345, 45), (420, 25), (480, 38), (507, 85), (495, 140), (440, 190), (360, 215),
                 (270, 232), (170, 252), (90, 285), (38, 335), (35, 385), (68, 425), (125, 438), (165, 436)]
SWOOSH_WIDTH = [2, 7, 10, 12, 14, 14, 14, 15, 16, 17, 20, 22, 20, 14, 8, 3]
SWOOSH = ribbon(SWOOSH_CENTER, SWOOSH_WIDTH)

T_POINTS = [(48, 75), (443, 75), (425, 152), (300, 152), (300, 422), (166, 512), (176, 152), (22, 152)]
T_PATH = "M" + "L".join(f"{x} {y}" for x, y in T_POINTS) + "Z"

# Needle: built along an axis from the eye end to the point.
N0, N1 = (322, 98), (167, 510)
NL = math.hypot(N1[0] - N0[0], N1[1] - N0[1])
UX, UY = (N1[0] - N0[0]) / NL, (N1[1] - N0[1]) / NL
NX, NY = -UY, UX
HW = 18.5  # half-width of the needle at the eye end


def needle_outline():
    cx, cy = N0[0] + UX * HW, N0[1] + UY * HW
    cap = []
    for k in range(19):  # rounded eye end, swept over the top from the +normal side to the -normal side
        a = math.pi * k / 18
        cap.append((cx + NX * HW * math.cos(a) - UX * HW * math.sin(a), cy + NY * HW * math.cos(a) - UY * HW * math.sin(a)))
    right, left = [], []
    for i in range(45):
        s = HW + (NL - HW) * i / 44
        w = HW * (1 - (i / 44) ** 1.15)
        px, py = N0[0] + UX * s, N0[1] + UY * s
        right.append((px + NX * w, py + NY * w))
        left.append((px - NX * w, py - NY * w))
    pts = right[::-1] + cap + left
    return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"


NEEDLE = needle_outline()


def slot(s0, s1, hw):
    """Closed stadium-shaped outline for the needle's eye."""
    ax, ay = N0[0] + UX * s0, N0[1] + UY * s0
    bx, by = N0[0] + UX * s1, N0[1] + UY * s1
    pts = []
    for k in range(13):  # end cap at b
        a = math.pi * k / 12
        pts.append((bx + NX * hw * math.cos(a) + UX * hw * math.sin(a), by + NY * hw * math.cos(a) + UY * hw * math.sin(a)))
    for k in range(13):  # end cap at a
        a = math.pi + math.pi * k / 12
        pts.append((ax + NX * hw * math.cos(a) + UX * hw * math.sin(a), ay + NY * hw * math.cos(a) + UY * hw * math.sin(a)))
    return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"


EYE = slot(24, 76, 7.5)
MARK_VB = (12, 15, 510, 510)  # tight crop around the mark inside the 560x540 space
HALO = 9  # the white gap where the thread and needle cross the T


def mark_svg_body(uid, t=NAVY, orange=ORANGE, line=NAVY, halo=HALO):
    """Mark drawn with true knock-outs (masks), so it works on any background."""
    full = 'maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="560"'
    return (
        f'<defs>'
        f'<mask id="{uid}t" {full}><rect width="560" height="560" fill="#fff"/>'
        f'<path d="{SWOOSH}" fill="#000" stroke="#000" stroke-width="{halo * 2}" stroke-linejoin="round"/>'
        f'<path d="{NEEDLE}" fill="#000" stroke="#000" stroke-width="{halo * 2}" stroke-linejoin="round"/></mask>'
        f'<mask id="{uid}s" {full}><rect width="560" height="560" fill="#fff"/>'
        f'<path d="{NEEDLE}" fill="#000" stroke="#000" stroke-width="{halo * 2}" stroke-linejoin="round"/></mask>'
        f'</defs>'
        f'<path d="{T_PATH}" fill="{t}" mask="url(#{uid}t)"/>'
        f'<path d="{SWOOSH}" fill="{orange}" mask="url(#{uid}s)"/>'
        f'<path d="{NEEDLE}" fill="none" stroke="{line}" stroke-width="5" stroke-linejoin="round"/>'
        f'<path d="{EYE}" fill="none" stroke="{line}" stroke-width="4.5" stroke-linejoin="round"/>'
    )


def mark_standalone(uid="m", **kw):
    x, y, w, h = MARK_VB
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {w} {h}" width="{w}" height="{h}" '
            f'role="img" aria-label="Threadcore Studios">{mark_svg_body(uid, **kw)}</svg>\n')


# ---------------------------------------------------------------------------
# Lockups
# ---------------------------------------------------------------------------
def lockup(variant="primary", t=NAVY, orange=ORANGE, text=NAVY, line=NAVY, uid="l"):
    """variant: 'primary' (mark + name + STUDIOS) or 'full' (adds tagline and services)."""
    word, word_w, _ = text_path(font("ExtraBold"), "Threadcore", 196, tracking=-0.025)
    studios, studios_w, studios_cap = text_path(font("SemiBold"), "STUDIOS", 74, tracking=0.5)
    mx, my, mw, mh = MARK_VB
    x0 = mw + 64  # wordmark starts here (mark occupies 0..mw)
    base = 300
    studios_base = base + 40 + studios_cap
    centre = x0 + word_w / 2
    sx = centre - studios_w / 2
    gap = 36
    ly = studios_base - studios_cap / 2
    parts = [
        f'<g transform="translate({-mx} {-my})">{mark_svg_body(uid, t=t, orange=orange, line=line)}</g>',
        f'<path transform="translate({x0:.1f} {base})" d="{word}" fill="{text}"/>',
        f'<path transform="translate({sx:.1f} {studios_base:.1f})" d="{studios}" fill="{orange}"/>',
        f'<rect x="{x0:.1f}" y="{ly - 2.5:.1f}" width="{sx - gap - x0:.1f}" height="5" fill="{orange}"/>',
        f'<rect x="{sx + studios_w + gap:.1f}" y="{ly - 2.5:.1f}" width="{x0 + word_w - (sx + studios_w + gap):.1f}" height="5" fill="{orange}"/>',
    ]
    height = max(mh, studios_base + 12)
    width = x0 + word_w
    if variant == "full":
        tag, tag_w, tag_cap = text_path(font("SemiBoldItalic"), "We Print Your Identity", 66, tracking=0.02)
        tag_base = studios_base + 44 + tag_cap
        tx = centre - tag_w / 2
        under = ribbon([(tx + tag_w * 0.18, tag_base + 40), (tx + tag_w * 0.5, tag_base + 31), (tx + tag_w * 0.98, tag_base + 33)],
                       [1, 7, 1], n=16)
        svc_items = ["PRINTING", "BRANDING", "EMBROIDERY", "UNIFORMS"]
        svc_size, svc_track = 50, 0.16
        shaped = [text_path(font("Medium"), s, svc_size, svc_track) for s in svc_items]
        sep_gap = 34
        total = sum(w for _, w, _ in shaped) + (len(shaped) - 1) * (2 * sep_gap + 5)
        svc_base = max(mh, tag_base + 40) + 96
        cx = (width - total) / 2
        parts += [
            f'<path transform="translate({tx:.1f} {tag_base:.1f})" d="{tag}" fill="{text}"/>',
            f'<path d="{under}" fill="{orange}"/>',
        ]
        for i, (d, w, cap) in enumerate(shaped):
            parts.append(f'<path transform="translate({cx:.1f} {svc_base:.1f})" d="{d}" fill="{text}"/>')
            cx += w
            if i < len(shaped) - 1:
                parts.append(f'<rect x="{cx + sep_gap:.1f}" y="{svc_base - cap - 4:.1f}" width="5" height="{cap + 8:.1f}" fill="{orange}"/>')
                cx += 2 * sep_gap + 5
        height = svc_base + 24
    pad = 20
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad} {-pad} {width + 2 * pad:.0f} {height + 2 * pad:.0f}" '
            f'width="{width + 2 * pad:.0f}" height="{height + 2 * pad:.0f}" role="img" aria-label="Threadcore Studios">'
            f'{"".join(parts)}</svg>\n')


# ---------------------------------------------------------------------------
# Simplified icon for very small sizes (favicon, app icon)
# ---------------------------------------------------------------------------
def icon_svg():
    # A chunkier T + thread loop on a navy badge. The needle is dropped: it cannot be read at 16 px.
    t_big = [(60, 70), (452, 70), (430, 166), (326, 166), (326, 430), (200, 520), (206, 166), (44, 166)]
    tp = "M" + "L".join(f"{x} {y}" for x, y in t_big) + "Z"
    widths = [w * 1.45 for w in SWOOSH_WIDTH]
    sw = ribbon(SWOOSH_CENTER, widths)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
            f'<rect width="100" height="100" rx="22" fill="{NAVY}"/>'
            f'<g transform="translate(12 12) scale(.152)">'
            f'<defs><mask id="i" maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="560"><rect width="560" height="560" fill="#fff"/>'
            f'<path d="{sw}" fill="#000" stroke="#000" stroke-width="22" stroke-linejoin="round"/></mask></defs>'
            f'<path d="{tp}" fill="{WHITE}" mask="url(#i)"/><path d="{sw}" fill="{ORANGE}"/></g></svg>\n')


def write(name, content):
    (BRAND / name).write_text(content)


# ---------------------------------------------------------------------------
# Outputs
# ---------------------------------------------------------------------------
write("threadcore-mark.svg", mark_standalone("a"))
write("threadcore-mark-reversed.svg", mark_standalone("b", t=WHITE, line=WHITE))
write("threadcore-mark-navy.svg", mark_standalone("c", orange=NAVY))
write("threadcore-mark-white.svg", mark_standalone("d", t=WHITE, orange=WHITE, line=WHITE))
write("threadcore-logo.svg", lockup("primary", uid="e"))
write("threadcore-logo-full.svg", lockup("full", uid="f"))
write("threadcore-logo-reversed.svg", lockup("primary", t=WHITE, text=WHITE, line=WHITE, uid="g"))
write("threadcore-logo-full-reversed.svg", lockup("full", t=WHITE, text=WHITE, line=WHITE, uid="h"))
write("threadcore-logo-navy.svg", lockup("primary", orange=NAVY, uid="i"))
write("threadcore-logo-white.svg", lockup("primary", t=WHITE, orange=WHITE, text=WHITE, line=WHITE, uid="j"))
(ROOT / "app" / "icon.svg").write_text(icon_svg())

(ROOT / "lib" / "logo-geometry.ts").write_text(f'''// GENERATED by scripts/build-logo.py. Do not edit by hand.
export const LOGO_VIEWBOX = "{MARK_VB[0]} {MARK_VB[1]} {MARK_VB[2]} {MARK_VB[3]}";
export const LOGO_FIELD = 560;
export const LOGO_HALO = {HALO};
export const LOGO_T = "{T_PATH}";
export const LOGO_SWOOSH = "{SWOOSH}";
export const LOGO_NEEDLE = "{NEEDLE}";
export const LOGO_EYE = "{EYE}";
''')
print("Logo files written to", BRAND)
