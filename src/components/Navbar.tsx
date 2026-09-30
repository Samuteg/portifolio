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
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? "nav-glass" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <a
            href="#home"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 min-h-[44px]"
            aria-label="S Samuel ~/dev — início"
          >
            <span
              aria-hidden="true"
              className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-base"
            >
              S
            </span>{" "}
            <span className="text-lg font-display font-bold text-ink">
              Samuel
            </span>{" "}
            <span className="hidden sm:inline font-mono text-xs text-ink-mute">
              ~/dev
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => handleNavClick(id)}
                aria-current={isActive(id) ? "page" : undefined}
                className={`relative flex items-center min-h-[44px] px-4 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  isActive(id)
                    ? "text-ink bg-wash"
                    : "text-ink-mute hover:text-ink hover:bg-wash"
                }`}
              >
                {label}
                {isActive(id) && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                  />
                )}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl text-ink border border-line"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <nav id="mobile-nav" className="sheet-glass px-4 py-3 flex flex-col gap-1" aria-label="Navegação móvel">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => handleNavClick(id)}
              aria-current={isActive(id) ? "page" : undefined}
              className={`flex items-center gap-3 px-4 min-h-[44px] rounded-xl text-sm font-medium transition-colors duration-200 ${
                isActive(id)
                  ? "text-ink bg-wash"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
