import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Evaluations } from './pages/Evaluations';
import { EvaluationForm } from './pages/EvaluationForm';
import { Team } from './pages/Team';

import { SetupWizard } from './pages/SetupWizard/SetupWizard';

const Settings = () => <div style={{ padding: '20px' }}><h1>Settings</h1></div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/evaluations/:id" element={<EvaluationForm />} />
          <Route path="/team" element={<Team />} />
          <Route path="/setup" element={<SetupWizard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
