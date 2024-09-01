// src/components/CanvasRenderer.js

import React, { useRef, useEffect } from 'react';

const CanvasRenderer = ({ image }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
    }
  }, [image]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasRenderer;
