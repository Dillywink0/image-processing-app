import React, { useRef, useEffect, useState } from 'react';
import { GPU } from 'gpu.js';

const RealTimeGpuProcessor = ({ image }) => {
  const canvasRef = useRef(null);
  const [filter, setFilter] = useState('grayscale');

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.crossOrigin = 'Anonymous'; // Prevent CORS issues

    img.onload = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        console.error("Canvas reference is null");
        return;
      }

      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!context) {
        console.error("WebGL context could not be retrieved.");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      context.clearColor(0.0, 0.0, 0.0, 1.0);
      context.clear(context.COLOR_BUFFER_BIT);

      const gpu = new GPU({ canvas, context });

      const processImage = gpu
        .createKernel(function (imageData) {
          // Example processing kernel for grayscale
          const pixel = imageData[this.thread.y][this.thread.x];
          const avg = (pixel[0] + pixel[1] + pixel[2]) / 3;
          this.color(avg / 255, avg / 255, avg / 255, 1);
        })
        .setOutput([canvas.width, canvas.height])
        .setGraphical(true);

      try {
        processImage(img);
      } catch (error) {
        console.error("Error during GPU processing:", error);
      }

      return () => gpu.destroy();
    };

    img.onerror = () => {
      console.error("Image failed to load");
    };
  }, [image, filter]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default RealTimeGpuProcessor;
