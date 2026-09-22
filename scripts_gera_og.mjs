import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_LOGO = path.resolve(__dirname, 'public', 'images', 'Logo_Serra_Nevada.png');
const OUT = path.resolve(__dirname, 'public', 'images', 'og-default-1200x630.jpg');

const LOGO_TAM = 520;
const W = 1200;
const H = 630;

(async () => {
  const logoBuf = await sharp(SRC_LOGO)
    .resize(LOGO_TAM, LOGO_TAM, { fit: 'inside' })
    .png()
    .toBuffer();

  // Fundo: gradiente radial criado via SVG (mais rapido e nativamente suportado pelo sharp
  const fundoSvg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <radialGradient id="g1" cx="50%" cy="40%" r="78%" fx="50%" fy="32%">
        <stop offset="0%" stop-color="#B87A34"/>
        <stop offset="48%" stop-color="#8E5A20"/>
        <stop offset="100%" stop-color="#1A1A1A"/>
      </radialGradient>
      <linearGradient id="gold" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#F4C244"/>
        <stop offset="100%" stop-color="#C99017"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g1)"/>
    <g opacity="0.18" fill="#FFFFFF">
      <circle cx="0" cy="0" r="280"/>
      <circle cx="${W}" cy="${H}" r="320"/>
    </g>
    <circle cx="${W / 2}" cy="${H / 2 - 44}" r="${(LOGO_TAM + 130) / 2 + 3}" fill="#1A1A1A" opacity="0.55"/>
    <circle cx="${W / 2}" cy="${H / 2 - 44}" r="${(LOGO_TAM + 130) / 2}" fill="url(#gold)"/>
    <text x="${W / 2}" y="552" text-anchor="middle" font-family="Arial Black, Impact, Arial, sans-serif" font-size="66" font-weight="900" fill="url(#gold)" stroke="#1A1A1A" stroke-width="4" paint-order="stroke">
      Serra Nevada Gramado Turismo
    </text>
    <text x="${W / 2}" y="600" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" opacity="0.94">
      Gramado &amp; Canela · Serra Gaúcha · RS
    </text>
  </svg>`);

  const fundoBuf = await sharp(fundoSvg).jpeg({ quality: 90 }).toBuffer();

  await sharp(fundoBuf)
    .resize(W, H)
    .composite([
      {
        input: logoBuf,
        blend: 'over',
        left: Math.round((W - LOGO_TAM) / 2),
        top: Math.round((H - LOGO_TAM) / 2) - 52,
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(OUT);

  const size = fs.statSync(OUT).size;
  console.log('GERADO:', OUT, `${(size / 1024).toFixed(1)} KB`);
})().catch((e) => {
  console.error('SHARP ERRO:', e);
  process.exit(1);
});
