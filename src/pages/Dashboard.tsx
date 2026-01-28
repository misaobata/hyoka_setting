import React from 'react';
import { Card } from '../components/Card';
import { StatCard } from '../components/StatCard';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-page">
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2xs)' }}>Dashboard</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back, here's what's happening today.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <StatCard
                    label="Total Employees"
                    value="124"
                    trend={{ value: 12, isPositive: true }}
                    icon={<Users size={24} />}
                />
                <StatCard
                    label="Pending Reviews"
                    value="8"
                    trend={{ value: 5, isPositive: false }}
                    icon={<Clock size={24} />}
                />
                <StatCard
                    label="Completed"
                    value="86%"
                    trend={{ value: 2, isPositive: true }}
                    icon={<CheckCircle size={24} />}
                />
                <StatCard
                    label="Avg Score"
                    value="4.2"
                    trend={{ value: 0.3, isPositive: true }}
                    icon={<FileText size={24} />}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
                <Card title="Pending Evaluations" action={<button style={{ color: 'var(--color-primary)', fontWeight: 500 }}>View All</button>}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {[
                            { name: 'Sarah Miller', role: 'Senior Designer', due: '2 days left', status: 'In Progress' },
                            { name: 'John Cooper', role: 'Product Manager', due: '5 days left', status: 'Not Started' },
                            { name: 'Emily Zhang', role: 'Frontend Dev', due: '1 week left', status: 'Not Started' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 'var(--spacing-md)',
                                backgroundColor: 'var(--color-bg-app)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>
                                        {item.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.role}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 500, color: item.status === 'In Progress' ? 'var(--color-warning)' : 'var(--color-text-secondary)' }}>
                                        {item.status}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>{item.due}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Team Happiness">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ fontSize: '48px' }}>😊</div>
                        <div style={{ fontWeight: 600, fontSize: '18px' }}>Great</div>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Your team spirit is higher than average this quarter.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
