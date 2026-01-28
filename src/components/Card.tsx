import React from 'react';
import '../styles/components/Card.css';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    action?: React.ReactNode;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', action, style }) => {
    return (
        <div className={`card ${className}`} style={style}>
            {(title || action) && (
                <div className="card-header">
                    {title && <h3 className="card-title">{title}</h3>}
                    {action && <div className="card-action">{action}</div>}
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};
