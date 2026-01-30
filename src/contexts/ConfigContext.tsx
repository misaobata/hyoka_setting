import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our configuration
export interface AppConfig {
    systemName: string;
    items: any[];
    cycle: {
        frequency: string;
        bonus: string;
        events: string;
    };
    isActive: boolean;
}

const defaultConfig: AppConfig = {
    systemName: '未設定の評価制度',
    items: [],
    cycle: {
        frequency: '-',
        bonus: '-',
        events: '-'
    },
    isActive: false
};

interface ConfigContextType {
    config: AppConfig;
    updateConfig: (newConfig: Partial<AppConfig>) => void;
    activateSystem: (data: any) => void; // Call this when wizard completes
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // In a real app, load from local storage or API
    const [config, setConfig] = useState<AppConfig>(() => {
        const saved = localStorage.getItem('hyoka_config');
        return saved ? JSON.parse(saved) : defaultConfig;
    });

    useEffect(() => {
        localStorage.setItem('hyoka_config', JSON.stringify(config));
    }, [config]);

    const updateConfig = (newConfig: Partial<AppConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    const activateSystem = (wizardData: any) => {
        const newConfig: AppConfig = {
            systemName: wizardData.templateDraft?.name || 'カスタム評価制度',
            items: wizardData.generatedItems || [],
            cycle: wizardData.cycleDraft || defaultConfig.cycle,
            isActive: true
        };
        setConfig(newConfig);
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig, activateSystem }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
