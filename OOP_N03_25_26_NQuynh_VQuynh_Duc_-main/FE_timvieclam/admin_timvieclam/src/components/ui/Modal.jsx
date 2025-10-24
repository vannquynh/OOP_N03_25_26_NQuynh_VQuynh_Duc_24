import { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - title: string | ReactNode
 * - children: ReactNode
 * - maxWidth: 'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'6xl'|'7xl'|'fluid' (default: '5xl')
 * - closeOnBackdrop: boolean (default: true)
 * - bodyClassName: string (optional)
 * - headerClassName: string (optional)
 * - containerClassName: string (optional) // áp vào hộp dialog
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '5xl',          // mặc định rộng
  closeOnBackdrop = true,
  bodyClassName = '',
  headerClassName = '',
  containerClassName = '',
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose?.();

    const handleClickOutside = (e) => {
      if (!closeOnBackdrop) return;
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // lock scroll
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = prev || 'auto';
      };
    }
  }, [isOpen, onClose, closeOnBackdrop]);

  if (!isOpen) return null;

  const maxWidthClass =
    ({
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      // chiếm 90% viewport, nhưng trên md giới hạn ~1200px
      fluid: 'max-w-[90vw] md:max-w-[1200px]',
    }[maxWidth] || 'max-w-5xl');

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto"
      aria-modal="true"
      role="dialog"
    >
      {/* spacing top/bottom để modal không dính viền trên dưới */}
      <div className="w-full px-4 py-10">
        <div
          ref={modalRef}
          className={`relative mx-auto w-full ${maxWidthClass} bg-white rounded-lg shadow-xl border border-neutral-200 animate-slide-up ${containerClassName}`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${headerClassName}`}>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-neutral-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Body: giới hạn chiều cao + scroll nội dung */}
          <div className={`p-6 overflow-y-auto max-h-[80vh] ${bodyClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
