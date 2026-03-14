import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";

const experiences = [
  {
    title: "Desenvolvedor Freelancer",
    company: "Autônomo",
    period: "2023 — Presente",
    location: "Remoto",
    description:
      "Criação de sistemas web, landing pages e automações personalizadas para clientes diversos. Trabalho com React, Node.js, Python e Go para entregar soluções sob medida.",
    highlights: [
      "Desenvolvimento de landing pages responsivas e otimizadas",
      "Sistemas de gestão com dashboards interativos",
      "Automações e scripts para processos empresariais",
      "Integração com APIs de terceiros",
    ],
    current: true,
  },
];

const education = [
  {
    title: "Aprendizado Contínuo",
    institution: "Autodidato",
    period: "2022 — Presente",
    description:
      "Estudo constante de novas tecnologias, frameworks e padrões de desenvolvimento. Cursos, documentações oficiais e projetos práticos como metodologia.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ExperiencesPage = () => {
  return (
    <PageTransition>
      <section className="page-section relative">
        {/* Background */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[180px]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              Minha trajetória
            </span>
            <h1 className="page-title gradient-text mb-4">Experiência</h1>
            <p className="page-subtitle">
              Minha jornada profissional e acadêmica no desenvolvimento de
              software.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Briefcase size={20} />
              </div>
              <h2 className="text-xl font-display font-bold text-white">
                Experiência Profissional
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative pl-14 mb-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-3 top-6 w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/30 ring-4 ring-surface">
                    {exp.current && (
                      <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                    )}
                  </div>

                  <div className="group rounded-2xl p-6 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500">
                    {/* Current badge */}
                    {exp.current && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold mb-4">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        Atual
                      </span>
                    )}

                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-accent font-medium text-sm mb-3">
                      {exp.company}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    {exp.highlights && (
                      <ul className="space-y-2">
                        {exp.highlights.map((h, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-gray-400"
                          >
                            <ArrowUpRight
                              size={14}
                              className="text-accent mt-0.5 flex-shrink-0"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                📚
              </div>
              <h2 className="text-xl font-display font-bold text-white">
                Formação
              </h2>
            </motion.div>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-6 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500"
              >
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  {edu.title}
                </h3>
                <p className="text-accent font-medium text-sm mb-2">
                  {edu.institution}
                </p>
                <span className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <Calendar size={12} />
                  {edu.period}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ExperiencesPage;