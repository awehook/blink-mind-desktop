type SerializeImageResult = {
  url: string;
  width: number;
  height: number;
};
export function serializeImage(url): Promise<SerializeImageResult> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;

    image.onerror = function(error) {
      reject(error);
    };

    image.onload = function() {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve({
          url: canvas.toDataURL('image/png', 1),
          width: canvas.width,
          height: canvas.height
        });
      } catch (e) {
        reject(e);
      }
    };
  });
}
