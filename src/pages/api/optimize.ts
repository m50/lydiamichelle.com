import fs from 'fs';
import { join, dirname, basename } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next'
import imageminWebp from 'imagemin-webp';
import fetch from 'node-fetch';
import sizeOf from 'image-size';

const cache = new Map<string, Buffer>();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const height = parseInt(req.query.height as string) || 800;
  const imagePath = req.query.image as string;
  const imageName = `${height}-${basename(imagePath).replace(/\.(?:png|jpe?g)/i, '.webp')}`;

  if (!imagePath) {
    return res.status(404).end('');
  }

  if (cache.has(imageName)) {
    return write(res, cache.get(imageName) as Buffer);
  }

  try {
    const outputBuffer = await convert(getHost(req) + imagePath, imageName, height);
    return write(res, outputBuffer);
  } catch (error) {
    console.log(error);
    return res.status(404).end('');
  }
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
  cache.set(imageName, outputBuffer);
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
