import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ExperiencesPage = lazy(() => import("./pages/ExperiencesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const PageLoader = () => (
  <div className="page-section flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden noise-overlay">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <Navbar />

      <main className="relative z-10 pt-20">
        <Suspense fallback={<PageLoader />}>
          <div id="home" className="scroll-mt-20">
            <HomePage />
          </div>
          <div id="services" className="scroll-mt-20">
            <ServicesPage />
          </div>
          <div id="skills" className="scroll-mt-20">
            <SkillsPage />
          </div>
          <div id="projects" className="scroll-mt-20">
            <ProjectsPage />
          </div>
          <div id="experiences" className="scroll-mt-20">
            <ExperiencesPage />
          </div>
          <div id="contact" className="scroll-mt-20">
            <ContactPage />
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
