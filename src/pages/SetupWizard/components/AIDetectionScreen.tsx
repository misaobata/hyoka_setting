import React, { useEffect, useState } from 'react';
import { useWizard } from '../WizardContext';
import { Scan, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const AIDetectionScreen: React.FC = () => {
    const { state, goToNext, updateData } = useWizard();
    const uploadedFiles = state.data.answers?.uploadedFiles || [];

    // Status tracking for each file if any
    const [fileStatuses, setFileStatuses] = useState<string[]>(
        uploadedFiles.map(() => 'waiting') // waiting, processing, done
    );
    const [overallStatus, setOverallStatus] = useState('initializing'); // initializing, scanning, analyzing, done

    useEffect(() => {
        const processFiles = async () => {
            setOverallStatus('scanning');

            if (uploadedFiles.length > 0) {
                // Process files sequentially
                for (let i = 0; i < uploadedFiles.length; i++) {
                    setFileStatuses(prev => {
                        const next = [...prev];
                        next[i] = 'processing';
                        return next;
                    });

                    // Simulate analysis time per file (800ms)
                    await new Promise(r => setTimeout(r, 800));

                    setFileStatuses(prev => {
                        const next = [...prev];
                        next[i] = 'done';
                        return next;
                    });
                }
            } else {
                // No files, just generic scan
                await new Promise(r => setTimeout(r, 2000));
            }

            setOverallStatus('analyzing');

            // Mock extraction of data from files
            updateData('templateDraft', { name: 'インポートされた既存制度', source: 'file_import' });

            updateData('generatedItems', [
                { id: 101, category: '成果目標', content: '部門売上目標の達成率', source: 'import' },
                { id: 102, category: '行動評価', content: '企業理念の実践', source: 'import' },
                { id: 103, category: 'スキル', content: '業務遂行能力', source: 'import' },
                { id: 104, category: '勤怠', content: '出勤率・遅刻頻度', source: 'import' }
            ]);

            updateData('cycleDraft', {
                frequency: '年次',
                bonus: 'あり',
                events: '目標設定 -> 期末評価 -> フィードバック'
            });

            await new Promise(r => setTimeout(r, 1500));
            setOverallStatus('done');

            // Transition to Review screen (merging flow)
            setTimeout(() => {
                goToNext('scr_draft_review');
            }, 800);
        };

        processFiles();
    }, []);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>

            <div style={{ position: 'relative', marginBottom: '40px' }}>
                <div style={{
                    width: '80px', height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: overallStatus !== 'done' ? 'pulse 2s infinite' : 'none'
                }}>
                    <Scan size={40} color="var(--color-primary)" />
                </div>
                {overallStatus === 'done' && (
                    <div style={{
                        position: 'absolute', bottom: -5, right: -5,
                        backgroundColor: '#fff', borderRadius: '50%', border: '2px solid #fff'
                    }}>
                        <CheckCircle size={32} color="var(--color-success)" fill="#fff" />
                    </div>
                )}
            </div>

            <h2 style={{ fontSize: '24px', marginBottom: '16px', textAlign: 'center' }}>
                {overallStatus === 'initializing' && 'AIエンジンを起動中...'}
                {overallStatus === 'scanning' && (uploadedFiles.length > 0 ? '提出資料をスキャンしています...' : '既存データの探索中...')}
                {overallStatus === 'analyzing' && '評価制度モデルを構築中...'}
                {overallStatus === 'done' && '分析完了'}
            </h2>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', textAlign: 'center', minHeight: '20px' }}>
                {overallStatus === 'scanning' && 'ドキュメント構造と評価基準を抽出しています'}
                {overallStatus === 'analyzing' && '抽出したデータから最適な設計を導き出しています'}
                {overallStatus === 'done' && '次のステップへ進みます'}
            </p>

            {/* File List Visualization */}
            {uploadedFiles.length > 0 && (
                <div style={{ width: '100%', maxWidth: '400px', display: 'grid', gap: '12px' }}>
                    {uploadedFiles.map((file: any, idx: number) => (
                        <div key={idx} style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '12px', borderRadius: '8px',
                            backgroundColor: '#f8fafc', border: '1px solid var(--color-border)',
                            opacity: fileStatuses[idx] === 'waiting' ? 0.6 : 1,
                            transition: 'all 0.3s'
                        }}>
                            <FileText size={20} color={fileStatuses[idx] === 'processing' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />
                            <div style={{ flex: 1, fontSize: '14px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {file.name}
                            </div>
                            <div>
                                {fileStatuses[idx] === 'processing' && <Loader2 size={18} className="spin" color="var(--color-primary)" />}
                                {fileStatuses[idx] === 'done' && <CheckCircle size={18} color="var(--color-success)" />}
                                {fileStatuses[idx] === 'waiting' && <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Files Visualization */}
            {uploadedFiles.length === 0 && overallStatus !== 'initializing' && (
                <div style={{
                    padding: '16px 24px', borderRadius: '8px',
                    backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-secondary)',
                    fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                    <AlertCircle size={16} /> インプット資料なし：標準モデルベースで解析します
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(79, 70, 229, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
                }
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};
