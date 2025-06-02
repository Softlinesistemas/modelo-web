export const ASPECT_RATIO = 1;
export const MIN_DIMENSION = 150;
export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
export const MAX_FILE_SIZE_IN_MB = MAX_FILE_SIZE / (1024 * 1024);
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
  "image/webp",
];
export const IMAGE_QUALITY = 0.9; // Initial quality for the exported image
export const IMAGE_QUALITY_STEP = 0.1; // Step to reduce quality if file is too large
