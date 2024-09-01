// src/components/DownloadButton.js
import React from 'react';

const DownloadButton = ({ canvasRef }) => {
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'processed-image.png';
      link.click();
    }
  };

  return <button onClick={downloadImage}>Download Image</button>;
};

export default DownloadButton;
