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

const sections = [
  { id: "home", label: "Início", Component: HomePage },
  { id: "services", label: "Serviços", Component: ServicesPage },
  { id: "skills", label: "Skills", Component: SkillsPage },
  { id: "projects", label: "Projetos", Component: ProjectsPage },
  { id: "experiences", label: "Experiência", Component: ExperiencesPage },
  { id: "contact", label: "Contato", Component: ContactPage },
];

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink relative overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-accent focus:text-white focus:text-sm focus:font-medium"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative z-10 pt-20 focus:outline-none">
        {sections.map(({ id, label, Component }) => (
          <section
            key={id}
            id={id}
            aria-label={label}
            tabIndex={-1}
            className="scroll-mt-20 focus:outline-none"
          >
            <Suspense fallback={<PageLoader />}>
              <Component />
            </Suspense>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
