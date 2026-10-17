import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Serviços" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projetos" },
  { id: "devlogs", label: "Dev Logs" },
  { id: "experiences", label: "Experiência" },
  { id: "contact", label: "Contato" },
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
      <div className="frame !border-x-0 px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center gap-4">
          <a
            href="#home"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 min-h-[44px]"
            aria-label="S Samuel ~/dev — início"
          >
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-accent-ink font-bold text-sm"
            >
              S
            </span>
            <span className="text-[0.95rem] font-semibold text-ink tracking-tight">
              Samuel
            </span>
            <span className="hidden sm:inline font-mono text-[0.65rem] text-ink-mute tracking-[0.08em] uppercase">
              ~/dev
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-5" aria-label="Navegação principal">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => handleNavClick(id)}
                aria-current={isActive(id) ? "page" : undefined}
                className={`relative font-mono text-[0.65rem] uppercase tracking-[0.08em] min-h-[44px] flex items-center transition-colors duration-200 ${
                  isActive(id)
                    ? "text-accent-text"
                    : "text-ink-mute hover:text-ink"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={() => handleNavClick("contact")}
            className="hidden md:inline-flex items-center gap-1.5 min-h-[36px] px-4 rounded-full border border-line-strong font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink hover:border-accent-text hover:text-accent-text transition-colors duration-200"
          >
            Contatar
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-md text-ink border border-line"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <nav id="mobile-nav" className="sheet-glass px-4 py-3 flex flex-col" aria-label="Navegação móvel">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => handleNavClick(id)}
              aria-current={isActive(id) ? "page" : undefined}
              className={`flex items-center justify-between min-h-[44px] font-mono text-[0.7rem] uppercase tracking-[0.08em] transition-colors duration-200 border-b border-line last:border-b-0 ${
                isActive(id)
                  ? "text-accent-text"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              <span>{label}</span>
              <span aria-hidden="true" className="text-ink-mute">
                {isActive(id) ? "//" : "#"}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
