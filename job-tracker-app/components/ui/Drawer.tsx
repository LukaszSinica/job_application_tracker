'use client';

import { useEffect, useState } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Drawer({ isOpen, onClose, children, title }: DrawerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isVisible && (
        <div 
          className="fixed bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-[500px] z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </>
  );
}