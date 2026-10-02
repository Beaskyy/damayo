import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = '/Users/beasky/Desktop/2026/damayo';
const appDir = path.join(rootDir, 'app');
const publicDir = path.join(rootDir, 'public');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Rich Royal Burgundy Velvet -->
    <radialGradient id="bgGrad" cx="38%" cy="34%" r="68%">
      <stop offset="0%" stop-color="#6a1a33"/>
      <stop offset="45%" stop-color="#460e20"/>
      <stop offset="85%" stop-color="#280510"/>
      <stop offset="100%" stop-color="#180208"/>
    </radialGradient>

    <!-- Warm Polished Champagne Gold -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff6db"/>
      <stop offset="18%" stop-color="#edd08e"/>
      <stop offset="42%" stop-color="#cfa257"/>
      <stop offset="68%" stop-color="#fdeec3"/>
      <stop offset="88%" stop-color="#c39446"/>
      <stop offset="100%" stop-color="#926723"/>
    </linearGradient>

    <!-- Edge Gold Rim Gradient with Rotating Highlights -->
    <linearGradient id="goldRim" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a27527"/>
      <stop offset="25%" stop-color="#ffefc4"/>
      <stop offset="50%" stop-color="#c69848"/>
      <stop offset="75%" stop-color="#fff5d6"/>
      <stop offset="100%" stop-color="#8d631e"/>
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <!-- Background Medallion -->
  <circle cx="256" cy="256" r="244" fill="url(#bgGrad)"/>
  
  <!-- Outer Gold Rim Borders -->
  <circle cx="256" cy="256" r="236" fill="none" stroke="url(#goldRim)" stroke-width="6.5"/>
  <circle cx="256" cy="256" r="223" fill="none" stroke="url(#goldRim)" stroke-width="2" stroke-dasharray="5,3.5" opacity="0.85"/>
  <circle cx="256" cy="256" r="214" fill="none" stroke="url(#goldRim)" stroke-width="1" opacity="0.35"/>

  <!-- Top Delicate Crown Star / Flourish -->
  <path d="M 256 66 Q 256 82 244 88 Q 256 94 256 110 Q 256 94 268 88 Q 256 82 256 66 Z" fill="url(#goldGrad)"/>

  <g fill="url(#goldGrad)" filter="url(#glow)">
    <!-- Letter O: Perfectly Balanced Royal Didot Geometry -->
    <path fill-rule="evenodd" d="
      M 160 144
      C 214 144 255 181 255 252
      C 255 323 214 360 160 360
      C 106 360 65 323 65 252
      C 65 181 106 144 160 144 Z
      M 160 166
      C 127 166 114 198 114 252
      C 114 306 127 338 160 338
      C 193 338 206 306 206 252
      C 206 198 193 166 160 166 Z
    "/>

    <!-- Letter A: Exact Didot Apex & Serifs -->
    <path fill-rule="evenodd" d="
      M 342 146
      L 348 146
      L 398 308
      L 418 308
      C 424 308 426 309 426 313
      L 426 322
      L 364 322
      L 364 313
      C 364 309 366 308 372 308
      L 384 308
      L 373 268
      L 317 268
      L 306 308
      L 318 308
      C 324 308 326 309 326 313
      L 326 322
      L 264 322
      L 264 313
      C 264 309 266 308 272 308
      L 292 308
      L 342 146 Z
      M 345 178
      L 320 255
      L 370 255 Z
    "/>
  </g>

  <!-- Central Linking Diamond Sparkle ✦ -->
  <g transform="translate(254, 252)" filter="url(#glow)">
    <path d="M 0 -38 Q 0 0 -25 0 Q 0 0 0 38 Q 0 0 25 0 Q 0 0 0 -38 Z" fill="#ffffff"/>
    <path d="M 0 -27 Q 0 0 -18 0 Q 0 0 0 27 Q 0 0 18 0 Q 0 0 0 -27 Z" fill="url(#goldGrad)"/>
    <circle cx="0" cy="0" r="4.5" fill="#ffffff"/>
  </g>

  <!-- Bottom Wedding Accents -->
  <circle cx="234" cy="426" r="4" fill="url(#goldGrad)" opacity="0.7"/>
  <circle cx="256" cy="426" r="6.5" fill="url(#goldGrad)"/>
  <circle cx="278" cy="426" r="4" fill="url(#goldGrad)" opacity="0.7"/>
</svg>`;

function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function main() {
  const svgBuffer = Buffer.from(svgContent);

  // 1. Save SVG files
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
  console.log('Saved SVG icons');

  // 2. Render PNG resolutions
  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // 3. Multi-resolution ICO (16, 32, 48)
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ]);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Saved multi-resolution favicon.ico to app/ and public/');

  // 4. Save PNG icons
  fs.writeFileSync(path.join(appDir, 'icon.png'), p32);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), p32);

  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), p180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), p180);

  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), p192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), p512);

  console.log('Successfully generated all wedding favicon assets!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
