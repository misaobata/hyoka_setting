import React, { useState } from 'react';
import { Badge } from '../../../components/Badge';
import { User, Users } from 'lucide-react';

interface PreviewProps {
    items: any[];
}

export const EvaluationSheetPreview: React.FC<PreviewProps> = ({ items }) => {
    const [viewMode, setViewMode] = useState<'employee' | 'evaluator'>('employee');

    const groupedItems = {
        '成果目標': items.filter(i => i.category === '成果目標' || i.category === 'MBO'),
        '行動評価': items.filter(i => i.category === '行動評価' || i.category === 'コンピテンシー' || i.category === '重要行動'),
        'スキル': items.filter(i => i.category === 'スキル' || i.category === '能力'),
        'その他': items.filter(i => !['成果目標', 'MBO', '行動評価', 'コンピテンシー', '重要行動', 'スキル', '能力'].includes(i.category))
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* View Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-base)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
                    <button
                        onClick={() => setViewMode('employee')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: viewMode === 'employee' ? '#fff' : 'transparent',
                            boxShadow: viewMode === 'employee' ? 'var(--shadow-sm)' : 'none',
                            color: viewMode === 'employee' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <User size={16} /> 被評価者（従業員）ビュー
                    </button>
                    <button
                        onClick={() => setViewMode('evaluator')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: viewMode === 'evaluator' ? '#fff' : 'transparent',
                            boxShadow: viewMode === 'evaluator' ? 'var(--shadow-sm)' : 'none',
                            color: viewMode === 'evaluator' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Users size={16} /> 評価者（上長/人事）ビュー
                    </button>
                </div>
            </div>

            {/* Simulated Sheet */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '24px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>202X年度 上期評価シート</h2>
                        <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                            <span><strong>社員番号:</strong> 10234</span>
                            <span><strong>氏名:</strong> 山田 太郎</span>
                            <span><strong>職種:</strong> エンジニア</span>
                            <span><strong>等級:</strong> G3</span>
                        </div>
                    </div>
                    <Badge label={viewMode === 'employee' ? '入力モード: 本人' : '入力モード: 上長'} variant="neutral" />
                </div>

                {Object.entries(groupedItems).map(([category, categoryItems]) => {
                    if (categoryItems.length === 0) return null;
                    return (
                        <div key={category} style={{ marginBottom: '32px' }}>
                            <h3 style={{
                                fontSize: '16px', fontWeight: 600,
                                backgroundColor: 'var(--color-bg-base)',
                                padding: '8px 12px', borderRadius: '4px',
                                marginBottom: '12px', borderLeft: '4px solid var(--color-primary)'
                            }}>
                                {category}
                            </h3>

                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-secondary)', textAlign: 'left' }}>
                                        <th style={{ padding: '8px', width: '30%' }}>項目内容</th>
                                        <th style={{ padding: '8px', width: '35%', backgroundColor: viewMode === 'employee' ? 'var(--color-primary-subtle)' : 'transparent' }}>本人入力（目標/自己評価）</th>
                                        <th style={{ padding: '8px', width: '35%', backgroundColor: viewMode === 'evaluator' ? 'var(--color-primary-subtle)' : 'transparent' }}>上長入力（評価/FB）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryItems.map((item: any) => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                            <td style={{ padding: '12px 8px', verticalAlign: 'top' }}>
                                                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{item.content}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                                                    {category === '成果目標' ? '期初に設定した具体的な定量目標を記載' : '具体的な行動事実に基づき評価'}
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px 8px', verticalAlign: 'top', backgroundColor: viewMode === 'employee' ? '#fff' : 'var(--color-bg-base)' }}>
                                                {viewMode === 'employee' ? (
                                                    <div style={{ border: '1px solid var(--color-primary)', borderRadius: '4px', padding: '8px', minHeight: '60px', color: 'var(--color-text-light)' }}>
                                                        （入力してください）
                                                    </div>
                                                ) : (
                                                    <div style={{ padding: '8px', color: 'var(--color-text-secondary)' }}>
                                                        {category === '成果目標' ? '売上目標120%達成。' : '積極的に勉強会を開催した。'}
                                                    </div>
                                                )}
                                            </td>
                                            <td style={{ padding: '12px 8px', verticalAlign: 'top', backgroundColor: viewMode === 'evaluator' ? '#fff' : 'var(--color-bg-base)' }}>
                                                {viewMode === 'evaluator' ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <select style={{ padding: '4px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                                                            <option>S (期待を大きく上回る)</option>
                                                            <option>A (期待を上回る)</option>
                                                            <option>B (期待通り)</option>
                                                            <option>C (改善が必要)</option>
                                                        </select>
                                                        <textarea
                                                            placeholder="フィードバックを入力..."
                                                            style={{ border: '1px solid var(--color-primary)', borderRadius: '4px', padding: '8px', minHeight: '40px', width: '100%' }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div style={{ padding: '8px', color: 'var(--color-text-light)', fontStyle: 'italic' }}>
                                                        （上長のみ入力可）
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })}

                {/* Overall Comments */}
                <div>
                    <h3 style={{
                        fontSize: '16px', fontWeight: 600,
                        backgroundColor: 'var(--color-bg-base)',
                        padding: '8px 12px', borderRadius: '4px',
                        marginBottom: '12px', borderLeft: '4px solid var(--color-primary)'
                    }}>
                        総合コメント
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>本人コメント</label>
                            <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', padding: '12px', minHeight: '80px', backgroundColor: viewMode === 'employee' ? '#fff' : 'var(--color-bg-base)' }}>
                                {viewMode === 'employee' && <span style={{ color: 'var(--color-text-light)' }}>（今期の振り返りを入力）</span>}
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>上長コメント</label>
                            <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', padding: '12px', minHeight: '80px', backgroundColor: viewMode === 'evaluator' ? '#fff' : 'var(--color-bg-base)' }}>
                                {viewMode === 'evaluator' && <span style={{ color: 'var(--color-text-light)' }}>（本人へのエールや総評）</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
