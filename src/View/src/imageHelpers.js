export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;

  // For development, use relative path; for production use the full domain
  const isProduction = window.location.hostname !== "localhost";
  const baseUrl = isProduction ? "https://ego-production.up.railway.app" : "";

  return `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};
