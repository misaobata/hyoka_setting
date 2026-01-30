import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { Card } from '../../../components/Card';
import { Upload, FileText, X, ArrowRight } from 'lucide-react';

export const DataSourceUploadScreen: React.FC = () => {
    const { goToNext, updateData } = useWizard();
    const [files, setFiles] = useState<any[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Mock file adding
        const droppedFiles = Array.from(e.dataTransfer.files).map(f => ({
            name: f.name,
            size: (f.size / 1024).toFixed(0) + 'KB',
            type: f.type
        }));
        setFiles([...files, ...droppedFiles]);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).map(f => ({
                name: f.name,
                size: (f.size / 1024).toFixed(0) + 'KB',
                type: f.type
            }));
            setFiles([...files, ...selectedFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        // In a real app, we would upload files here.
        // For prototype, we just pass the count or metadata.
        updateData('answers', { uploadedFiles: files });
        goToNext('scr_ai_detection');
    };

    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>資料のアップロード</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                AIが分析するための根拠資料（過去の評価シート、人事規定、等級定義など）をアップロードしてください。<br />
                PDF, Excel, Word形式に対応しています。
            </p>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: `2px dashed ${isDragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '40px',
                    backgroundColor: isDragging ? 'var(--color-primary-subtle)' : '#fff',
                    textAlign: 'center',
                    marginBottom: '24px',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                }}
            >
                <div style={{
                    width: '64px', height: '64px',
                    borderRadius: '50%', backgroundColor: 'var(--color-bg-base)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'var(--color-text-secondary)'
                }}>
                    <Upload size={32} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>ここにファイルをドラッグ＆ドロップ</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', marginBottom: '24px' }}>
                    または
                </p>
                <label style={{
                    backgroundColor: '#fff',
                    border: '1px solid var(--color-border)',
                    padding: '8px 24px', borderRadius: '4px',
                    fontWeight: 600, cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    ファイルを選択
                    <input type="file" multiple style={{ display: 'none' }} onChange={handleFileInput} />
                </label>
            </div>

            {files.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
                        アップロードされたファイル ({files.length})
                    </h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {files.map((file, idx) => (
                            <Card key={idx} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <FileText size={20} color="var(--color-primary)" />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 500 }}>{file.name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--color-text-light)' }}>{file.size}</div>
                                    </div>
                                </div>
                                <button onClick={() => removeFile(idx)} style={{ color: 'var(--color-text-secondary)', padding: '4px' }}>
                                    <X size={16} />
                                </button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleNext}
                    style={{
                        backgroundColor: files.length > 0 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        color: '#fff',
                        padding: '12px 40px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '8px',
                        cursor: 'pointer'
                    }}
                >
                    {files.length > 0 ? (
                        <>分析を開始する <ArrowRight size={18} /></>
                    ) : (
                        <>スキップして進む <ArrowRight size={18} /></>
                    )}
                </button>
            </div>
        </div>
    );
};
