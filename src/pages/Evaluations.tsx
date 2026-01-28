import React from 'react';
import { Badge, type BadgeProps } from '../components/Badge';
import { Card } from '../components/Card';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_EMPLOYEES = [
    { id: 1, name: 'Sarah Miller', role: 'Senior Designer', department: 'Design', status: 'In Progress', score: '-', lastReview: '2023-06-15' },
    { id: 2, name: 'John Cooper', role: 'Product Manager', department: 'Product', status: 'Not Started', score: '-', lastReview: '2023-06-12' },
    { id: 3, name: 'Emily Zhang', role: 'Frontend Engineer', department: 'Engineering', status: 'Completed', score: '4.5', lastReview: '2023-12-10' },
    { id: 4, name: 'Michael Chen', role: 'Backend Engineer', department: 'Engineering', status: 'In Progress', score: '-', lastReview: '2023-06-20' },
    { id: 5, name: 'Jessica Wills', role: 'Data Scientist', department: 'Data', status: 'Not Started', score: '-', lastReview: '2023-05-30' },
];

const getStatusVariant = (status: string): BadgeProps['variant'] => {
    switch (status) {
        case 'Completed': return 'success';
        case 'In Progress': return 'warning';
        case 'Not Started': return 'neutral';
        default: return 'neutral';
    }
};

export const Evaluations: React.FC = () => {
    return (
        <div className="evaluations-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2xs)' }}>Evaluations</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Manage and track employee performance reviews.</p>
                </div>
                <button style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600
                }}>
                    New Evaluation Cycle
                </button>
            </div>

            <Card>
                <div style={{ padding: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-md)', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
                    <div className="search-bar" style={{ flex: 1, position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            style={{
                                width: '100%',
                                padding: '10px 10px 10px 40px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        padding: '10px 16px',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-secondary)',
                        fontWeight: 500
                    }}>
                        <Filter size={18} />
                        Filter
                    </button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>Employee</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>Department</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>Last Score</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>Due Date</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_EMPLOYEES.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: 'var(--spacing-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>
                                            {emp.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{emp.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{emp.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>{emp.department}</td>
                                <td style={{ padding: 'var(--spacing-md)' }}>
                                    <Badge label={emp.status} variant={getStatusVariant(emp.status)} />
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>{emp.score}</td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>Oct 24, 2024</td>
                                <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                    <Link to={`/evaluations/${emp.id}`} style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        color: 'var(--color-primary)',
                                        fontWeight: 500,
                                        fontSize: '14px'
                                    }}>
                                        Evaluate <ArrowRight size={16} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    Showing 5 of 24 employees
                </div>
            </Card>
        </div>
    );
};
