/**
 * Generates the TEMPORARY placeholder illustrations in public/images/placeholders.
 * They exist only so the site looks finished before real photography is
 * available. Replace them by dropping real photos in /public/images and
 * updating the `image` paths in lib/services.ts and lib/portfolio.ts.
 *
 * Run: node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "placeholders");
mkdirSync(OUT, { recursive: true });

// Neutral base + one accent (matches --brand-accent in app/globals.css)
const palettes = {
  sand: { bg: "#ECE7DE", bg2: "#E1DACD", main: "#FBFAF6", shade: "#E4DDCF", detail: "#1B1A18", accent: "#C23B1F" },
  stone: { bg: "#DCD8D0", bg2: "#CFCAC0", main: "#F4F1EA", shade: "#DDD7CA", detail: "#1B1A18", accent: "#C23B1F" },
  ink: { bg: "#1A1917", bg2: "#262421", main: "#55514C", shade: "#413E3A", detail: "#F4F0E8", accent: "#E4573A" },
  clay: { bg: "#C23B1F", bg2: "#B03319", main: "#FBFAF6", shade: "#EAE3D5", detail: "#1B1A18", accent: "#1B1A18" },
};

// ---- helpers ---------------------------------------------------------------

const stitchAttrs = (color, w = 5) =>
  `fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="14 9"`;

/** Brand motif: a ring with a solid core. Stitched variant for embroidery. */
function mark(cx, cy, r, p, { stitched = false } = {}) {
  const ring = stitched
    ? `<circle cx="${cx}" cy="${cy}" r="${r}" ${stitchAttrs(p.accent, Math.max(4, r / 10))}/>`
    : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${p.accent}" stroke-width="${Math.max(5, r / 7)}"/>`;
  const core = stitched
    ? `<circle cx="${cx}" cy="${cy}" r="${r * 0.46}" ${stitchAttrs(p.detail, Math.max(4, r / 10))}/>`
    : `<circle cx="${cx}" cy="${cy}" r="${r * 0.46}" fill="${p.detail}"/>`;
  return ring + core;
}

function bars(x, y, widths, p, { h = 10, gap = 22, color, opacity = 1 } = {}) {
  return widths
    .map(
      (w, i) =>
        `<rect x="${x}" y="${y + i * (h + gap)}" width="${w}" height="${h}" rx="${h / 2}" fill="${color ?? p.detail}" opacity="${opacity}"/>`,
    )
    .join("");
}

function halftone(cx, cy, cols, rows, step, maxR, color) {
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = cx + (c - (cols - 1) / 2) * step;
      const y = cy + (r - (rows - 1) / 2) * step;
      const dist = Math.hypot(c - (cols - 1) / 2, r - (rows - 1) / 2) / Math.hypot(cols / 2, rows / 2);
      const radius = Math.max(1.5, maxR * (1 - dist * 0.85));
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(1)}" fill="${color}"/>`;
    }
  }
  return out;
}

function regMarks(p) {
  const pts = [[130, 150], [870, 150], [130, 850], [870, 850]];
  return pts
    .map(
      ([x, y]) =>
        `<g stroke="${p.detail}" stroke-opacity=".28" stroke-width="2" fill="none"><circle cx="${x}" cy="${y}" r="11"/><path d="M${x - 22} ${y}h44M${x} ${y - 22}v44"/></g>`,
    )
    .join("");
}

function wrap(p, body, { shadow = true } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" role="img" aria-label="Placeholder illustration">
<rect width="1000" height="1000" fill="${p.bg}"/>
<circle cx="500" cy="500" r="390" fill="${p.bg2}"/>
${regMarks(p)}
${shadow ? `<ellipse cx="500" cy="852" rx="270" ry="20" fill="#000" opacity=".14"/>` : ""}
${body}
</svg>`;
}

// ---- shapes ----------------------------------------------------------------

function tee(p, { stitch = false } = {}) {
  return `
<path d="M345 235 L430 205 Q500 270 570 205 L655 235 L800 345 L735 432 L670 388 L670 812 L330 812 L330 388 L265 432 L200 345 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M432 208 Q500 282 568 208" fill="none" stroke="${p.shade}" stroke-width="14" stroke-linecap="round"/>
<path d="M345 235 L330 388 M655 235 L670 388" stroke="${p.shade}" stroke-width="3" fill="none"/>
${mark(500, 490, 80, p, { stitched: stitch })}
${bars(430, 610, [140, 90], p, { h: 10, gap: 16 })}`;
}

function hoodie(p) {
  return `
<path d="M300 300 L370 262 L630 262 L700 300 L815 700 L742 732 L692 520 L682 832 L318 832 L308 520 L258 732 L185 700 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M368 268 C340 130 660 130 632 268 C590 225 410 225 368 268 Z" fill="${p.shade}" stroke="${p.shade}" stroke-width="3"/>
<ellipse cx="500" cy="252" rx="92" ry="48" fill="${p.bg2}"/>
<path d="M468 292 L462 410 M532 292 L538 410" stroke="${p.detail}" stroke-width="6" stroke-linecap="round" opacity=".7"/>
<circle cx="462" cy="416" r="9" fill="${p.detail}" opacity=".7"/><circle cx="538" cy="416" r="9" fill="${p.detail}" opacity=".7"/>
<path d="M375 610 L625 610 L668 730 L332 730 Z" fill="none" stroke="${p.shade}" stroke-width="4"/>
${mark(500, 500, 52, p)}`;
}

function polo(p) {
  return `
<path d="M345 235 L430 205 L500 272 L570 205 L655 235 L800 345 L735 432 L670 388 L670 812 L330 812 L330 388 L265 432 L200 345 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M430 205 L388 258 L488 332 L500 272 Z" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".25" stroke-width="2"/>
<path d="M570 205 L612 258 L512 332 L500 272 Z" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".25" stroke-width="2"/>
<rect x="488" y="272" width="24" height="180" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<circle cx="500" cy="332" r="6" fill="${p.detail}" opacity=".6"/><circle cx="500" cy="392" r="6" fill="${p.detail}" opacity=".6"/>
${mark(596, 470, 38, p, { stitched: true })}`;
}

function jacket(p) {
  return `
<path d="M362 248 L440 214 L500 262 L560 214 L638 248 L722 292 L816 722 L746 752 L702 522 L692 832 L308 832 L298 522 L254 752 L184 722 L278 292 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M440 214 L398 276 L492 338 L500 262 Z" fill="${p.shade}"/>
<path d="M560 214 L602 276 L508 338 L500 262 Z" fill="${p.shade}"/>
<path d="M500 262 L500 832" stroke="${p.detail}" stroke-width="5" stroke-dasharray="10 6" opacity=".8"/>
<path d="M360 650 L430 720 M640 650 L570 720" stroke="${p.detail}" stroke-opacity=".35" stroke-width="4" stroke-linecap="round"/>
${mark(612, 430, 36, p, { stitched: true })}`;
}

function cap(p) {
  return `
<path d="M240 592 C240 330 760 330 760 592 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M500 346 L500 592 M392 366 Q344 470 340 592 M608 366 Q656 470 660 592" fill="none" stroke="${p.shade}" stroke-width="3"/>
<path d="M214 592 Q500 538 786 592 Q822 696 500 730 Q178 696 214 592 Z" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".18" stroke-width="3"/>
<circle cx="500" cy="352" r="15" fill="${p.detail}" opacity=".85"/>
${mark(500, 476, 58, p, { stitched: true })}`;
}

function cards(p) {
  const front = `
<g transform="rotate(7) translate(-250 -140)"><rect width="500" height="290" rx="14" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
${mark(82, 82, 30, p)}
${bars(52, 160, [210, 150, 110], p, { h: 9, gap: 16 })}
<rect x="372" y="206" width="84" height="40" rx="8" fill="${p.accent}"/></g>`;
  return `
<g transform="translate(500 500)">
<g transform="rotate(-13) translate(-250 -130)"><rect width="500" height="290" rx="14" fill="${p.accent}"/></g>
<g transform="rotate(-4) translate(-250 -150)"><rect width="500" height="290" rx="14" fill="${p.detail}"/>
${bars(56, 70, [200, 130], { detail: p.bg }, { h: 10, gap: 18, opacity: 0.85 })}
<circle cx="410" cy="200" r="34" fill="none" stroke="${p.accent}" stroke-width="8"/></g>
${front}
</g>`;
}

function flyers(p) {
  const sheet = (rot, x, y, tone) => `
<g transform="translate(${x} ${y}) rotate(${rot})"><rect width="340" height="470" rx="8" fill="${tone}" stroke="${p.shade}" stroke-width="3"/>
<rect x="30" y="34" width="280" height="150" rx="6" fill="${p.accent}"/>
${halftone(170, 109, 12, 6, 22, 8, p.main)}
${bars(30, 220, [230, 190, 150, 210], p, { h: 9, gap: 20, opacity: 0.8 })}
<rect x="30" y="400" width="110" height="34" rx="17" fill="${p.detail}"/></g>`;
  return sheet(-8, 290, 280, p.shade) + sheet(5, 430, 250, p.main);
}

function posters(p) {
  return `
<g transform="translate(500 500) rotate(-3) translate(-215 -300)">
<rect width="430" height="600" rx="8" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<rect x="28" y="28" width="374" height="340" fill="${p.detail}"/>
${halftone(215, 198, 16, 14, 22, 10, p.accent === p.detail ? p.main : p.accent)}
<rect x="28" y="396" width="250" height="22" rx="11" fill="${p.detail}"/>
<rect x="28" y="432" width="180" height="22" rx="11" fill="${p.accent}"/>
${bars(28, 490, [330, 280], p, { h: 8, gap: 18, opacity: 0.5 })}
</g>`;
}

function brochure(p) {
  const panel = (pts, fill, content) =>
    `<polygon points="${pts}" fill="${fill}" stroke="${p.detail}" stroke-opacity=".2" stroke-width="2"/>${content}`;
  return `
${panel("250,320 430,290 430,730 250,700", p.main, `${bars(282, 380, [110, 90], p, { h: 10, gap: 18 })}<circle cx="338" cy="560" r="36" fill="none" stroke="${p.accent}" stroke-width="8"/>`)}
${panel("430,290 610,320 610,700 430,730", p.shade, bars(464, 380, [120, 100, 80], p, { h: 8, gap: 20, opacity: 0.6 }))}
${panel("610,320 790,290 790,730 610,700", p.main, `<rect x="640" y="370" width="120" height="120" fill="${p.accent}"/>${bars(640, 530, [110, 80], p, { h: 8, gap: 20, opacity: 0.6 })}`)}`;
}

function stickers(p) {
  return `
<g transform="translate(500 500) rotate(-4) translate(-290 -290)">
<rect width="580" height="580" rx="22" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M580 470 L470 580 L580 580 Z" fill="${p.shade}"/>
<circle cx="180" cy="190" r="110" fill="${p.accent}"/>${mark(180, 190, 50, { ...p, accent: p.main, detail: p.main })}
<rect x="340" y="90" width="200" height="200" rx="36" fill="${p.detail}"/>
<circle cx="440" cy="190" r="48" fill="none" stroke="${p.main}" stroke-width="9"/>
<path d="M290 350 L365 395 L365 480 L290 525 L215 480 L215 395 Z" fill="${p.shade}" stroke="${p.detail}" stroke-width="3" stroke-dasharray="9 7"/>
${mark(290, 440, 34, p)}
</g>`;
}

function mugAndTote(p) {
  return `
<g>
<path d="M630 520 L850 520 L866 812 L614 812 Z" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".2" stroke-width="3"/>
<path d="M672 520 C672 410 808 410 808 520" fill="none" stroke="${p.detail}" stroke-width="12" stroke-linecap="round"/>
${mark(740, 650, 44, p)}
</g>
<path d="M470 360 C600 360 600 600 470 600" fill="none" stroke="${p.main}" stroke-width="46"/>
<rect x="220" y="320" width="270" height="480" rx="26" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<rect x="220" y="470" width="270" height="70" fill="${p.accent}"/>
${bars(256, 590, [150, 100], p, { h: 10, gap: 16 })}`;
}

function giftbox(p) {
  return `
<rect x="290" y="470" width="420" height="340" rx="10" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<rect x="268" y="392" width="464" height="92" rx="10" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".18" stroke-width="3"/>
<rect x="470" y="392" width="60" height="418" fill="${p.accent}"/>
<ellipse cx="428" cy="366" rx="70" ry="38" transform="rotate(-22 428 366)" fill="none" stroke="${p.accent}" stroke-width="22"/>
<ellipse cx="572" cy="366" rx="70" ry="38" transform="rotate(22 572 366)" fill="none" stroke="${p.accent}" stroke-width="22"/>
<circle cx="500" cy="386" r="22" fill="${p.accent}"/>`;
}

function packaging(p) {
  return `
<polygon points="500,290 740,410 500,530 260,410" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<polygon points="260,410 500,530 500,790 260,670" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".15" stroke-width="3"/>
<polygon points="500,530 740,410 740,670 500,790" fill="${p.bg2}" stroke="${p.detail}" stroke-opacity=".15" stroke-width="3"/>
<polygon points="500,600 740,480 740,540 500,660" fill="${p.accent}"/>
<path d="M330 445 L430 495" stroke="${p.detail}" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 8" opacity=".6"/>
<ellipse cx="500" cy="410" rx="64" ry="32" fill="none" stroke="${p.accent}" stroke-width="9"/>`;
}

function labels(p) {
  const tone = [p.accent, p.main, p.detail, p.main, p.accent, p.main];
  let out = `<rect x="230" y="270" width="540" height="540" rx="22" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".15" stroke-width="3"/>`;
  tone.forEach((t, i) => {
    const x = 262 + (i % 2) * 252;
    const y = 302 + Math.floor(i / 2) * 170;
    const onDark = t === p.detail || t === p.accent;
    out += `<rect x="${x}" y="${y}" width="224" height="140" rx="18" fill="${t}" stroke="${p.detail}" stroke-opacity=".15" stroke-width="2"/>
<circle cx="${x + 50}" cy="${y + 70}" r="22" fill="none" stroke="${onDark ? p.main : p.accent}" stroke-width="7"/>
${bars(x + 92, y + 52, [90, 60], { detail: onDark ? p.main : p.detail }, { h: 9, gap: 14, opacity: 0.85 })}`;
  });
  return out;
}

function sign(p) {
  return `
<rect x="372" y="640" width="26" height="190" fill="${p.detail}" opacity=".85"/>
<rect x="602" y="640" width="26" height="190" fill="${p.detail}" opacity=".85"/>
<rect x="210" y="330" width="580" height="330" rx="16" fill="${p.main}" stroke="${p.detail}" stroke-width="6"/>
<rect x="250" y="370" width="500" height="120" rx="8" fill="${p.accent}"/>
${bars(290, 400, [260, 160], { detail: p.main }, { h: 22, gap: 18 })}
${bars(250, 530, [380, 300], p, { h: 12, gap: 24, opacity: 0.55 })}`;
}


// ---- uniform / apparel-manufacturing shapes ---------------------------------

const BODY_SHORT = "M345 235 L430 205 Q500 270 570 205 L655 235 L800 345 L735 432 L670 388 L670 812 L330 812 L330 388 L265 432 L200 345 Z";

function corporate(p) {
  return `
<path d="M345 235 L430 205 L500 272 L570 205 L655 235 L800 345 L735 432 L670 388 L670 812 L330 812 L330 388 L265 432 L200 345 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M430 205 L388 262 L492 336 L500 272 Z" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".25" stroke-width="2"/>
<path d="M570 205 L612 262 L508 336 L500 272 Z" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".25" stroke-width="2"/>
<path d="M500 300 L528 340 L516 365 L552 760 L500 800 L448 760 L484 365 L472 340 Z" fill="${p.accent}"/>
<path d="M472 338 L528 338 L520 372 L480 372 Z" fill="${p.detail}" opacity=".25"/>
<rect x="364" y="470" width="86" height="78" rx="6" fill="none" stroke="${p.shade}" stroke-width="4"/>
${mark(407, 505, 18, p)}`;
}

function scrubs(p) {
  return `
<path d="M345 235 L430 205 L500 335 L570 205 L655 235 L800 345 L735 432 L670 388 L670 812 L330 812 L330 388 L265 432 L200 345 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M430 205 L500 335 L570 205" fill="none" stroke="${p.accent}" stroke-width="12" stroke-linejoin="round"/>
<rect x="545" y="500" width="100" height="120" rx="8" fill="none" stroke="${p.shade}" stroke-width="5"/>
<path d="M550 548 L640 548" stroke="${p.shade}" stroke-width="4"/>
<path d="M300 400 L268 428 M700 400 L732 428" stroke="${p.accent}" stroke-width="10" stroke-linecap="round"/>
${mark(380, 540, 26, p, { stitched: true })}`;
}

function security(p) {
  return `
<path d="M345 235 L430 205 L500 272 L570 205 L655 235 L800 345 L735 432 L670 388 L670 812 L330 812 L330 388 L265 432 L200 345 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M430 205 L388 262 L492 336 L500 272 Z" fill="${p.shade}"/>
<path d="M570 205 L612 262 L508 336 L500 272 Z" fill="${p.shade}"/>
<rect x="488" y="272" width="24" height="520" fill="${p.shade}" opacity=".6"/>
<path d="M352 246 L420 222 L430 262 L360 286 Z M648 246 L580 222 L570 262 L640 286 Z" fill="${p.detail}" opacity=".7"/>
<circle cx="404" cy="244" r="6" fill="${p.accent}"/><circle cx="596" cy="244" r="6" fill="${p.accent}"/>
<rect x="545" y="470" width="96" height="92" rx="6" fill="none" stroke="${p.shade}" stroke-width="5"/>
<path d="M545 498 L641 498" stroke="${p.shade}" stroke-width="4"/>
<path d="M392 456 L452 456 L452 520 L422 548 L392 520 Z" fill="${p.accent}"/>
<circle cx="422" cy="496" r="11" fill="${p.main}"/>`;
}

function safari(p) {
  const pocket = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${p.shade}" stroke="${p.detail}" stroke-opacity=".25" stroke-width="3"/><path d="M${x} ${y + 22} L${x + w} ${y + 22}" stroke="${p.detail}" stroke-opacity=".3" stroke-width="3"/><circle cx="${x + w / 2}" cy="${y + 22}" r="5" fill="${p.detail}" opacity=".6"/>`;
  return `
<path d="M345 235 L430 205 L500 272 L570 205 L655 235 L800 345 L735 432 L670 388 L670 812 L330 812 L330 388 L265 432 L200 345 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M430 205 L388 262 L492 336 L500 272 Z" fill="${p.shade}"/>
<path d="M570 205 L612 262 L508 336 L500 272 Z" fill="${p.shade}"/>
<rect x="488" y="272" width="24" height="540" fill="${p.shade}" opacity=".7"/>
${[330, 410, 490, 570, 650, 730].map((y) => `<circle cx="500" cy="${y}" r="6" fill="${p.detail}" opacity=".6"/>`).join("")}
${pocket(356, 440, 100, 96)}${pocket(544, 440, 100, 96)}
${pocket(352, 640, 108, 100)}${pocket(540, 640, 108, 100)}
<path d="M236 372 L286 330 M764 372 L714 330" stroke="${p.accent}" stroke-width="12" stroke-linecap="round"/>
${mark(580, 400, 16, p, { stitched: true })}`;
}

function jersey(p) {
  return `
<path d="${BODY_SHORT}" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M432 208 Q500 292 568 208" fill="none" stroke="${p.accent}" stroke-width="16" stroke-linecap="round"/>
<path d="M345 235 L330 388 M655 235 L670 388" stroke="${p.accent}" stroke-width="14"/>
<path d="M200 345 L265 432 M800 345 L735 432" stroke="${p.accent}" stroke-width="16" stroke-linecap="round"/>
<text x="500" y="590" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="190" fill="${p.detail}">10</text>
<rect x="418" y="630" width="164" height="12" rx="6" fill="${p.accent}"/>`;
}

function robe(p) {
  return `
<path d="M390 222 L450 202 Q500 252 550 202 L610 222 L700 330 L668 408 L644 384 L664 834 L336 834 L356 384 L332 408 L300 330 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M450 202 Q500 252 550 202" fill="none" stroke="${p.shade}" stroke-width="12" stroke-linecap="round"/>
<path d="M460 236 L428 834 L478 834 L500 300 Z" fill="${p.accent}"/>
<path d="M540 236 L572 834 L522 834 L500 300 Z" fill="${p.accent}"/>
<path d="M428 790 L478 790 M522 790 L572 790" stroke="${p.main}" stroke-width="8" stroke-dasharray="6 8"/>
<path d="M356 384 L664 384" stroke="${p.shade}" stroke-width="3" opacity=".7"/>`;
}

function coverall(p) {
  return `
<path d="M360 232 L440 210 L500 255 L560 210 L640 232 L722 302 L766 526 L704 546 L672 404 L682 832 L540 832 L500 560 L460 832 L318 832 L328 404 L296 546 L234 526 L278 302 Z" fill="${p.main}" stroke="${p.shade}" stroke-width="3"/>
<path d="M440 210 L396 268 L488 330 L500 255 Z" fill="${p.shade}"/>
<path d="M560 210 L604 268 L512 330 L500 255 Z" fill="${p.shade}"/>
<path d="M500 255 L500 560" stroke="${p.detail}" stroke-width="5" stroke-dasharray="10 6" opacity=".8"/>
<rect x="326" y="456" width="348" height="30" fill="${p.accent}"/>
<path d="M322 700 L478 700 L474 730 L320 730 Z M522 700 L678 700 L680 730 L526 730 Z" fill="${p.accent}"/>
<path d="M286 538 L242 526 M714 538 L758 526" stroke="${p.accent}" stroke-width="22"/>
<rect x="372" y="360" width="84" height="76" rx="6" fill="none" stroke="${p.shade}" stroke-width="5"/>
<rect x="544" y="360" width="84" height="76" rx="6" fill="none" stroke="${p.shade}" stroke-width="5"/>`;
}

/** Places a garment smaller and off-centre, for composite illustrations. */
const scaled = (inner, s, cx, bottom) =>
  `<g transform="translate(${(cx - 500 * s).toFixed(1)} ${(bottom - 832 * s).toFixed(1)}) scale(${s})">${inner}</g>`;

function manufacturingSet(p) {
  return (
    scaled(scrubs(p), 0.62, 262, 800) +
    scaled(jersey(p), 0.62, 738, 800) +
    scaled(corporate(p), 0.8, 500, 830)
  );
}

// ---- manifest --------------------------------------------------------------

const art = {
  // categories
  "category-printing": () => wrap(palettes.clay, cards(palettes.clay)),
  "category-embroidery": () => wrap(palettes.ink, cap(palettes.ink)),
  "category-apparel": () => wrap(palettes.stone, tee(palettes.stone)),
  "category-promotional": () => wrap(palettes.sand, mugAndTote(palettes.sand)),
  "category-gifts": () => wrap(palettes.ink, giftbox(palettes.ink)),
  "category-custom": () => wrap(palettes.stone, packaging(palettes.stone)),

  // printing
  "business-cards": () => wrap(palettes.sand, cards(palettes.sand)),
  flyers: () => wrap(palettes.sand, flyers(palettes.sand)),
  posters: () => wrap(palettes.stone, posters(palettes.stone)),
  brochures: () => wrap(palettes.sand, brochure(palettes.sand)),
  stickers: () => wrap(palettes.clay, stickers(palettes.clay)),

  // embroidery
  "embroidered-caps": () => wrap(palettes.sand, cap(palettes.sand)),
  "embroidered-polo-shirts": () => wrap(palettes.sand, polo(palettes.sand)),
  uniforms: () => wrap(palettes.ink, polo(palettes.ink)),
  "embroidered-jackets": () => wrap(palettes.stone, jacket(palettes.stone)),
  "custom-embroidered-apparel": () => wrap(palettes.clay, tee(palettes.clay, { stitch: true })),

  // apparel branding
  "t-shirt-printing": () => wrap(palettes.sand, tee(palettes.sand)),
  "hoodie-branding": () => wrap(palettes.ink, hoodie(palettes.ink)),
  "custom-apparel-printing": () => wrap(palettes.ink, tee(palettes.ink)),

  // future services
  "promotional-merchandise": () => wrap(palettes.sand, mugAndTote(palettes.sand)),
  "corporate-gifts": () => wrap(palettes.ink, giftbox(palettes.ink)),
  packaging: () => wrap(palettes.clay, packaging(palettes.clay)),
  labels: () => wrap(palettes.sand, labels(palettes.sand)),
  signage: () => wrap(palettes.stone, sign(palettes.stone)),
  "personalised-gifts": () => wrap(palettes.clay, giftbox(palettes.clay)),

  // apparel manufacturing
  "category-manufacturing": () => wrap(palettes.ink, manufacturingSet(palettes.ink)),
  "corporate-uniforms": () => wrap(palettes.stone, corporate(palettes.stone)),
  "healthcare-uniforms": () => wrap(palettes.sand, scrubs(palettes.sand)),
  "security-uniforms": () => wrap(palettes.ink, security(palettes.ink)),
  "safari-tour-uniforms": () => wrap(palettes.sand, safari(palettes.sand)),
  "sports-uniforms": () => wrap(palettes.clay, jersey(palettes.clay)),
  "religious-wear": () => wrap(palettes.stone, robe(palettes.stone)),
  "industrial-workwear": () => wrap(palettes.ink, coverall(palettes.ink)),

  // portfolio samples
  "portfolio-stationery": () => wrap(palettes.ink, cards(palettes.ink)),
  "portfolio-caps": () => wrap(palettes.clay, cap(palettes.clay)),
  "portfolio-tees": () => wrap(palettes.sand, tee(palettes.sand)),
  "portfolio-polos": () => wrap(palettes.ink, polo(palettes.ink)),
  "portfolio-posters": () => wrap(palettes.clay, posters(palettes.clay)),
  "portfolio-stickers": () => wrap(palettes.sand, stickers(palettes.sand)),
  "portfolio-hoodies": () => wrap(palettes.stone, hoodie(palettes.stone)),
  "portfolio-jackets": () => wrap(palettes.ink, jacket(palettes.ink)),
  "portfolio-merch": () => wrap(palettes.sand, mugAndTote(palettes.sand)),
  "portfolio-packaging": () => wrap(palettes.clay, packaging(palettes.clay)),
};

for (const [name, render] of Object.entries(art)) {
  writeFileSync(join(OUT, `${name}.svg`), render());
}
console.log(`Wrote ${Object.keys(art).length} placeholder images to ${OUT}`);
