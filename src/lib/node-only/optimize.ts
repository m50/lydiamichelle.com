/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import { join, basename, extname } from 'path';
import imageminWebp from 'imagemin-webp';
import sizeOf from 'image-size';
import { promisify } from 'util';
import md5File from 'md5-file';
import chalk from 'chalk';
import { slug } from '../helpers';

const nextPath = join(process.cwd(), '.next');
const cachePath = join(nextPath, 'cache');
const buildPath = join(cachePath, 'image-optimize-api');
const publicPath = join(process.cwd(), 'public', 'build');

const copyFile = promisify(fs.copyFile);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const readdir = promisify(fs.readdir);
const rm = promisify(fs.unlink);

type Height = 400 | 800;

const convert = async (path: string, imageName: string, adjustHeight: Height): Promise<string> => {
  const md5 = (await md5File(join(process.cwd(), 'public', path))).substr(0, 6);
  const ext = extname(path);
  const cacheFile = join(buildPath, `${adjustHeight}`, imageName.replace(ext, `${md5}.webp`));
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
  const outputFile = join(publicPath, `${adjustHeight}`, imageName.replace(ext, `${md5}.webp`));
  await Promise.all([
    writeFile(cacheFile, outputBuffer),
    writeFile(outputFile, outputBuffer),
  ]);
  console.log(`${chalk.cyan('info')}  - Wrote file ${cacheFile}`);
  console.log(`${chalk.cyan('info')}  - Wrote file ${outputFile}`);

  return `/build/${adjustHeight}/${basename(outputFile)}`;
};

export const optimizeImage = async (imagePath: string, height: Height = 800): Promise<string> => {
  if (!imagePath) {
    return '';
  }

  const md5 = (await md5File(join(process.cwd(), 'public', imagePath))).substr(0, 6);
  const ext = extname(imagePath);
  const imageSlug = slug(basename(imagePath).replace(ext, ''));
  const imageName = `${imageSlug}.${ext}`;
  const cacheFile = join(buildPath, `${height}`, imageName.replace(ext, `${md5}.webp`));
  const sizePath = join(publicPath, `${height}`);

  const existingCacheFile = join(buildPath, imageName.replace(ext, 'webp'));
  if (await exists(existingCacheFile)) {
    await rm(existingCacheFile);
    console.log(`${chalk.yellow('warn')}  - Deleted file ${existingCacheFile}`);
  }

  const pattern = new RegExp(`${imageSlug}\\.(\\.[a-f0-9]+|[a-f0-9]+(?<!${md5}))\\.webp$`, 'gmi');
  const files = await readdir(join(buildPath, `${height}`));
  files.forEach(async (file) => {
    if (pattern.test(file)) {
      try {
        await rm(join(buildPath, `${height}`, file));
        console.log(`${chalk.yellow('warn')}  - Deleted file ${join(`${height}`, file)}`);
      } catch (err) {
        console.error(`${chalk.red('error')} - ${err.message}`);
      }
    }
  });

  if (await exists(cacheFile)) {
    if (!(await exists(join(sizePath, basename(cacheFile))))) {
      await copyFile(cacheFile, join(sizePath, basename(cacheFile)));
      console.log(`${chalk.cyan('info')}  - Wrote file ${join(sizePath, basename(cacheFile))}`);
    }

    return join('build', `${height}`, basename(cacheFile));
  }

  return convert(imagePath, imageName, height);
};
