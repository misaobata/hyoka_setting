import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { Card } from '../../../components/Card';
import { Badge } from '../../../components/Badge';
import { Modal } from '../../../components/Modal'; // Import Modal
import { EvaluationSheetPreview } from './EvaluationSheetPreview'; // Import Preview
import { Edit2, Save, Trash2, Plus, Eye } from 'lucide-react'; // Import Eye

export const DraftReviewScreen: React.FC = () => {
    const { state, updateData, goToNext } = useWizard();
    const [editingItem, setEditingItem] = useState<number | null>(null);
    const [newItemText, setNewItemText] = useState('');
    const [showPreview, setShowPreview] = useState(false); // Modal state

    // Mock initial data if empty (for prototype robustness)
    const initialItems = state.data.generatedItems || [
        { id: 1, category: '成果目標', content: '半期の売上目標達成率', source: 'template' },
        { id: 2, category: '行動評価', content: 'チームへのナレッジ共有', source: 'template' },
        { id: 3, category: 'スキル', content: '技術的課題の解決能力', source: 'template' }
    ];

    const [items, setItems] = useState(initialItems);

    const handleSaveItem = (id: number, newContent: string) => {
        setItems(items.map((item: any) => item.id === id ? { ...item, content: newContent, source: 'modified' } : item));
        setEditingItem(null);
    };

    const handleDelete = (id: number) => {
        setItems(items.filter((item: any) => item.id !== id));
    };

    const handleAddItem = () => {
        if (!newItemText) return;
        const newItem = {
            id: Date.now(),
            category: '追加項目',
            content: newItemText,
            source: 'user'
        };
        setItems([...items, newItem]);
        setNewItemText('');
    };

    const handleNext = () => {
        updateData('generatedItems', items);
        goToNext('scr_ai_cycle_confirm');
    };

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h2 style={{ textAlign: 'center', flex: 1 }}>設定内容の確認・編集</h2>
                <button
                    onClick={() => setShowPreview(true)}
                    style={{
                        color: 'var(--color-primary)',
                        display: 'flex', alignItems: 'center', gap: '4px',
                        border: '1px solid var(--color-primary)',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '13px',
                        fontWeight: 600,
                        backgroundColor: '#fff'
                    }}
                >
                    <Eye size={16} /> シートプレビュー
                </button>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                AIが生成した評価項目を確認してください。必要に応じて修正できます。
            </p>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px' }}>
                {items.map((item: any) => (
                    <Card key={item.id} style={{ marginBottom: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{item.category}</span>
                                {item.source === 'modified' && <Badge label="修正済み" variant="warning" />}
                                {item.source === 'user' && <Badge label="追加" variant="primary" />}
                            </div>

                            {editingItem === item.id ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        defaultValue={item.content}
                                        id={`edit-input-${item.id}`}
                                        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--color-primary)' }}
                                    />
                                    <button
                                        onClick={() => {
                                            const val = (document.getElementById(`edit-input-${item.id}`) as HTMLInputElement).value;
                                            handleSaveItem(item.id, val);
                                        }}
                                        style={{ color: 'var(--color-primary)' }}
                                    >
                                        <Save size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div style={{ fontWeight: 500 }}>{item.content}</div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginLeft: '16px' }}>
                            {editingItem !== item.id && (
                                <>
                                    <button onClick={() => setEditingItem(item.id)} style={{ color: 'var(--color-text-secondary)' }}>
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} style={{ color: 'var(--color-danger)' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </>
                            )}
                        </div>
                    </Card>
                ))}

                <Card style={{ padding: '16px', borderStyle: 'dashed', borderColor: 'var(--color-border)' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            placeholder="新しい項目を追加..."
                            value={newItemText}
                            onChange={e => setNewItemText(e.target.value)}
                            style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                        <button
                            onClick={handleAddItem}
                            disabled={!newItemText}
                            style={{
                                backgroundColor: newItemText ? 'var(--color-primary)' : 'var(--color-bg-base)',
                                color: newItemText ? '#fff' : 'var(--color-text-light)',
                                padding: '8px 16px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '4px'
                            }}
                        >
                            <Plus size={16} /> 追加
                        </button>
                    </div>
                </Card>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    確認して次へ
                </button>
            </div>

            {/* Preview Modal */}
            <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="評価シートプレビュー" width="800px">
                <EvaluationSheetPreview items={items} />
            </Modal>
        </div>
    );
};
