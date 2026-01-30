import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Evaluations } from './pages/Evaluations';
import { EvaluationForm } from './pages/EvaluationForm';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';
import { SetupWizard } from './pages/SetupWizard/SetupWizard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/evaluations" element={<Layout><Evaluations /></Layout>} />
        <Route path="/evaluations/:id" element={<Layout><EvaluationForm /></Layout>} />
        <Route path="/team" element={<Layout><Team /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/setup" element={<SetupWizard />} />
      </Routes>
    </Router>
  );
}

export default App;
