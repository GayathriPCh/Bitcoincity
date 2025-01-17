import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BitcoinVisualization from './components/BitcoinVisualization';
import LightningVisualization from './components/LightningVisualization';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BitcoinVisualization />} />
        <Route path="/lightning" element={<LightningVisualization />} />
      </Routes>
    </Router>
  );
}

export default App;
