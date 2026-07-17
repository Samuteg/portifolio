import { Code, Palette, Settings, Smartphone } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useInView } from "../hooks/useInView";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description:
      "Criação de sites modernos, responsivos e totalmente otimizados com as melhores tecnologias do mercado. React, Next.js, Tailwind e muito mais.",
    tags: ["React", "Next.js", "Node.js", "APIs"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    description:
      "Interfaces belas, intuitivas e centradas no usuário. Foco em experiência, acessibilidade e design moderno que encanta.",
    tags: ["Figma", "Prototipação", "Design System"],
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: Settings,
    title: "Automação & Scripts",
    description:
      "Ferramentas personalizadas para automatizar processos. Bots, scrapers, CLI tools e integrações que economizam tempo.",
    tags: ["Python", "Go", "CLI", "APIs"],
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-500/30",
  },
  {
    icon: Smartphone,
    title: "Apps & Mobile",
    description:
      "Desenvolvimento de aplicações multiplataforma para Android e iOS com interfaces elegantes e performance nativa.",
    tags: ["React Native", "PWA", "Mobile-first"],
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    borderColor: "hover:border-green-500/30",
  },
];

const ServicesPage = () => {
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  return (
    <PageTransition>
      <section className="page-section relative">
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div
            ref={headerRef}
            className={`mb-16 transition-all duration-700 ${
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              O que eu faço
            </span>
            <h1 className="page-title gradient-text mb-4">Serviços</h1>
            <p className="page-subtitle">
              Soluções completas para transformar suas ideias em produtos
              digitais de alta qualidade.
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((service, i) => (
              <div
                key={i}
                className={`group relative rounded-3xl p-8 bg-surface-100/50 border border-white/5 ${service.borderColor} transition-all duration-500 overflow-hidden hover:-translate-y-1.5 hover:scale-[1.01] ${
                  gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.6s",
                  transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center ${service.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon size={26} />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={ctaRef}
            className={`mt-16 text-center transition-all duration-700 delay-700 ${
              ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border border-accent/10">
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Tem um projeto em mente?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Vamos conversar sobre como posso ajudar a transformar sua ideia
                em realidade.
              </p>
              <a
                href="https://www.99freelas.com.br/user/Samuteg10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-2xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
