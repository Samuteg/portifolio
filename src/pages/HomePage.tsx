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
      <section className="page-section">
        <div className="frame border-b border-line flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 sm:px-6 py-2.5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute">
              ~/home
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-wash px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-soft">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-success" />
              Disponível para projetos
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 lg:gap-14 px-4 sm:px-6 py-12 lg:py-16">
            <Reveal>
              <p className="font-mono text-xs text-accent-text tracking-wide mb-6">
                ~/full-stack — react · java · go · automação
              </p>

              <h1 className="font-display text-[clamp(3rem,7vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink mb-6">
                Olá, eu sou{" "}
                <span className="italic block">Samuel</span>
              </h1>

              <p className="text-ink-soft text-[0.95rem] leading-relaxed max-w-lg mb-8">
                Desenvolvedor focado em construir soluções eficientes e funcionais,
                com experiência em Java, React e Go. Forte interesse em sistemas,
                automação e projetos que combinam lógica, design e uma experiência
                de usuário sólida.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-9">
                <button
                  type="button"
                  ref={hireButtonRef}
                  onClick={handleHireClick}
                  className="btn-primary"
                >
                  Me contrate
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <a
                  href="https://github.com/Samuteg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-quiet"
                >
                  <Github size={16} aria-hidden="true" />
                  Ver GitHub
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-ink-mute border border-line hover:text-ink hover:border-line-strong hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal variant="scale" className="max-w-md w-full justify-self-center lg:justify-self-end">
              <figure className="border border-line rounded-xl overflow-hidden bg-card">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={profile}
                    alt="Samuel — Desenvolvedor Full-Stack"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="flex items-center justify-between border-t border-line px-4 py-2.5">
                  <span className="meta">$ exp — 2+ anos</span>
                  <span className="meta text-accent-text">@samuteg10</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-line">
            {[
              { label: "Base", value: "Brasil" },
              { label: "Experiência", value: "2+ anos" },
              { label: "Foco", value: "Full-stack" },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-baseline justify-between gap-4 px-4 sm:px-6 py-3.5 ${
                  i > 0 ? "border-t sm:border-t-0 sm:border-l border-line" : ""
                } ${i === 1 ? "sm:border-x border-line" : ""}`}
              >
                <span className="meta">{label}</span>
                <span className="text-[0.8rem] font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>
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
            className="relative w-full max-w-lg p-8 rounded-xl bg-card border border-line-strong animate-scale-in"
          >
            <button
              type="button"
              ref={closeButtonRef}
              aria-label="Fechar"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-ink-mute hover:text-ink rounded-lg transition-colors"
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
                <Send size={16} aria-hidden="true" />
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
