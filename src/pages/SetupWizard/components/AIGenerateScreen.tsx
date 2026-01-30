import React from 'react';
import { AIProcessScreen } from './AIProcessScreen';
import { MockAIService } from '../services/mockAI';

interface AIGenerateProps {
    source: 'past_sheets' | 'policy';
}

export const AIGenerateScreen: React.FC<AIGenerateProps> = ({ source }) => {
    const processFn = source === 'past_sheets'
        ? MockAIService.generateFromPastSheets
        : MockAIService.rebuildTemplate;

    const title = source === 'past_sheets' ? "過去シートから生成中..." : "規定から生成中...";

    return (
        <AIProcessScreen
            title={title}
            subtext="評価ビューの作成、フィールドのマッピング、スコアリングモデルの設定を行っています。"
            processFn={processFn}
            onComplete={(_result) => {
                // Mock items extraction from result or side-effect
                // In real app, result would contain items.
                // For now, let's inject them via side effect or expect MockAIService to return them.
                // Let's assume MockAIService returns templateDraft, and we extract items from it.
                // Since we don't want to change MockAI signature too much yet, just mock here.
            }}
            nextScreenId="scr_draft_review"
        />
    );
};
