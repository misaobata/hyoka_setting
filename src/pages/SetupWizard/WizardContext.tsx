import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type WizardState, type WizardContextType, type WizardData } from './types';

const INITIAL_STATE: WizardState = {
    currentScreenId: 'scr_start',
    data: {
        answers: {}
    },
    history: []
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<WizardState>(INITIAL_STATE);

    const goToNext = (nextScreenId?: string) => {
        if (!nextScreenId) return;

        setState(prev => ({
            ...prev,
            history: [...prev.history, prev.currentScreenId],
            currentScreenId: nextScreenId
        }));
    };

    const goToPrev = () => {
        setState(prev => {
            const newHistory = [...prev.history];
            const prevScreen = newHistory.pop();
            if (!prevScreen) return prev;

            return {
                ...prev,
                history: newHistory,
                currentScreenId: prevScreen
            };
        });
    };

    const updateData = (key: keyof WizardData, value: any) => {
        setState(prev => ({
            ...prev,
            data: {
                ...prev.data,
                [key]: value
            }
        }));
    };

    const setAnswer = (questionId: string, value: any) => {
        setState(prev => ({
            ...prev,
            data: {
                ...prev.data,
                answers: {
                    ...prev.data.answers,
                    [questionId]: value
                }
            }
        }));
    };

    return (
        <WizardContext.Provider value={{ state, goToNext, goToPrev, updateData, setAnswer }}>
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
};
