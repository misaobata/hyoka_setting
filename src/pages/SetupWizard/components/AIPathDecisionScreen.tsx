import React from 'react';
import { AIProcessScreen } from './AIProcessScreen';
import { useWizard } from '../WizardContext';

export const AIPathDecisionScreen: React.FC = () => {
    const { state, goToNext } = useWizard();

    const decidePath = async () => {
        // Determine next step based on data
        // In a real app this might verify data integrity
        return state.data.existingSystemDetected;
    };

    const handleDecision = (detected: boolean) => {
        if (detected) {
            goToNext('scr_ai_rebuild_from_existing');
        } else {
            goToNext('scr_ai_propose_new');
        }
    };

    return (
        <AIProcessScreen
            title="最適なパスを判断中..."
            subtext="データの量と質を分析し、最適なセットアップルートを選択しています。"
            processFn={decidePath}
            onComplete={handleDecision}
        />
    );
};
