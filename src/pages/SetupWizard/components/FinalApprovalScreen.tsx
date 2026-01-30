import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Settings, Calendar, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWizard } from '../WizardContext';
import { Card } from '../../../components/Card';
import { Badge } from '../../../components/Badge';
import { useConfig } from '../../../contexts/ConfigContext';

export const FinalApprovalScreen: React.FC = () => {
    const { state, goToNext } = useWizard();
    const { activateSystem } = useConfig();

    // Use state data to show summary
    const { cycleDraft, generatedItems } = state.data;

    useEffect(() => {
        // Activate system when reaching this screen (Conceptually "Done")
        activateSystem(state.data);
    }, []); // Run once

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: 64, height: 64,
                backgroundColor: 'var(--color-success-bg)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '24px',
                color: 'var(--color-success)'
            }}>
                <CheckCircle size={32} />
            </div>

            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>セットアップ完了</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', textAlign: 'center' }}>
                以下の内容で評価システムを構築しました。
            </p>

            <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {/* Cycle Summary */}
                <Card style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={20} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>評価サイクル</h3>
                        </div>
                        <button onClick={() => goToNext('scr_ai_cycle_confirm')} style={{ color: 'var(--color-text-secondary)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Edit3 size={12} /> 修正
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>頻度</div>
                            <div style={{ fontWeight: 500 }}>{cycleDraft?.frequency || '半期ごと'}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>イベント</div>
                            <div style={{ fontWeight: 500 }}>{cycleDraft?.events || '目標設定 -> 評価'}</div>
                        </div>
                    </div>
                </Card>

                {/* Items Summary */}
                <Card style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Settings size={20} color="var(--color-primary)" />
                            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>設定項目</h3>
                        </div>
                        <button onClick={() => goToNext('scr_draft_review')} style={{ color: 'var(--color-text-secondary)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Edit3 size={12} /> 修正
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {generatedItems && generatedItems.length > 0 ? (
                            generatedItems.map((item: any) => (
                                <Badge key={item.id} label={item.category} variant="neutral" />
                            ))
                        ) : (
                            <span style={{ color: 'var(--color-text-light)', fontSize: '13px' }}>項目設定なし</span>
                        )}
                        {generatedItems && generatedItems.length > 3 && <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', padding: '4px' }}>他 {generatedItems.length - 3} 件</span>}
                    </div>
                </Card>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <Link
                    to="/"
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '14px 32px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '16px',
                        fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                >
                    ダッシュボードへ <ArrowRight size={18} />
                </Link>
                <Link
                    to="/evaluations"
                    style={{
                        padding: '14px 32px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)'
                    }}
                >
                    評価リストを見る
                </Link>
            </div>
        </div>
    );
};
