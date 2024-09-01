import React, { useRef, useEffect, useState } from 'react';
import { GPU } from 'gpu.js';

const SaveLoadGpuProcessor = ({ image }) => {
  const canvasRef = useRef(null);
  const [filter, setFilter] = useState(localStorage.getItem('savedFilter') || 'grayscale');

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        console.error("Canvas reference is null");
        return;
      }

      const context = canvas.getContext('2d');

      if (!context) {
        console.error("Context could not be retrieved");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0);
      const imageData = context.getImageData(0, 0, img.width, img.height);

      const gpu = new GPU({ canvas });

      const processImage = gpu.createKernel(function (imageData) {
        const pixel = imageData[this.thread.y][this.thread.x];
        let r = pixel[0], g = pixel[1], b = pixel[2];

        if (this.constants.filter === 1) {
          const avg = (r + g + b) / 3;
          r = g = b = avg;
        } else if (this.constants.filter === 2) {
          r = r * 0.393 + g * 0.769 + b * 0.189;
          g = r * 0.349 + g * 0.686 + b * 0.168;
          b = r * 0.272 + g * 0.534 + b * 0.131;
        } else if (this.constants.filter === 3) {
          r = 255 - r;
          g = 255 - g;
          b = 255 - b;
        }

        this.color(r / 255, g / 255, b / 255, 1);
      })
      .setOutput([canvas.width, canvas.height])
      .setGraphical(true)
      .setConstants({ filter: filter === 'grayscale' ? 1 : filter === 'sepia' ? 2 : 3 });

      processImage(imageData.data);

      return () => gpu.destroy();
    };

    img.onerror = () => {
      console.error("Image failed to load");
    };

  }, [image, filter]);

  const saveState = () => {
    localStorage.setItem('savedFilter', filter);
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <div className="filter-buttons">
        <button onClick={() => setFilter('grayscale')}>Grayscale</button>
        <button onClick={() => setFilter('sepia')}>Sepia</button>
        <button onClick={() => setFilter('invert')}>Invert Colors</button>
      </div>
      <button onClick={saveState}>Save State</button>
    </div>
  );
};

export default SaveLoadGpuProcessor;
