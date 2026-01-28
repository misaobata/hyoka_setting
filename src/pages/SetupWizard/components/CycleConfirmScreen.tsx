import React from 'react';
import { useWizard } from '../WizardContext';
import { Card } from '../../../components/Card';
import { Calendar, DollarSign, List } from 'lucide-react';

export const CycleConfirmScreen: React.FC = () => {
    const { state, goToNext } = useWizard();
    const draft = state.data.cycleDraft || {
        frequency: '半期ごと',
        bonus: 'あり',
        events: '目標設定, 評価'
    };

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>評価サイクルの確認</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                AIがあなたの入力とベストプラクティスに基づき、以下を最適化しました。
            </p>

            <Card style={{ padding: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                    <Calendar size={24} color="var(--color-primary)" style={{ marginTop: 4 }} />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>頻度</div>
                        <div style={{ fontSize: '18px' }}>{draft.frequency}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', padding: '24px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <DollarSign size={24} color="var(--color-primary)" style={{ marginTop: 4 }} />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>賞与連動</div>
                        <div style={{ fontSize: '18px' }}>{draft.bonus}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', paddingTop: '24px' }}>
                    <List size={24} color="var(--color-primary)" style={{ marginTop: 4 }} />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>イベントフロー</div>
                        <div style={{ fontSize: '18px' }}>{draft.events}</div>
                    </div>
                </div>
            </Card>

            <div style={{ backgroundColor: 'var(--color-primary-subtle)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
                <p style={{ fontSize: '14px', color: 'var(--color-primary)', textAlign: 'center' }}>
                    <strong>根拠:</strong> 従業員数と職種構成に基づき、運用負荷とフィードバック頻度のバランスをとっています。
                </p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                    style={{
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)'
                    }}
                >
                    修正する
                </button>
                <button
                    onClick={() => goToNext('scr_ai_compose_artifacts')}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 40px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600
                    }}
                >
                    承認して続ける
                </button>
            </div>
        </div>
    );
};
