import { useState, useEffect, useRef } from "react";
import { ArrowRight, Github, X, Send } from "lucide-react";
import { LinkedinIcon, XIcon, InstagramIcon } from "../icons/SocialIcons";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import profile from "../assets/profile.webp";

const socials = [
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/samu-teg-b9002b385/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Samuteg", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/Samuteg10", label: "X/Twitter" },
  { icon: InstagramIcon, href: "https://www.instagram.com/samuteg10/", label: "Instagram" },
];

const WHATSAPP_NUMBER = "551158491828";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const hireButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;
    closeButtonRef.current?.focus();
    const trigger = hireButtonRef.current;
    const dialog = dialogRef.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isModalOpen]);

  const handleHireClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, Samuel! Meu nome é ${formData.name} (${formData.email}).\n\nMensagem: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, "_blank");
    setIsModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <PageTransition>
      <section className="page-section flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <Reveal>
              <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line text-sm text-ink-soft mb-6">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-success" />
                Disponível para projetos
              </p>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5 text-ink">
                Olá, eu sou Samuel
              </h1>

              <p className="font-mono text-sm text-accent-text mb-6">
                ~/full-stack — react · java · go · automação
              </p>

              <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                Desenvolvedor focado em construir soluções eficientes e funcionais,
                com experiência em Java, React e Go. Forte interesse em sistemas,
                automação e projetos que combinam lógica, design e uma experiência
                de usuário sólida.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-10">
                <button
                  type="button"
                  ref={hireButtonRef}
                  onClick={handleHireClick}
                  className="btn-primary w-full sm:w-auto"
                >
                  Me contrate
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <a
                  href="https://github.com/Samuteg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-quiet w-full sm:w-auto"
                >
                  <Github size={18} aria-hidden="true" />
                  Ver GitHub
                </a>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-ink-mute border border-transparent hover:text-ink hover:border-line transition-colors duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" className="flex-shrink-0">
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1 bg-card2 border border-line-strong">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={profile}
                    alt="Samuel — Desenvolvedor Full-Stack"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="meta absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-card2 border border-line whitespace-nowrap">
                $ exp — 2+ anos
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Solicitar orçamento"
            aria-describedby="hire-modal-hint"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg p-8 rounded-[20px] bg-card2 border border-line-strong animate-scale-in"
          >
            <button
              type="button"
              ref={closeButtonRef}
              aria-label="Fechar"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-ink-mute hover:text-ink rounded-xl transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="section-title mb-2">
              Solicitar Orçamento
            </h2>
            <p id="hire-modal-hint" className="text-ink-soft text-sm mb-6">
              Preencha os campos abaixo para iniciar uma conversa diretamente no WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="hire-name" className="block text-[0.8125rem] font-medium text-ink-soft mb-1.5">
                  Seu nome
                </label>
                <input
                  id="hire-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Maria Silva"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="hire-email" className="block text-[0.8125rem] font-medium text-ink-soft mb-1.5">
                  Seu e-mail
                </label>
                <input
                  id="hire-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex: maria@email.com"
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="hire-message" className="block text-[0.8125rem] font-medium text-ink-soft mb-1.5">
                  Mensagem ou detalhes do projeto
                </label>
                <textarea
                  id="hire-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Descreva brevemente o que você precisa..."
                  className="field resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send size={18} aria-hidden="true" />
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default HomePage;
