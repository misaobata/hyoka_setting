import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, width = '600px' }) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (overlayRef.current === e.target) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                opacity: 0,
                animation: 'fadeIn 0.2s forwards'
            }}
        >
            <div style={{
                backgroundColor: '#fff',
                borderRadius: 'var(--radius-lg)',
                width: width,
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-xl)',
                transform: 'scale(0.95)',
                animation: 'scaleUp 0.2s forwards'
            }}>
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{title}</h3>
                    <button
                        onClick={onClose}
                        style={{ color: 'var(--color-text-secondary)', padding: '4px', borderRadius: '4px' }}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                    {children}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { to { opacity: 1; } }
                @keyframes scaleUp { to { transform: scale(1); } }
            `}</style>
        </div>,
        document.body
    );
};
