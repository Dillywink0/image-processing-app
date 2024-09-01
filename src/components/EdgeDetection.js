import React, { useRef, useEffect } from 'react';

const EdgeDetection = ({ image }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.crossOrigin = 'Anonymous'; // Important for CORS issues

    img.onload = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        console.error("Canvas reference is null");
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        console.error("2D context could not be retrieved.");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply a simple edge detection algorithm (Sobel filter or similar)
      for (let i = 0; i < data.length; i += 4) {
        const grayscale = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
      }

      context.putImageData(imageData, 0, 0);
    };

    img.onerror = () => {
      console.error("Image failed to load");
    };
  }, [image]);

  return <canvas ref={canvasRef}></canvas>;
};

export default EdgeDetection;
