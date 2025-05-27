// src/View/src/utils/imageHelper.js
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;

  const baseUrl = "https://ego-production.up.railway.app";

  return `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};
