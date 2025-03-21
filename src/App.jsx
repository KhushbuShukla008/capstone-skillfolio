import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavHeader from './components/NavHeader/NavHeader';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import CreatePortfolio from './pages/CreatePortfolio/CreatePortfolio';
import ViewPortfolio from './pages/ViewPortfolio/ViewPortfolio';
import Resume from './pages/Resume/Resume';
// import GitHubIntegration from './pages/GitHubIntegration';
// import Settings from './pages/Settings';
// import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import Footer from './components/Shared/Footer';
// import Settings from './pages/Settings';
import "./App.scss";
function App() {
  return (
    <Router>
      <NavHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<ProtectedRoute><Register/></ProtectedRoute>} /> */}
        {/* <Route path="/portfolio" element={<ProtectedRoute><Portfolio/></ProtectedRoute>} /> */}
        {/* <Route path="/createportfolio" element={<ProtectedRoute><CreatePortfolio/></ProtectedRoute>} /> */}
        {/* <Route path="/viewportfolio" element={<ProtectedRoute><ViewPortfolio/></ProtectedRoute>} /> */}
        {/* <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} /> */}
        {/* <Route path="/github" element={<ProtectedRoute><GitHubIntegration /></ProtectedRoute>} /> */}
        {/* <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/register" element={<Register />} />
        
        <Route path="/createportfolio" element={<CreatePortfolio />} />
        <Route path="/viewportfolio" element={<ViewPortfolio />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;