import React from 'react';
import { useWizard } from '../WizardContext';
import { Sparkles } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
    const { goToNext } = useWizard();

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
            <div style={{
                width: 80, height: 80,
                backgroundColor: 'var(--color-primary-subtle)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '24px',
                color: 'var(--color-primary)'
            }}>
                <Sparkles size={40} />
            </div>

            <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>AI評価セットアップ</h1>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', marginBottom: '40px', lineHeight: 1.6 }}>
                AIが既存のドキュメントを分析、またはゼロから評価制度を構築します。<br />
                所要時間は約3分です。
            </p>

            <button
                onClick={() => goToNext('scr_status_select')}
                style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    padding: '14px 32px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow: 'var(--shadow-md)',
                    transition: 'transform 0.1s'
                }}
            >
                セットアップを開始
            </button>

            <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--color-text-light)' }}>
                AIが設定の99%を自動化します。あなたは承認するだけです。
            </p>
        </div>
    );
};
