import React from 'react';
import { AIProcessScreen } from './AIProcessScreen';
import { MockAIService } from '../services/mockAI';
import { useWizard } from '../WizardContext';

export const AIRebuildScreen: React.FC = () => {
    const { updateData } = useWizard();

    const handleComplete = (result: any) => {
        updateData('templateDraft', result.templateDraft);
        updateData('cycleDraft', result.cycleDraft);
    };

    return (
        <AIProcessScreen
            title="既存システムから再構築中..."
            subtext="ドキュメントから評価サイクル、イベント、スコアリングモデルを抽出しています。"
            processFn={MockAIService.rebuildTemplate}
            onComplete={handleComplete}
            nextScreenId="scr_ai_sufficiency_check"
        />
    );
};
