import './sass/application.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameInitialize from './components/GameInitialize';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<GameInitialize />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
