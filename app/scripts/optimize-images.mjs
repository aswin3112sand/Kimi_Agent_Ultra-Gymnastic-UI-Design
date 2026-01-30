import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = path.resolve('public');
const quality = {
  webp: 82,
  avif: 50
};

const isJpeg = (file) => /\.(jpe?g)$/i.test(file);

const shouldRegenerate = async (sourcePath, outputPath) => {
  try {
    const [sourceStat, outputStat] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(outputPath)
    ]);
    return sourceStat.mtimeMs > outputStat.mtimeMs;
  } catch {
    return true;
  }
};

const convertImage = async (sourcePath, outputPath, format, options) => {
  if (!(await shouldRegenerate(sourcePath, outputPath))) {
    return false;
  }

  await sharp(sourcePath)
    .toFormat(format, options)
    .toFile(outputPath);
  return true;
};

const optimizeImages = async () => {
  const entries = await fs.readdir(inputDir);
  const jpegFiles = entries.filter(isJpeg);

  if (!jpegFiles.length) {
    console.log('No JPG images found to optimize.');
    return;
  }

  let converted = 0;

  for (const file of jpegFiles) {
    const baseName = file.replace(/\.(jpe?g)$/i, '');
    const sourcePath = path.join(inputDir, file);

    const webpPath = path.join(inputDir, `${baseName}.webp`);
    const avifPath = path.join(inputDir, `${baseName}.avif`);

    const webpDone = await convertImage(sourcePath, webpPath, 'webp', {
      quality: quality.webp
    });
    const avifDone = await convertImage(sourcePath, avifPath, 'avif', {
      quality: quality.avif
    });

    if (webpDone || avifDone) {
      converted += 1;
      console.log(`Optimized ${file}`);
    }
  }

  if (!converted) {
    console.log('Images already optimized.');
  } else {
    console.log(`Optimized ${converted} image(s).`);
  }
};

optimizeImages().catch((error) => {
  console.error('Failed to optimize images:', error);
  process.exit(1);
});
