// Crops an image to fill the given size and returns it as a JPEG data URL.
export async function imageToDataUrl(file: File, width: number, height: number) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.max(width / bitmap.width, height / bitmap.height);
  const cropWidth = width / scale;
  const cropHeight = height / scale;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas
    .getContext("2d")
    ?.drawImage(
      bitmap,
      (bitmap.width - cropWidth) / 2,
      (bitmap.height - cropHeight) / 2,
      cropWidth,
      cropHeight,
      0,
      0,
      width,
      height,
    );
  return canvas.toDataURL("image/jpeg", 0.75);
}
