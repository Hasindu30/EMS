import React from 'react';

const popup = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose}></div>
      )}

      {/* Side Popup */}
      <div className={`fixed top-0 right-0 w-96 bg-white h-full shadow-lg transform transition-transform duration-500 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default popup;
