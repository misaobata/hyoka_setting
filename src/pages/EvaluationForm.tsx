import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Rating } from '../components/Rating';
import { Badge } from '../components/Badge';
import { ArrowLeft, Save, Send } from 'lucide-react';

export const EvaluationForm: React.FC = () => {
    const { id } = useParams();
    console.log('Viewing evaluation:', id);
    const navigate = useNavigate();

    // Mock data fetching based on ID
    const employeeName = "Sarah Miller";

    const [scores, setScores] = useState({
        performance: 0,
        softSkills: 0,
        leadership: 0
    });

    return (
        <div className="evaluation-form-page">
            <button
                onClick={() => navigate('/evaluations')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--spacing-lg)',
                    fontWeight: 500
                }}
            >
                <ArrowLeft size={20} />
                Back to List
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2xs)' }}>Evaluate {employeeName}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Senior Designer</span>
                        <span style={{ color: 'var(--color-border)' }}>|</span>
                        <Badge label="In Progress" variant="warning" />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                        padding: '10px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        fontWeight: 500,
                        color: 'var(--color-text-secondary)'
                    }}>
                        <Save size={18} />
                        Save Draft
                    </button>
                    <button style={{
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        fontWeight: 600
                    }}>
                        <Send size={18} />
                        Submit Review
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    <Card title="Core Competencies">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>

                            <div className="form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ fontWeight: 600 }}>Technical Performance</label>
                                    <Rating value={scores.performance} onChange={(v) => setScores({ ...scores, performance: v })} />
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                                    Quality of code, architectural decisions, and technical leadership.
                                </p>
                                <textarea
                                    placeholder="Provide specific examples..."
                                    style={{
                                        width: '100%',
                                        minHeight: '100px',
                                        padding: '12px',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ fontWeight: 600 }}>Soft Skills & Communication</label>
                                    <Rating value={scores.softSkills} onChange={(v) => setScores({ ...scores, softSkills: v })} />
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                                    Team collaboration, clarity in communication, and mentorship.
                                </p>
                                <textarea
                                    placeholder="Provide specific examples..."
                                    style={{
                                        width: '100%',
                                        minHeight: '100px',
                                        padding: '12px',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                        </div>
                    </Card>

                    <Card title="Goals & Growth">
                        <div className="form-group">
                            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Achievements this Cycle</label>
                            <textarea
                                placeholder="What did they achieve?"
                                style={{
                                    width: '100%',
                                    minHeight: '100px',
                                    padding: '12px',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    resize: 'vertical'
                                }}
                            />
                        </div>
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Areas for Improvement</label>
                            <textarea
                                placeholder="Where can they grow?"
                                style={{
                                    width: '100%',
                                    minHeight: '100px',
                                    padding: '12px',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    resize: 'vertical'
                                }}
                            />
                        </div>
                    </Card>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    <Card title="Employee Self-Review">
                        <div style={{ padding: '4px 0' }}>
                            <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                                "I feel I've improved significantly in system architecture this quarter, specifically with the new payment gateway implementation."
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                                <span>Seld-Rating:</span>
                                <span style={{ fontWeight: 600 }}>4.0 / 5.0</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="History">
                        <div style={{ fontSize: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Last Review</span>
                                <span style={{ fontWeight: 500 }}>Oct 2024</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Score</span>
                                <span style={{ fontWeight: 500 }}>4.2</span>
                            </div>
                            <Link to="#" style={{ color: 'var(--color-primary)', display: 'block', marginTop: '8px' }}>View previous reviews</Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
