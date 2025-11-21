import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import WODStrategy from './pages/WODStrategy';
import Logbook from './pages/Logbook';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import Record from './pages/Record';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="record" element={<Record />} />
          <Route path="wod-strategy" element={<WODStrategy />} />
          <Route path="logbook" element={<Logbook />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
