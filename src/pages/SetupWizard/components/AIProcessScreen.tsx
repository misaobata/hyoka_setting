import React, { useEffect } from 'react';
import { useWizard } from '../WizardContext';
import { Loader2 } from 'lucide-react';

interface AIProcessScreenProps {
    title: string;
    subtext: string;
    processFn: () => Promise<any>;
    onComplete: (result: any) => void;
    nextScreenId?: string;
}

export const AIProcessScreen: React.FC<AIProcessScreenProps> = ({
    title,
    subtext,
    processFn,
    onComplete,
    nextScreenId
}) => {
    const { goToNext } = useWizard();

    useEffect(() => {
        let mounted = true;

        const runProcess = async () => {
            try {
                const result = await processFn();
                if (mounted) {
                    onComplete(result);
                    if (nextScreenId) {
                        goToNext(nextScreenId);
                    }
                }
            } catch (error) {
                console.error("AI Process failed", error);
            }
        };

        runProcess();

        return () => { mounted = false; };
    }, [processFn, onComplete, nextScreenId, goToNext]);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
            <div className="ai-pulse" style={{ marginBottom: '24px', color: 'var(--color-primary)' }}>
                <Loader2 size={48} className="spin-animation" />
            </div>

            <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>{title}</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>{subtext}</p>

            <style>{`
        .spin-animation {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};
