// src/App.js
import React, { useState } from 'react';
import GpuProcessor from './components/GpuProcessor';
import EdgeDetection from './components/EdgeDetection';
import WebGLEffects from './components/WebGLEffects';
import RealTimeGpuProcessor from './components/RealTimeGpuProcessor';
import SaveLoadGpuProcessor from './components/SaveLoadGpuProcessor';

const App = () => {
  const [image, setImage] = useState(null);
  const [theme, setTheme] = useState('light');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen bg-${theme === 'light' ? 'white' : 'gray-900'} text-${theme === 'light' ? 'gray-900' : 'white'} transition-all`}>
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Image Processing App</h1>
          <div>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all" 
              onClick={toggleTheme}
            >
              Toggle Theme
            </button>
          </div>
        </header>

        <div className="flex items-center mb-6">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="cursor-pointer border-2 border-dashed border-gray-400 p-4 w-full rounded-md bg-gray-50 hover:bg-gray-100 transition-all"
          />
        </div>

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="shadow-lg rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">GPU.js Processing</h2>
              <GpuProcessor image={image} />
            </div>
            <div className="shadow-lg rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Edge Detection</h2>
              <EdgeDetection image={image} />
            </div>
            <div className="shadow-lg rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">WebGL Effects</h2>
              <WebGLEffects image={image} />
            </div>
            <div className="shadow-lg rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Real-Time Processing</h2>
              <RealTimeGpuProcessor image={image} />
            </div>
            <div className="shadow-lg rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Save/Load Processing</h2>
              <SaveLoadGpuProcessor image={image} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
