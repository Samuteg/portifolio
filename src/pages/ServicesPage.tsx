import { Code, Palette, Settings, Smartphone } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description:
      "Criação de sites modernos, responsivos e totalmente otimizados com as melhores tecnologias do mercado. React, Next.js, Tailwind e muito mais.",
    tags: ["React", "Next.js", "Node.js", "APIs"],
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    description:
      "Interfaces belas, intuitivas e centradas no usuário. Foco em experiência, acessibilidade e design moderno que encanta.",
    tags: ["Figma", "Prototipação", "Design System"],
  },
  {
    icon: Settings,
    title: "Automação & Scripts",
    description:
      "Ferramentas personalizadas para automatizar processos. Bots, scrapers, CLI tools e integrações que economizam tempo.",
    tags: ["Python", "Go", "CLI", "APIs"],
  },
  {
    icon: Smartphone,
    title: "Apps & Mobile",
    description:
      "Desenvolvimento de aplicações multiplataforma para Android e iOS com interfaces elegantes e performance nativa.",
    tags: ["React Native", "PWA", "Mobile-first"],
  },
];

const ServicesPage = () => {
  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-b border-line">
          <SectionHeader
            eyebrow="o que eu faço"
            title="Serviços"
            description="Soluções completas para transformar suas ideias em produtos digitais de alta qualidade."
          />

          <ul className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
            {services.map((service, i) => (
              <li
                key={service.title}
                className={[
                  "px-4 sm:px-6 py-7",
                  i !== 0 && "border-t md:border-t-0",
                  i >= 2 && "md:border-t",
                  i % 2 === 0 && "md:border-r",
                  "border-line",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Reveal delay={i}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-md border border-line bg-card2 flex items-center justify-center text-accent-text shrink-0">
                      <service.icon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="card-title">{service.title}</h3>
                  </div>
                  <p className="text-ink-soft text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="px-4 sm:px-6 py-10">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="section-title mb-2">Tem um projeto em mente?</h3>
              <p className="text-ink-soft text-sm mb-6">
                Vamos conversar sobre como posso ajudar a transformar sua ideia
                em realidade.
              </p>
              <a
                href="https://www.99freelas.com.br/user/Samuteg10"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Solicitar orçamento
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
