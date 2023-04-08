export function convertFileToBlob(
  file: any
): Promise<string | ArrayBuffer | null | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result)
    }
    reader.onerror = () => {
      reject(null);
    }
    reader.readAsDataURL(file);
  })
}
