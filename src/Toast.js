import React, { useEffect } from 'react';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white ${colors[type]} animate-bounce`}
      style={{minWidth: '280px', animation: 'slideIn 0.3s ease'}}>
      <span className="text-xl">{icons[type]}</span>
      <p className="font-medium text-sm">{message}</p>
      <button onClick={onClose} className="ml-auto text-white opacity-70 hover:opacity-100 text-lg">×</button>
    </div>
  );
}

export default Toast;