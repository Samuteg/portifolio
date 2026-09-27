import { useState, useEffect } from "react";
import {
  House,
  Toolbox,
  NotebookTabs,
  Folders,
  BriefcaseBusiness,
  Contact,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { id: "home", label: "Home", icon: House },
  { id: "services", label: "Serviços", icon: Toolbox },
  { id: "skills", label: "Skills", icon: NotebookTabs },
  { id: "projects", label: "Projetos", icon: Folders },
  { id: "experiences", label: "Experiência", icon: BriefcaseBusiness },
  { id: "contact", label: "Contato", icon: Contact },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 120;
      let current = navLinks[0].id;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollPos) current = link.id;
      }
      setActiveSection(current);
    };
    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const isActive = (id: string) => activeSection === id;

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    document.getElementById(id)?.focus({ preventScroll: true });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a
            href="#home"
            onClick={() => handleNavClick("home")}
            className="group flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow duration-300">
              S
            </div>
            <span className="text-xl font-display font-bold text-white group-hover:text-accent-400 transition-colors duration-300">
              Samuel
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => handleNavClick(id)}
                aria-current={isActive(id) ? "true" : undefined}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(id)
                    ? "text-accent-400 bg-accent/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {isActive(id) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full" />
                )}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 p-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="glass-strong border-t border-white/5 p-4 flex flex-col gap-1">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => handleNavClick(id)}
              aria-current={isActive(id) ? "true" : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive(id)
                  ? "text-accent-400 bg-accent/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
