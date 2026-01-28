import React from 'react';
import { useWizard } from '../WizardContext';
import { FileText, PlusCircle } from 'lucide-react';

export const StatusSelectScreen: React.FC = () => {
    const { goToNext } = useWizard();

    // Hardcoded for now, but could be stateful
    const [selected, setSelected] = React.useState<'existing' | 'new'>('existing');

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '32px', textAlign: 'center' }}>現在の状況をお聞かせください</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div
                    onClick={() => setSelected('existing')}
                    style={{
                        border: `2px solid ${selected === 'existing' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        cursor: 'pointer',
                        backgroundColor: selected === 'existing' ? 'var(--color-primary-subtle)' : '#fff',
                        transition: 'all 0.2s'
                    }}
                >
                    <FileText size={32} color={selected === 'existing' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} style={{ marginBottom: '16px' }} />
                    <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>既存の制度がある</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        評価シート、規定ドキュメント、またはスプレッドシートが存在します。
                    </p>
                </div>

                <div
                    onClick={() => setSelected('new')}
                    style={{
                        border: `2px solid ${selected === 'new' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        cursor: 'pointer',
                        backgroundColor: selected === 'new' ? 'var(--color-primary-subtle)' : '#fff',
                        transition: 'all 0.2s'
                    }}
                >
                    <PlusCircle size={32} color={selected === 'new' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} style={{ marginBottom: '16px' }} />
                    <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>新規作成</h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        ゼロから始めるか、完全に新しい制度を作成したい。
                    </p>
                </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => goToNext('scr_ai_detect_existing')}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 40px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600
                    }}
                >
                    次へ進む
                </button>
            </div>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--color-text-light)' }}>
                どちらを選んでも、AIがドキュメントの再確認を行います。
            </p>
        </div>
    );
};
