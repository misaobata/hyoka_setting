import React, { useState, useEffect } from 'react';
import { useWizard } from '../WizardContext';
import { MockAIService } from '../services/mockAI';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card } from '../../../components/Card';

export const AIDetectionScreen: React.FC = () => {
    const { updateData, goToNext } = useWizard() as any;
    const [status, setStatus] = useState<'processing' | 'done'>('processing');
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            const res = await MockAIService.detectExistingSystem([]);
            setResult(res);
            updateData('existingSystemDetected', res.existingSystemDetected);
            updateData('confidenceScore', res.confidenceScore);
            updateData('evidenceSummary', res.evidenceSummary);
            setStatus('done');
        };
        run();
    }, [updateData]);

    if (status === 'processing') {
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <Loader2 size={48} className="spin-animation" style={{ color: 'var(--color-primary)', marginBottom: '24px' }} />
                <h2>AIがワークスペースを分析中...</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>既存の規定ドキュメントやシートを探しています。</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .spin-animation { animation: spin 2s linear infinite; }`}</style>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>分析完了</h2>

            <Card className="result-card" style={{ padding: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>検出結果</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        {result.existingSystemDetected ? <CheckCircle size={20} color="var(--color-success)" /> : <AlertTriangle size={20} />}
                        {result.existingSystemDetected ? '既存システムを検出' : 'システムが見つかりません'}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>確信度</span>
                    <span style={{ fontWeight: 600 }}>{result.confidenceScore}%</span>
                </div>
                <div>
                    <span style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px' }}>根拠</span>
                    <div style={{ backgroundColor: 'var(--color-bg-app)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '14px' }}>
                        {result.evidenceSummary}
                    </div>
                </div>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                    onClick={() => goToNext('scr_ai_path_decision')}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 32px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600
                    }}
                >
                    この内容で進める
                </button>
            </div>
        </div>
    );
};
