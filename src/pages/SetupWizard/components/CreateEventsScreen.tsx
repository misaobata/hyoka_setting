import React from 'react';
import { useWizard } from '../WizardContext';
import { MockAIService } from '../services/mockAI';
import { Card } from '../../../components/Card';
import { Calendar } from 'lucide-react';
import { AIProcessScreen } from './AIProcessScreen';

export const CreateEventsScreen: React.FC = () => {
    const { goToNext } = useWizard();
    const [submitting, setSubmitting] = React.useState(false);

    const handleCreate = async () => {
        setSubmitting(true);
        await MockAIService.createEvents();
        setSubmitting(false);
        goToNext('scr_final_approval');
    };

    if (submitting) {
        return (
            <AIProcessScreen
                title="イベントを生成中..."
                subtext="カレンダーエントリと通知スケジュールを作成しています。"
                processFn={async () => { }}
                onComplete={() => { }}
            />
        );
    }

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>評価イベントの作成</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                もう少しで完了です。データソースを接続して、今後のデータ収集を自動化しましょう。
            </p>

            <Card style={{ padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>データコネクタ (推奨)</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { name: 'Notion', icon: '📝', recommended: true },
                        { name: 'Slack', icon: '💬', recommended: true },
                        { name: 'Figma', icon: '🎨', recommended: false },
                    ].map(connector => (
                        <div key={connector.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '20px' }}>{connector.icon}</span>
                                <span style={{ fontWeight: 500 }}>{connector.name}</span>
                                {connector.recommended && <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', borderRadius: '4px' }}>推奨</span>}
                            </div>
                            <div style={{ width: '40px', height: '24px', backgroundColor: 'var(--color-success)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ position: 'absolute', right: '2px', top: '2px', width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleCreate}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 40px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                >
                    <Calendar size={18} />
                    イベント作成して完了
                </button>
            </div>
        </div>
    );
};
