// src/components/ImageUploader.js
import React from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onImageUpload(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return <input type="file" accept="image/*" onChange={handleImageChange} />;
};

export default ImageUploader;
