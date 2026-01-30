import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { Check, Eye } from 'lucide-react';
import { Modal } from '../../../components/Modal';
import { EvaluationSheetPreview } from './EvaluationSheetPreview';

const TEMPLATES = [
    {
        id: 't_engineer',
        name: 'エンジニア向け成果評価',
        desc: '技術力と成果を重視した、モダンなテック企業向けテンプレート。',
        tags: ['IT', 'エンジニア', '成果主義']
    },
    {
        id: 't_sales',
        name: '営業・ビジネス職向けKPI評価',
        desc: '定量的目標と行動指針を組み合わせた営業組織向け。',
        tags: ['営業', 'KPI', 'MBO']
    },
    {
        id: 't_general',
        name: '一般職・事務職向けコンピテンシー評価',
        desc: '行動特性と定性的な貢献を評価する汎用的なモデル。',
        tags: ['全職種', 'コンピテンシー', '定性']
    },
    {
        id: 't_startup',
        name: 'スタートアップ総合評価（360度）',
        desc: 'カルチャーフィットと多面評価を取り入れた成長企業向け。',
        tags: ['スタートアップ', '360度', 'バリュー']
    }
];

// Mock data for previews
const MOCK_TEMPLATE_ITEMS: Record<string, any[]> = {
    't_engineer': [
        { id: 1, category: '成果目標', content: 'プロダクトリリースと品質担保', source: 'template' },
        { id: 2, category: '成果目標', content: '技術的負債の解消', source: 'template' },
        { id: 3, category: 'スキル', content: 'アーキテクチャ設計能力', source: 'template' },
        { id: 4, category: 'スキル', content: 'コード品質とレビュー', source: 'template' },
        { id: 5, category: '行動評価', content: 'チームへの技術共有', source: 'template' }
    ],
    't_sales': [
        { id: 1, category: '成果目標', content: '四半期売上目標の達成', source: 'template' },
        { id: 2, category: '成果目標', content: '新規顧客獲得数', source: 'template' },
        { id: 3, category: '重要行動', content: '顧客課題のヒアリング', source: 'template' },
        { id: 4, category: '重要行動', content: '提案スピードと正確性', source: 'template' }
    ],
    't_general': [
        { id: 1, category: '成果目標', content: '業務プロセスの効率化', source: 'template' },
        { id: 2, category: 'コンピテンシー', content: '責任感と規律', source: 'template' },
        { id: 3, category: 'コンピテンシー', content: '協調性とコミュニケーション', source: 'template' },
        { id: 4, category: 'スキル', content: '事務処理能力', source: 'template' }
    ],
    't_startup': [
        { id: 1, category: 'MBO', content: 'OKRの達成度', source: 'template' },
        { id: 2, category: 'バリュー', content: 'Be Bold (大胆にやる)', source: 'template' },
        { id: 3, category: 'バリュー', content: 'Give First (まずは与える)', source: 'template' },
        { id: 4, category: '360度', content: '周囲へのポジティブな影響', source: 'template' }
    ]
};

export const TemplateSelectScreen: React.FC = () => {
    const { goToNext, updateData } = useWizard();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);

    const handleSelect = (template: any) => {
        setSelectedId(template.id);
    };

    const handleNext = () => {
        if (!selectedId) return;

        const template = TEMPLATES.find(t => t.id === selectedId);
        // Save selected template to context
        updateData('templateDraft', { name: template?.name, source: 'template_selection' });

        // Use the mock items as the initial generated items
        updateData('generatedItems', MOCK_TEMPLATE_ITEMS[selectedId] || []);

        // Mocking cycle data for this path as well
        updateData('cycleDraft', {
            frequency: '半期ごと',
            bonus: 'あり',
            events: '目標設定 -> 中間レビュー -> 期末評価'
        });

        // Go to draft review instead of confirm (as per new "Review & Repair" plan)
        goToNext('scr_draft_review');
    };

    const handlePreview = (e: React.MouseEvent, tId: string) => {
        e.stopPropagation(); // Prevent selection when clicking preview
        setPreviewTemplateId(tId);
    };

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>テンプレートを選択</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                自社の組織に最も近いモデルを選んでください。後でカスタマイズできます。
            </p>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {TEMPLATES.map(t => (
                    <div
                        key={t.id}
                        onClick={() => handleSelect(t)}
                        style={{
                            border: `2px solid ${selectedId === t.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-md)',
                            padding: '16px',
                            cursor: 'pointer',
                            backgroundColor: selectedId === t.id ? 'var(--color-primary-subtle)' : '#fff',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px'
                        }}
                    >
                        <div style={{
                            width: '20px', height: '20px',
                            borderRadius: '50%',
                            border: `2px solid ${selectedId === t.id ? 'var(--color-primary)' : 'var(--color-text-light)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                            backgroundColor: selectedId === t.id ? 'var(--color-primary)' : 'transparent'
                        }}>
                            {selectedId === t.id && <Check size={12} color="#fff" />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{t.name}</h3>
                                <button
                                    onClick={(e) => handlePreview(e, t.id)}
                                    style={{
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                        color: 'var(--color-text-secondary)',
                                        backgroundColor: '#fff',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Eye size={14} /> プレビュー
                                </button>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>{t.desc}</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {t.tags.map(tag => (
                                    <span key={tag} style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: 'var(--color-bg-app)', borderRadius: '10px', color: 'var(--color-text-secondary)' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleNext}
                    disabled={!selectedId}
                    style={{
                        backgroundColor: !selectedId ? 'var(--color-text-light)' : 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 40px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        cursor: !selectedId ? 'not-allowed' : 'pointer'
                    }}
                >
                    このテンプレートで作成
                </button>
            </div>

            <Modal isOpen={!!previewTemplateId} onClose={() => setPreviewTemplateId(null)} title="テンプレートプレビュー" width="800px">
                {previewTemplateId && (
                    <EvaluationSheetPreview items={MOCK_TEMPLATE_ITEMS[previewTemplateId]} />
                )}
            </Modal>
        </div>
    );
};
