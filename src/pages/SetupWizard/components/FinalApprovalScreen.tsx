import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FinalApprovalScreen: React.FC = () => {
    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{
                width: 80, height: 80,
                backgroundColor: 'var(--color-success-bg)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '24px',
                color: 'var(--color-success)'
            }}>
                <CheckCircle size={40} />
            </div>

            <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>セットアップ完了</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', marginBottom: '40px', lineHeight: 1.6 }}>
                評価システムの構築が完了しました。AIがテンプレートを生成し、最初のイベントをスケジュールしました。
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '300px' }}>
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
                        color: 'var(--color-text-secondary)'
                    }}
                >
                    評価リストを見る
                </Link>
            </div>
        </div>
    );
};
