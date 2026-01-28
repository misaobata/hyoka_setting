// Simulate AI processing delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockAIService = {
    detectExistingSystem: async (_files: any[]) => {
        await delay(2000);
        // Logic could be smarter based on mock input, but hardcoded for prototype
        return {
            existingSystemDetected: true,
            confidenceScore: 92,
            evidenceSummary: "'2024年期末評価シート.xlsx' と '従業員ハンドブック.pdf' から、等級制度に基づく既存の評価システムの痕跡を検出しました。"
        };
    },

    rebuildTemplate: async () => {
        await delay(2500);
        return {
            // Stubbed template data
            templateDraft: { name: "標準上期評価テンプレート" },
            cycleDraft: { frequency: "半期ごと", bonus: "業績連動あり", events: "目標設定 -> 中間レビュー -> 期末評価" }
        };
    },

    analyzeDataSufficiency: async () => {
        await delay(1500);
        return {
            sufficiencyLevel: "高",
            missingItems: [],
            recommendedPath: "from_past_sheets"
        };
    },

    generateFromPastSheets: async () => {
        await delay(3000);
        return {
            templateDraft: { name: "再構築された評価テンプレート" },
            fieldMapping: { "A列": "目標", "B列": "自己評価" }
        };
    },

    proposeNewSystem: async (answers: any) => {
        await delay(3000);
        return {
            cycleDraft: {
                frequency: answers.headcount === '〜50名' ? '年次' : '半期ごと',
                bonus: answers.bonus === 'あり' ? 'あり' : 'なし',
                events: "目標設定 -> 期末評価"
            }
        };
    },

    composeArtifacts: async () => {
        await delay(2000);
        return {
            evaluationSheetTemplate: true,
            evaluationSchedule: true,
            eventInstancesPlan: true
        };
    },

    createEvents: async () => {
        await delay(1500);
        return {
            createdEvents: 12,
            calendarEntriesOptional: true
        };
    }
};
