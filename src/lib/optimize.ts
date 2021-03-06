import fs from 'fs';
import { join, basename } from 'path';
import imageminWebp from 'imagemin-webp';
import sizeOf from 'image-size';
import { promisify } from 'util';
import slugify from 'slugify';
import { extname } from 'path';

const nextPath = join(process.cwd(), '.next');
const cachePath = join(nextPath, 'cache');
const buildPath = join(cachePath, 'image-optimize-api');
const publicPath = join(process.cwd(), 'public', 'build');

const copyFile = promisify(fs.copyFile);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);

type Height = 400 | 800;

export const optimizeImage = async (imagePath: string, height: Height = 800): Promise<string> => {
  const ext = extname(imagePath);
  const imageName = slugify(
    basename(imagePath).replace(/(?:png|jpe?g|webp)$/i, ''),
    { lower: true, strict: true, locale: 'en' }
  ) + ext;
  const buildImage = join(buildPath, imageName.replace(/\.(?:png|jpe?g|webp)$/i, '.webp'));
  const sizePath = join(publicPath, `${height}`);

  if (!imagePath) {
    return '';
  }

  if (await exists(buildImage)) {
    if (!(await exists(join(sizePath, basename(buildImage))))) {
      await copyFile(buildImage, join(sizePath, basename(buildImage)));
    }

    return join(`/build/${height}/${basename(buildImage)}`);
  }

  return await convert(imagePath, imageName, height);
}

const convert = async (path: string, imageName: string, adjustHeight: Height): Promise<string> => {
  const inputBuffer = await readFile(join(process.cwd(), 'public', path));
  const { width, height } = sizeOf(inputBuffer);

  const converter = imageminWebp({
    preset: 'drawing',
    resize: {
      height: adjustHeight,
      width: (width as number) * (adjustHeight / (height as number)),
    }
  });
  const outputBuffer = await converter(inputBuffer);
  const cacheFile = join(buildPath, imageName.replace(/\.(?:png|jpe?g)/i, '.webp'));
  const outputFile = join(publicPath, `${adjustHeight}`, imageName.replace(/\.(?:png|jpe?g)/i, '.webp'));
  await Promise.all([
    writeFile(cacheFile, outputBuffer),
    writeFile(outputFile, outputBuffer),
  ]);

  return `/build/${adjustHeight}/${basename(outputFile)}`;
}

export const mkDirs = async () => {
  if (!fs.existsSync(nextPath)) {
    await mkdir(nextPath);
  }
  if (!fs.existsSync(cachePath)) {
    await mkdir(cachePath);
  }
  if (!fs.existsSync(buildPath)) {
    await mkdir(buildPath);
  }

  if (!fs.existsSync(publicPath)) {
    await mkdir(publicPath);
  }
  if (!fs.existsSync(join(publicPath, '400'))) {
    await mkdir(join(publicPath, '400'));
  }
  if (!fs.existsSync(join(publicPath, '800'))) {
    await mkdir(join(publicPath, '800'));
  }
}
