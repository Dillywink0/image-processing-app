import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ image, onCrop }) => {
  const [cropper, setCropper] = useState(null);

  const cropImage = () => {
    if (cropper) {
      onCrop(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <Cropper
        src={image}
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={1}
        aspectRatio={16 / 9}
        preview=".img-preview"
        guides={false}
        onInitialized={(instance) => setCropper(instance)}
      />
      <button onClick={cropImage}>Crop Image</button>
    </div>
  );
};

export default ImageCropper;
