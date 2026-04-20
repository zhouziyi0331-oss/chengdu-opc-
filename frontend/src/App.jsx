import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Competitions from './pages/Competitions';
import PastActivities from './pages/PastActivities';
import Works from './pages/Works';
import Resources from './pages/Resources';
import Projects from './pages/Projects';
import Members from './pages/Members';
import Teams from './pages/Teams';
import Events from './pages/Events';
import News from './pages/News';
import Admin from './pages/Admin/Admin';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/past-activities" element={<PastActivities />} />
                <Route path="/resources" element={<Resources />} />
                <Route
                  path="/works"
                  element={
                    <ProtectedRoute>
                      <Works />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute>
                      <Members />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teams"
                  element={
                    <ProtectedRoute>
                      <Teams />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <ProtectedRoute>
                      <Events />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/news"
                  element={
                    <ProtectedRoute>
                      <News />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
