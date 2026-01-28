import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
    max?: number;
    value?: number;
    onChange?: (value: number) => void;
    readOnly?: boolean;
}

export const Rating: React.FC<RatingProps> = ({ max = 5, value = 0, onChange, readOnly = false }) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {[...Array(max)].map((_, i) => {
                const ratingValue = i + 1;
                const filled = (hoverValue !== null ? hoverValue : value) >= ratingValue;

                return (
                    <Star
                        key={i}
                        size={24}
                        fill={filled ? 'var(--color-warning)' : 'none'}
                        color={filled ? 'var(--color-warning)' : 'var(--color-border)'}
                        style={{
                            cursor: readOnly ? 'default' : 'pointer',
                            transition: 'transform 0.1s'
                        }}
                        onMouseEnter={() => !readOnly && setHoverValue(ratingValue)}
                        onMouseLeave={() => !readOnly && setHoverValue(null)}
                        onClick={() => !readOnly && onChange?.(ratingValue)}
                    />
                );
            })}
        </div>
    );
};
