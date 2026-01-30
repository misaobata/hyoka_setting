import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { MessageSquare, LayoutTemplate } from 'lucide-react';

export const MethodSelectScreen: React.FC = () => {
    const { goToNext } = useWizard();
    const [selected, setSelected] = useState<'hearing' | 'template'>('hearing');

    const handleNext = () => {
        if (selected === 'hearing') {
            goToNext('scr_new_template_create'); // Existing flow (AINewProposalScreen)
        } else {
            goToNext('scr_template_select'); // New flow
        }
    };

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>作成方法を選択</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                新しい評価制度をどのように作成しますか？
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div
                    onClick={() => setSelected('hearing')}
                    style={{
                        border: `2px solid ${selected === 'hearing' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        cursor: 'pointer',
                        backgroundColor: selected === 'hearing' ? 'var(--color-primary-subtle)' : '#fff',
                        transition: 'all 0.2s'
                    }}
                >
                    <MessageSquare size={32} color={selected === 'hearing' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} style={{ marginBottom: '16px' }} />
                    <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>AIヒアリング</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        AIの質問に答えて、最適な制度を自動生成します。
                    </p>
                </div>

                <div
                    onClick={() => setSelected('template')}
                    style={{
                        border: `2px solid ${selected === 'template' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        cursor: 'pointer',
                        backgroundColor: selected === 'template' ? 'var(--color-primary-subtle)' : '#fff',
                        transition: 'all 0.2s'
                    }}
                >
                    <LayoutTemplate size={32} color={selected === 'template' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} style={{ marginBottom: '16px' }} />
                    <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>テンプレートから選択</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        標準的なテンプレート一覧から選んでカスタマイズします。
                    </p>
                </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleNext}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 40px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600
                    }}
                >
                    次へ
                </button>
            </div>
        </div>
    );
};
