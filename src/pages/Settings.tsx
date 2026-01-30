import { useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Save, Eye } from 'lucide-react';
import { Modal } from '../components/Modal';
import { EvaluationSheetPreview } from './SetupWizard/components/EvaluationSheetPreview';

export const Settings = () => {
    const { config, updateConfig } = useConfig();
    const [showPreview, setShowPreview] = useState(false);

    // For simplicity in this prototype, we edit cycle directly here, 
    // but items might need a more complex editor (like DraftReviewScreen).
    // Let's allow editing cycle params.

    const [cycle, setCycle] = useState(config.cycle);
    const [isDirty, setIsDirty] = useState(false);

    const handleCycleChange = (field: string, value: string) => {
        setCycle({ ...cycle, [field]: value });
        setIsDirty(true);
    };

    const saveChanges = () => {
        updateConfig({ cycle });
        setIsDirty(false);
        // Show success toast ideally
    };

    if (!config.isActive) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">設定</h1>
                <Card style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                        まだ評価制度がセットアップされていません。
                    </p>
                    <a
                        href="/setup"
                        style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 600 }}
                    >
                        セットアップウィザードを開始する
                    </a>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">評価制度設定</h1>

            <div style={{ display: 'grid', gap: '24px' }}>
                {/* Basic Info */}
                <Card style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>基本情報</h2>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <div>
                            <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)' }}>制度名</span>
                            <span style={{ fontWeight: 500 }}>{config.systemName}</span>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)' }}>ステータス</span>
                            <Badge label="運用中" variant="success" />
                        </div>
                    </div>
                </Card>

                {/* Cycle Settings */}
                <Card style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600 }}>評価サイクル設定</h2>
                        {isDirty && (
                            <button onClick={saveChanges} style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Save size={18} /> 保存する
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>評価頻度</label>
                            <select
                                value={cycle.frequency}
                                onChange={e => handleCycleChange('frequency', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                            >
                                <option>年次</option>
                                <option>半期ごと</option>
                                <option>四半期ごと</option>
                                <option>毎月</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>賞与連動</label>
                            <select
                                value={cycle.bonus}
                                onChange={e => handleCycleChange('bonus', e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                            >
                                <option>あり</option>
                                <option>なし</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Items & Preview */}
                <Card style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600 }}>評価シート構成</h2>
                        <button
                            onClick={() => setShowPreview(true)}
                            style={{
                                backgroundColor: 'var(--color-bg-base)',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                fontWeight: 600,
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <Eye size={18} /> シートプレビューを確認
                        </button>
                    </div>

                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                        現在 {config.items.length} 個の評価項目が設定されています。
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {config.items.map((item: any, idx: number) => (
                            <Badge key={idx} label={item.category} variant="neutral" />
                        ))}
                    </div>
                </Card>
            </div>

            <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="現在の評価シート設定" width="800px">
                <EvaluationSheetPreview items={config.items} />
            </Modal>
        </div>
    );
};
