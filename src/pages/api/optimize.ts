import fs from 'fs';
import { join, dirname, basename } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next'
import imageminWebp from 'imagemin-webp';
import fetch from 'node-fetch';
import sizeOf from 'image-size';

const nextPath = join(process.cwd(), '.next');
const cachePath = join(nextPath, 'cache');
const buildPath = join(cachePath, 'image-optimize-api');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const height = parseInt(req.query.height as string) || 800;
  const imagePath = req.query.image as string;
  const imageName = `${height}-${basename(imagePath)}`;
  let outputBuffer: Buffer;

  if (!imagePath) {
    return res.status(404).end('');
  }

  if (fs.existsSync(join(buildPath, imageName))) {
    outputBuffer = fs.readFileSync(join(buildPath, imageName.replace(/\.(?:png|jpe?g)/i, '.webp')));
    return write(res, outputBuffer);
  }

  mkDir();

  try {
    outputBuffer = await convert(getHost(req) + imagePath, imageName, height);
  } catch (error) {
    console.log(error);
    return res.status(404).end('');
  }
  return write(res, outputBuffer);
}

const pullFile = async (path: string): Promise<Buffer> => {
  const i = await fetch(path);
  const inputBuffer = await i.buffer();
  return inputBuffer
}

const convert = async (path: string, imageName: string, adjustHeight: number): Promise<Buffer> => {
  const inputBuffer = await pullFile(path);
  const { width, height } = sizeOf(inputBuffer);

  const converter = imageminWebp({
    preset: 'drawing',
    resize: {
      height: adjustHeight,
      width: (width as number) * (adjustHeight / (height as number)),
    }
  });
  const outputBuffer = await converter(inputBuffer);
  fs.writeFileSync(join(buildPath, imageName.replace(/\.(?:png|jpe?g)/i, '.webp')), outputBuffer);
  return outputBuffer;
}

const write = (res: NextApiResponse, outputFile: Buffer) => {
  res.setHeader('Content-Type', 'image/webp');
  res.writeHead(200, {
    'Content-Type': 'image/webp',
    'Content-Length': Buffer.byteLength(outputFile),
    'Cache-Control': "public, max-age=604800, immutable"
  }).end(outputFile);
}

const getHost = (req: NextApiRequest) => {
  let host = req.headers.host as string;
  let protocol = "https";
  if (host.startsWith('localhost')) {
    protocol = "http";
  }
  host = `${protocol}://${host}`;

  return host;
}

const mkDir = () => {
  if (!fs.existsSync(nextPath)) {
    fs.mkdirSync(nextPath);
  }
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
  }
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
  }
}
