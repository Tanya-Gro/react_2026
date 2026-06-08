export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () =>
      resolve(reader.result?.toString() ?? ''),
    );
    reader.onerror = (error) => reject(error);
  });
