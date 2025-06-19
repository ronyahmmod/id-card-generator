import { createImage } from "react-easy-crop";

export default async function getCroppedImg(imageSrc, cropPixels, cropSize) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = cropSize?.width || cropPixels.width;
  canvas.height = cropSize?.height || cropPixels.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg");
  });
}
