import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { Card } from '../../../components/Card';
import { Calendar, DollarSign, List, Edit2, Check } from 'lucide-react';

export const CycleConfirmScreen: React.FC = () => {
    const { state, goToNext, updateData } = useWizard();
    const [isEditing, setIsEditing] = useState(false);

    const initialDraft = state.data.cycleDraft || {
        frequency: '半期ごと',
        bonus: 'あり',
        events: '目標設定, 評価'
    };

    const [draft, setDraft] = useState(initialDraft);

    const handleSave = () => {
        updateData('cycleDraft', draft);
        setIsEditing(false);
    };

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>評価サイクルの確認</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                AIがあなたの入力とベストプラクティスに基づき、以下を最適化しました。
            </p>

            <Card style={{ padding: '24px', marginBottom: '32px', position: 'relative' }}>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <Edit2 size={20} />
                    </button>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                    <Calendar size={24} color="var(--color-primary)" style={{ marginTop: 4 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>頻度</div>
                        {isEditing ? (
                            <select
                                value={draft.frequency}
                                onChange={(e) => setDraft({ ...draft, frequency: e.target.value })}
                                style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                            >
                                <option>年次</option>
                                <option>半期ごと</option>
                                <option>四半期ごと</option>
                                <option>毎月</option>
                            </select>
                        ) : (
                            <div style={{ fontSize: '18px' }}>{draft.frequency}</div>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', padding: '24px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <DollarSign size={24} color="var(--color-primary)" style={{ marginTop: 4 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>賞与連動</div>
                        {isEditing ? (
                            <select
                                value={draft.bonus}
                                onChange={(e) => setDraft({ ...draft, bonus: e.target.value })}
                                style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                            >
                                <option>あり</option>
                                <option>なし</option>
                            </select>
                        ) : (
                            <div style={{ fontSize: '18px' }}>{draft.bonus}</div>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', paddingTop: '24px' }}>
                    <List size={24} color="var(--color-primary)" style={{ marginTop: 4 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>イベントフロー</div>
                        {isEditing ? (
                            <input
                                value={draft.events}
                                onChange={(e) => setDraft({ ...draft, events: e.target.value })}
                                style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                            />
                        ) : (
                            <div style={{ fontSize: '18px' }}>{draft.events}</div>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleSave}
                            style={{ backgroundColor: 'var(--color-primary)', color: '#fff', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', border: 'none', cursor: 'pointer' }}
                        >
                            <Check size={16} /> 保存
                        </button>
                    </div>
                )}
            </Card>

            {!isEditing && (
                <div style={{ backgroundColor: 'var(--color-primary-subtle)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--color-primary)', textAlign: 'center' }}>
                        <strong>根拠:</strong> 従業員数と職種構成に基づき、運用負荷とフィードバック頻度のバランスをとっています。
                    </p>
                </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                {!isEditing && (
                    <>
                        <button
                            onClick={() => goToNext('scr_draft_review')} // Allow going back to item review
                            style={{
                                padding: '12px 24px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                fontWeight: 600,
                                color: 'var(--color-text-secondary)',
                                background: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            項目設定へ戻る
                        </button>
                        <button
                            onClick={() => goToNext('scr_ai_create_events')}
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: '#fff',
                                padding: '12px 40px',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            承認して続ける
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
