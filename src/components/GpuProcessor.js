import React, { useRef, useEffect, useState } from 'react';
import { GPU } from 'gpu.js';

const GpuProcessor = ({ image }) => {
  const canvasRef = useRef(null);
  const [filter, setFilter] = useState('grayscale');

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.crossOrigin = 'Anonymous'; // Handle CORS issues

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Canvas reference is null");
        return;
      }

      // Use 2D context for processing
      const context = canvas.getContext('2d');
      if (!context) {
        console.error("2D context could not be retrieved.");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Processing using GPU.js
      const gpu = new GPU();
      const processImage = gpu``
        .createKernel(function (imageData) {
          const pixel = imageData[this.thread.y][this.thread.x];
          const avg = (pixel[0] + pixel[1] + pixel[2]) / 3;
          this.color(avg / 255, avg / 255, avg / 255, 1);
        })
        .setOutput([canvas.width, canvas.height])
        .setGraphical(true)
        .setCanvas(canvas)
        .setContext(context);

      try {
        processImage(imageData.data);
      } catch (error) {
        console.error("Error during GPU processing:", error);
      }

      return () => gpu.destroy(); // Cleanup
    };

    img.onerror = () => {
      console.error("Image failed to load");
    };
  }, [image, filter]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <div>
        {/* Add controls for user to select filters */}
        <button onClick={() => setFilter('grayscale')}>Grayscale</button>
        <button onClick={() => setFilter('invert')}>Invert Colors</button>
        {/* Add more buttons for other filters as needed */}
      </div>
    </div>
  );
};

export default GpuProcessor;
