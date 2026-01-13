import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ExperiencesPage from "./pages/ExperiencesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className='relative z-50 pt-20'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
}
