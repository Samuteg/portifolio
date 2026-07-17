import { motion as Motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import CertificadoJava from "../assets/CertificadoJavaIntermediario.jpeg";

import CertificadoJavaFundamentos from "../assets/Certificado_Fundamentos_de_Java.pdf";
import CertificadoSpringFundamentos from "../assets/Certificado_Fundamentos_do_Spring_Boot.pdf";
import CertificadoSpring from "../assets/Certificado_Minicurso_de_JavaSpring.pdf";
import CertificadoClaude from "../assets/claude101.pdf";
import CertificadoBdIA from "../assets/certificadoFundIAMicrosoft.pdf";
import CertificadoNode from "../assets/NodejsCurso.pdf";

import CertificadoJavaFundamentosFoto from "../assets/CertificadoFundamentosFoto.png";
import CertificadoSpringFundamentosFoto from "../assets/fundamentoSpringFoto.png";
import CertificadoSpringFoto from "../assets/cursoSpringFoto.png";
import CertificadoClaudeFoto from "../assets/claude101ft.png";
import CertificadoBdIAft from "../assets/CertificadoBradescoIAft.png";
import CertificadoNodeft from "../assets/NodeJsFt.png";

const experiences = [
  {
    title: "Desenvolvedor Freelancer",
    company: "Autônomo",
    period: "2023 — Presente",
    location: "Remoto",
    description:
      "Criação de sistemas web, landing pages e automações personalizadas para clientes diversos. Trabalho com React, Node.js, Java e Go para entregar soluções sob medida.",
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
    institution: "Autodidata",
    period: "2024 — Presente",
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
          <Motion.div
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
          </Motion.div>

          <div className="space-y-20">
            <div className="mb-20">
              <Motion.div
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
              </Motion.div>

              <Motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

                {experiences.map((exp, i) => (
                  <Motion.div
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
                  </Motion.div>
                ))}
              </Motion.div>
            </div>

            <div>
              <Motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <BookOpen />
                </div>
                <h2 className="text-xl font-display font-bold text-white">
                  Formação
                </h2>
              </Motion.div>

              {education.map((edu, i) => (
                <Motion.div
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
                </Motion.div>
              ))}
            </div>

            <div>
              <Motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <BookOpen />
                </div>
                <h2 className="text-xl font-display font-bold text-white">
                  Certificados
                </h2>
              </Motion.div>

              <div className="rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400">
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <a
                    href={CertificadoJavaFundamentos}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
                  >
                    <img
                      src={CertificadoJavaFundamentosFoto}
                      alt="Certificado Java Fundamentos"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                        Certificação
                      </p>
                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        Java Fundamentos
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Certificado de conclusão de curso de Java fundamentos
                        com foco em orientação a objetos, coleções, tratamento
                        de exceções e desenvolvimento de aplicações.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
                        Java
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
                        Rocketseat
                      </span>
                    </div>
                    <a
                      href={CertificadoJavaFundamentos}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                    >
                      Ver certificado
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400">
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <a
                    href={CertificadoJava}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
                  >
                    <img
                      src={CertificadoJava}
                      alt="Certificado Java Intermediário"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                        Certificação
                      </p>
                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        Java Intermediário
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Certificado de conclusão de curso de Java intermediário
                        com foco em orientação a objetos, coleções, tratamento
                        de exceções e desenvolvimento de aplicações.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
                        Java
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
                        Sololearning
                      </span>
                    </div>
                    <a
                      href={CertificadoJava}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                    >
                      Ver certificado
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400">
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <a
                    href={CertificadoSpringFundamentos}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
                  >
                    <img
                      src={CertificadoSpringFundamentosFoto}
                      alt="Certificado Spring Fundamentos"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                        Certificação
                      </p>
                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        Spring Boot Fundamentos
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Certificado de conclusão de curso de Spring Boot
                        Fundamentos com foco em orientação a objetos, coleções,
                        tratamento de exceções e desenvolvimento de aplicações.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
                        Spring Boot
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
                        Rocketseat
                      </span>
                    </div>
                    <a
                      href={CertificadoSpringFundamentos}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                    >
                      Ver certificado
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400">
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <a
                    href={CertificadoSpring}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
                  >
                    <img
                      src={CertificadoSpringFoto}
                      alt="Certificado Spring"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                        Certificação
                      </p>
                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        Spring Boot
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Certificado de conclusão de curso de Spring Boot
                        Fundamentos com foco em orientação a objetos, coleções,
                        tratamento de exceções e desenvolvimento de aplicações.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
                        Spring Boot
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
                        Rocketseat
                      </span>
                    </div>
                    <a
                      href={CertificadoSpring}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                    >
                      Ver certificado
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400">
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <a
                    href={CertificadoClaude}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
                  >
                    <img
                      src={CertificadoClaudeFoto}
                      alt="Certificado Spring"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                        Certificação
                      </p>
                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        Claude 101
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Certificado de conclusão de curso de Claude
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
                        IA
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
                        Claude 101
                      </span>
                    </div>
                    <a
                      href={CertificadoClaude}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                    >
                      Ver certificado
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400">
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <a
                    href={CertificadoBdIA}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
                  >
                    <img
                      src={CertificadoBdIAft}
                      alt="Certificado Spring"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                        Certificação
                      </p>
                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        Microsoft
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Certificado de conclusão de curso de IA Microsoft Azure
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
                        IA
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
                        Microsoft
                      </span>
                    </div>
                    <a
                      href={CertificadoBdIA}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                    >
                      Ver certificado
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400">
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <a
                    href={CertificadoNode}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
                  >
                    <img
                      src={CertificadoNodeft}
                      alt="Certificado Node Js"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex flex-col justify-center gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                        Certificação
                      </p>
                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        Node Js
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Certificado de conclusão de curso de Node Js
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
                        Node Js
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
                        Instituto Federal
                      </span>
                    </div>
                    <a
                      href={CertificadoNode}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
                    >
                      Ver certificado
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ExperiencesPage;
