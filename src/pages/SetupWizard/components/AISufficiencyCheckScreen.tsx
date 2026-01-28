import React, { useState, useEffect } from 'react';
import { useWizard } from '../WizardContext';
import { MockAIService } from '../services/mockAI';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { Card } from '../../../components/Card';
import { Badge } from '../../../components/Badge';

export const AISufficiencyCheckScreen: React.FC = () => {
    const { goToNext, updateData } = useWizard();
    const [status, setStatus] = useState<'processing' | 'done'>('processing');
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            const res = await MockAIService.analyzeDataSufficiency();
            setResult(res);
            updateData('sufficiencyLevel', res.sufficiencyLevel);
            updateData('recommendedPath', res.recommendedPath);
            setStatus('done');
        };
        run();
    }, [updateData]);

    const handleContinue = () => {
        if (result.recommendedPath === 'from_past_sheets') {
            goToNext('scr_ai_generate_from_past_sheets');
        } else if (result.recommendedPath === 'from_existing_policy') {
            goToNext('scr_ai_generate_from_existing_policy');
        } else {
            goToNext('scr_new_template_create');
        }
    };

    if (status === 'processing') {
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <Loader2 size={48} className="spin-animation" style={{ color: 'var(--color-primary)', marginBottom: '24px' }} />
                <h2>データの充足度をチェック中...</h2>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .spin-animation { animation: spin 2s linear infinite; }`}</style>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>データ分析結果</h2>

            <Card style={{ padding: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                        <CheckCircle size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>データ充足度</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{result.sufficiencyLevel}</div>
                    </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px' }}>推奨パス</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--color-primary)' }}>
                        過去のシートから生成 <Badge label="ベストマッチ" variant="primary" />
                    </div>
                </div>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleContinue}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        padding: '12px 32px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    生成に進む <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};
