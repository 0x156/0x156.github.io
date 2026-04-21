import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Build-time font loading — no network fetches, fully hermetic.
// Resolving from process.cwd() keeps this working whether the function
// runs from src (dev) or from the bundled output (build).
const FONTS_DIR = resolve(process.cwd(), 'public/fonts');

let cachedRegular: ArrayBuffer | null = null;
let cachedBold: ArrayBuffer | null = null;

async function loadLocalFont(file: string): Promise<ArrayBuffer> {
	const buffer = await readFile(resolve(FONTS_DIR, file));
	return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

async function getFonts() {
	if (!cachedRegular) cachedRegular = await loadLocalFont('atkinson-regular.woff');
	if (!cachedBold) cachedBold = await loadLocalFont('atkinson-bold.woff');
	return { regular: cachedRegular, bold: cachedBold };
}

export async function generateOgImage(title: string, subtitle: string) {
	const { regular, bold } = await getFonts();

	const markup = html`
		<div style="background-color: #0a0118; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Atkinson';">

			<div style="display: flex; position: absolute; top: -220px; right: -120px; width: 700px; height: 700px; background-image: radial-gradient(circle, rgba(167, 139, 250, 0.45), rgba(76, 29, 149, 0) 65%); border-radius: 50%;"></div>
			<div style="display: flex; position: absolute; bottom: -220px; left: -120px; width: 700px; height: 700px; background-image: radial-gradient(circle, rgba(124, 58, 237, 0.40), rgba(30, 27, 75, 0) 65%); border-radius: 50%;"></div>

			<div style="display: flex; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(167, 139, 250, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(167, 139, 250, 0.08) 1px, transparent 1px); background-size: 48px 48px;"></div>

			<div style="display: flex; flex-direction: column; justify-content: space-between; padding: 80px; width: 100%; height: 100%; z-index: 1;">
				<div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
					<div style="display: flex; align-items: center; padding: 12px 24px; background-color: rgba(167, 139, 250, 0.12); border-radius: 999px; border: 1px solid rgba(167, 139, 250, 0.35);">
						<span style="color: #c4b5fd; font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">
							${subtitle}
						</span>
					</div>
				</div>

				<div style="display: flex; flex-direction: column; gap: 24px;">
					<div style="display: flex; color: #f5f3ff; font-size: 78px; font-weight: 700; line-height: 1.08; letter-spacing: -0.02em; margin: 0; max-width: 1040px; overflow: hidden; max-height: 300px;">
						${title}
					</div>
				</div>

				<div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
					<div style="display: flex; flex-direction: column; gap: 6px;">
						<span style="color: #a78bfa; font-size: 26px; font-weight: 700; letter-spacing: 0.02em;">0x156</span>
						<span style="color: #94a3b8; font-size: 22px; font-weight: 400;">Notes from the edge of AI and Web3</span>
					</div>
					<div style="display: flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #a78bfa, #7c3aed); border-radius: 16px; box-shadow: 0 10px 30px rgba(124, 58, 237, 0.45);">
						<span style="color: #0a0118; font-size: 24px; font-weight: 700; letter-spacing: 0;">0x</span>
					</div>
				</div>
			</div>
		</div>
	`;

	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Atkinson', data: regular, weight: 400, style: 'normal' },
			{ name: 'Atkinson', data: bold, weight: 700, style: 'normal' },
		],
	});

	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return new Uint8Array(pngData.asPng());
}
