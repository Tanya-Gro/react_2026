import {
  type ReactNode,
  type MouseEvent,
  useEffect,
  useState,
  useRef,
} from 'react';

const DELAY = 200;

type ModalOverlayProps = {
  children: ReactNode;
  onClose: () => void;
};

export const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const mouseDownTargetRef = useRef<EventTarget | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, DELAY);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouseDownTargetRef.current = e.target;
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (
      e.target === e.currentTarget &&
      mouseDownTargetRef.current === e.currentTarget
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors);

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (e.shiftKey) {
          if (activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (modalRef.current) {
      const focusableElements =
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
      if (focusableElements.length > 0) {
        setTimeout(() => focusableElements[0].focus(), DELAY);
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out ${
        isOpen
          ? 'bg-black/60 backdrop-blur-sm'
          : 'bg-black/0 backdrop-blur-none'
      }`}
    >
      <div
        ref={modalRef}
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
