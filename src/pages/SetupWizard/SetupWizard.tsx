import React from 'react';
import { WizardProvider, useWizard } from './WizardContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StatusSelectScreen } from './components/StatusSelectScreen';
import { AIDetectionScreen } from './components/AIDetectionScreen';
import { AIPathDecisionScreen } from './components/AIPathDecisionScreen';
import { AIRebuildScreen } from './components/AIRebuildScreen';
import { AISufficiencyCheckScreen } from './components/AISufficiencyCheckScreen';
import { AIGenerateScreen } from './components/AIGenerateScreen';
import { AINewProposalScreen } from './components/AINewProposalScreen';
import { CycleConfirmScreen } from './components/CycleConfirmScreen';
import { ArtifactsComposeScreen } from './components/ArtifactsComposeScreen';
import { CreateEventsScreen } from './components/CreateEventsScreen';
import { FinalApprovalScreen } from './components/FinalApprovalScreen';

import { MethodSelectScreen } from './components/MethodSelectScreen';
import { TemplateSelectScreen } from './components/TemplateSelectScreen';
import { DraftReviewScreen } from './components/DraftReviewScreen';
import { DataSourceUploadScreen } from './components/DataSourceUploadScreen'; // Import

const WizardContent: React.FC = () => {
    const { state } = useWizard();

    const renderScreen = () => {
        switch (state.currentScreenId) {
            case 'scr_start': return <WelcomeScreen />;
            case 'scr_status_select': return <StatusSelectScreen />;

            // Existing Path
            case 'scr_ai_detection': return <AIDetectionScreen />;
            case 'scr_ai_path_decision': return <AIPathDecisionScreen />;
            case 'scr_ai_rebuild_from_existing': return <AIRebuildScreen />;
            case 'scr_ai_sufficiency_check': return <AISufficiencyCheckScreen />;
            case 'scr_ai_generate_from_past_sheets': return <AIGenerateScreen source="past_sheets" />;
            case 'scr_ai_generate_from_existing_policy': return <AIGenerateScreen source="policy" />;

            // New Path Enhancements
            case 'scr_method_select': return <MethodSelectScreen />;
            case 'scr_template_select': return <TemplateSelectScreen />;
            case 'scr_draft_review': return <DraftReviewScreen />;
            case 'scr_data_source_upload': return <DataSourceUploadScreen />; // New screen mapping

            case 'scr_new_template_create': return <AINewProposalScreen />; // Maps to propose_new flow
            case 'scr_ai_propose_new': return <AINewProposalScreen />;

            case 'scr_ai_cycle_confirm': return <CycleConfirmScreen />;
            case 'scr_ai_compose_artifacts': return <ArtifactsComposeScreen />;
            case 'scr_ai_create_events': return <CreateEventsScreen />;
            case 'scr_final_approval': return <FinalApprovalScreen />;
            case 'scr_end': return <div style={{ textAlign: 'center', padding: 40 }}><h2>セットアップ完了</h2></div>; // Or redirect
            default:
                return (
                    <div style={{ padding: 40, textAlign: 'center' }}>
                        <h2>画面が実装されていません: {state.currentScreenId}</h2>
                    </div>
                );
        }
    };

    return (
        <div className="setup-wizard-container" style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg-app)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '700px',
                backgroundColor: '#fff',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden',
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {renderScreen()}
            </div>
        </div>
    );
};

export const SetupWizard: React.FC = () => {
    return (
        <WizardProvider>
            <WizardContent />
        </WizardProvider>
    );
};
