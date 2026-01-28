import React from 'react';
import '../styles/components/Badge.css';

export interface BadgeProps {
    label: string;
    variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', className = '' }) => {
    return (
        <span className={`badge badge-${variant} ${className}`}>
            {label}
        </span>
    );
};
