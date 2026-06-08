import { type ReactNode, type MouseEvent, useEffect, useState } from 'react';

const DELAY = 300;

type ModalOverlayProps = {
  children: ReactNode;
  onClose: () => void;
};

export const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, DELAY);
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out ${
        isOpen
          ? 'bg-black/60 backdrop-blur-sm'
          : 'bg-black/0 backdrop-blur-none'
      }`}
    >
      <div
        className={`relative max-w-md w-full transition-all duration-200 ease-out ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-4xl font-bold z-10 transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
