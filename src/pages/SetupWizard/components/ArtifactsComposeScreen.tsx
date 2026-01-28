import React from 'react';
import { AIProcessScreen } from './AIProcessScreen';
import { MockAIService } from '../services/mockAI';

export const ArtifactsComposeScreen: React.FC = () => {
    return (
        <AIProcessScreen
            title="アーティファクトを作成中..."
            subtext="評価テンプレート、スケジュール、およびイベントインスタンスを構築しています。"
            processFn={MockAIService.composeArtifacts}
            onComplete={() => { }}
            nextScreenId="scr_ai_create_events"
        />
    );
};
