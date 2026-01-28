import React from 'react';
import { Card } from './Card';
import '../styles/components/StatCard.css';

interface StatCardProps {
    label: string;
    value: string | number;
    trend?: {
        value: number; // percentage
        isPositive: boolean;
    };
    icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => {
    return (
        <Card className="stat-card">
            <div className="stat-card-inner">
                <div className="stat-content">
                    <p className="stat-label">{label}</p>
                    <div className="stat-value">{value}</div>

                    {trend && (
                        <div className={`stat-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                            <span className="trend-label">vs last month</span>
                        </div>
                    )}
                </div>

                {icon && <div className="stat-icon">{icon}</div>}
            </div>
        </Card>
    );
};
