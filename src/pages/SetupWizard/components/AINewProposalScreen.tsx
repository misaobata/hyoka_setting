import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { MockAIService } from '../services/mockAI';
import { Loader2 } from 'lucide-react';

export const AINewProposalScreen: React.FC = () => {
    const { setAnswer, goToNext, updateData } = useWizard() as any;
    const [submitting, setSubmitting] = useState(false);

    const [answers, setLocalAnswers] = useState({
        q_headcount: '〜50名',
        q_roles: 'エンジニア/クリエイティブ中心',
        q_priority: ['成果'],
        q_bonus: 'あり'
    });

    const handleSubmit = async () => {
        setSubmitting(true);
        Object.entries(answers).forEach(([k, v]) => setAnswer(k, v));

        const result = await MockAIService.proposeNewSystem(answers);
        updateData('cycleDraft', result.cycleDraft);

        // Also set some default items for the review screen based on answers
        // (Mocking this behavior here for prototype)
        const mockItems = [
            { id: 1, category: '成果目標', content: '部門目標への貢献度', source: 'ai' },
            { id: 2, category: '重要行動', content: 'チームワークと情報共有', source: 'ai' },
            { id: 3, category: 'スキル', content: '専門性と継続学習', source: 'ai' }
        ];
        updateData('generatedItems', mockItems);

        setSubmitting(false);
        goToNext('scr_draft_review');
    };

    if (submitting) {
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <Loader2 size={48} className="spin-animation" style={{ color: 'var(--color-primary)', marginBottom: '24px' }} />
                <h2>提案を作成中...</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>AIが最適な評価サイクルと基準を設計しています。</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .spin-animation { animation: spin 2s linear infinite; }`}</style>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>新システムの提案</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                AIがシステムを最適化するために、いくつか質問にお答えください。
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                <div className="form-group">
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>従業員数</label>
                    <select
                        value={answers.q_headcount}
                        onChange={e => setLocalAnswers({ ...answers, q_headcount: e.target.value })}
                        style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    >
                        <option>〜50名</option>
                        <option>51〜200名</option>
                        <option>201名以上</option>
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>主な職種</label>
                    <select
                        value={answers.q_roles}
                        onChange={e => setLocalAnswers({ ...answers, q_roles: e.target.value })}
                        style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    >
                        <option>エンジニア/クリエイティブ中心</option>
                        <option>営業/ビジネス職中心</option>
                        <option>混在</option>
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>賞与制度</label>
                    <select
                        value={answers.q_bonus}
                        onChange={e => setLocalAnswers({ ...answers, q_bonus: e.target.value })}
                        style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    >
                        <option>あり</option>
                        <option>なし</option>
                    </select>
                </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 40px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600
                    }}
                >
                    提案を作成
                </button>
            </div>
        </div>
    );
};
