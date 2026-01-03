export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Extracts the raw base64 string and mime type from a Data URL
// e.g., "data:image/png;base64,iVBOR..." -> { data: "iVBOR...", mimeType: "image/png" }
export const extractBase64Data = (dataUrl: string) => {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid Data URL format");
  }
  return {
    mimeType: matches[1],
    data: matches[2],
  };
};