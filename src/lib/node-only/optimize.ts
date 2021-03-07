import fs from 'fs';
import { join, basename, extname } from 'path';
import imageminWebp from 'imagemin-webp';
import sizeOf from 'image-size';
import { promisify } from 'util';
import { slug } from '../helpers';

const nextPath = join(process.cwd(), '.next');
const cachePath = join(nextPath, 'cache');
const buildPath = join(cachePath, 'image-optimize-api');
const publicPath = join(process.cwd(), 'public', 'build');

const copyFile = promisify(fs.copyFile);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);

type Height = 400 | 800;

const convert = async (path: string, imageName: string, adjustHeight: Height): Promise<string> => {
  const inputBuffer = await readFile(join(process.cwd(), 'public', path));
  const { width, height } = sizeOf(inputBuffer);

  const converter = imageminWebp({
    preset: 'drawing',
    resize: {
      height: adjustHeight,
      width: (width as number) * (adjustHeight / (height as number)),
    },
  });
  const outputBuffer = await converter(inputBuffer);
  const cacheFile = join(buildPath, imageName.replace(/\.(?:png|jpe?g)/i, '.webp'));
  const outputFile = join(publicPath, `${adjustHeight}`, imageName.replace(/\.(?:png|jpe?g)/i, '.webp'));
  await Promise.all([
    writeFile(cacheFile, outputBuffer),
    writeFile(outputFile, outputBuffer),
  ]);

  return `/build/${adjustHeight}/${basename(outputFile)}`;
};

export const optimizeImage = async (imagePath: string, height: Height = 800): Promise<string> => {
  const ext = extname(imagePath);
  const imageName = slug(basename(imagePath).replace(/(?:png|jpe?g|webp)$/i, '')) + ext;
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

  return convert(imagePath, imageName, height);
};

export default optimizeImage;
