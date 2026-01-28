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
            onComplete={() => { }}
            nextScreenId="scr_ai_cycle_confirm"
        />
    );
};
