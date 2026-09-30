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
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="o que eu faço"
            title="Serviços"
            description="Soluções completas para transformar suas ideias em produtos digitais de alta qualidade."
          />

          <ul className="border-t border-line">
            {services.map((service, i) => (
              <li key={service.title} className="border-b border-line">
                <Reveal
                  delay={i}
                  className="grid gap-3 py-7 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10"
                >
                  <div className="flex items-center gap-3">
                    <service.icon size={20} className="text-accent-text" aria-hidden="true" />
                    <h3 className="card-title">{service.title}</h3>
                  </div>
                  <div>
                    <p className="text-ink-soft text-[0.95rem] leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-12">
            <div className="surface-card p-8 max-w-2xl mx-auto text-center">
              <h3 className="card-title mb-2">Tem um projeto em mente?</h3>
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
