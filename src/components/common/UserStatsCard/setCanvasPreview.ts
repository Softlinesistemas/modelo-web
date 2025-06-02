import { IMAGE_QUALITY, IMAGE_QUALITY_STEP, MAX_FILE_SIZE } from './userStatsCardImageCropperConstants';

export function setCanvasPreview(
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  crop: any,
  initialQuality = IMAGE_QUALITY
) {
  if (!image || !canvas) {
    return;
  }
  const ctx = canvas.getContext('2d');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  canvas.width = cropWidth * pixelRatio;
  canvas.height = cropHeight * pixelRatio;

  if (ctx) {
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
  
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Reduce image quality if the file size is too large
    let dataUrl = canvas.toDataURL('image/png', initialQuality);
    let quality = initialQuality;

    while (dataUrl.length * 0.75 > MAX_FILE_SIZE && quality > IMAGE_QUALITY_STEP) {
      quality -= IMAGE_QUALITY_STEP;
      dataUrl = canvas.toDataURL('image/png', quality);
    }

    return dataUrl;
  }
}
