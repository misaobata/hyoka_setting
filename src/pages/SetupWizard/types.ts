export interface WizardState {
    currentScreenId: string;
    data: WizardData;
    history: string[];
}

export interface WizardData {
    existingSystemDetected?: boolean;
    confidenceScore?: number;
    evidenceSummary?: string;
    sufficiencyLevel?: string;
    missingItems?: string[];
    recommendedPath?: 'from_past_sheets' | 'from_existing_policy' | 'new_template';
    templateDraft?: any;
    cycleDraft?: {
        frequency: string;
        bonus: string;
        events: string;
    };
    eventInstancesPlan?: any[];
    // User answers
    answers: Record<string, any>;
}

export interface WizardContextType {
    state: WizardState;
    goToNext: (nextScreenId?: string) => void;
    goToPrev: () => void;
    updateData: (key: keyof WizardData, value: any) => void;
    setAnswer: (questionId: string, value: any) => void;
}
