import fs from 'fs';
import { join } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next'
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import build from 'next/dist/build';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const imagePath = req.query.image as string;
  console.log(fs.readdirSync(process.cwd() + '/src'));
  const fullPath = join(process.cwd(), 'public', imagePath);
  const buildPath = join(process.cwd(), 'public', 'build');
  let outputFile: Buffer;

  if (!imagePath || !fs.existsSync(fullPath)) {
    res.status(404).end('');
    return;
  }

  if (fs.existsSync(join(buildPath, imagePath))) {
    outputFile = fs.readFileSync(join(buildPath, imagePath));
    return write(res, outputFile);
  }

  const out = await imagemin([fullPath], {
    destination: buildPath,
    plugins: [
      imageminWebp(),
    ],
  });
  outputFile = out[0].data;
  return write(res, outputFile);
}

const write = (res: NextApiResponse, outputFile: Buffer) => {
  res.setHeader('Content-Type', 'image/webp');
  res.writeHead(200, {
    'Content-Type': 'image/webp',
    'Content-Length': Buffer.byteLength(outputFile),
    'Cache-Control': "public, max-age=604800, immutable"
  }).end(outputFile);
}
