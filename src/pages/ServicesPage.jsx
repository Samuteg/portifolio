import { motion } from "framer-motion";
import { Code, Palette, Settings, Smartphone } from "lucide-react";
import PageTransition from "../components/PageTransition";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ServicesPage = () => {
  return (
    <PageTransition>
      <section className="page-section relative">
        {/* Background orb */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              O que eu faço
            </span>
            <h1 className="page-title gradient-text mb-4">Serviços</h1>
            <p className="page-subtitle">
              Soluções completas para transformar suas ideias em produtos
              digitais de alta qualidade.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative rounded-3xl p-8 bg-surface-100/50 border border-white/5 ${service.borderColor} transition-all duration-500 overflow-hidden`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center ${service.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Tags */}
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
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-16 text-center"
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
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
