import {
  Briefcase,
  Calendar,
  MapPin,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useInView } from "../hooks/useInView";
import CertificadoJava from "../assets/CertificadoJavaIntermediario.webp";

import CertificadoJavaFundamentos from "../assets/Certificado_Fundamentos_de_Java.pdf";
import CertificadoSpringFundamentos from "../assets/Certificado_Fundamentos_do_Spring_Boot.pdf";
import CertificadoSpring from "../assets/Certificado_Minicurso_de_JavaSpring.pdf";
import CertificadoClaude from "../assets/claude101.pdf";
import CertificadoBdIA from "../assets/certificadoFundIAMicrosoft.pdf";
import CertificadoNode from "../assets/NodejsCurso.pdf";

import CertificadoJavaFundamentosFoto from "../assets/CertificadoFundamentosFoto.webp";
import CertificadoSpringFundamentosFoto from "../assets/fundamentoSpringFoto.webp";
import CertificadoSpringFoto from "../assets/cursoSpringFoto.webp";
import CertificadoClaudeFoto from "../assets/claude101ft.webp";
import CertificadoBdIAft from "../assets/CertificadoBradescoIAft.webp";
import CertificadoNodeft from "../assets/NodeJsFt.webp";

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

const TimelineItem = ({ children, index = 0 }: { children: React.ReactNode; index?: number }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`relative pl-14 mb-8 transition-all duration-700 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{
        transitionDelay: `${index * 0.2}s`,
      }}
    >
      {children}
    </div>
  );
};

const CertCard = ({ pdf, image, alt, title, tech, org }: {
  pdf: string;
  image: string;
  alt: string;
  title: string;
  tech: string;
  org: string;
}) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`rounded-2xl p-6 bg-surface-100/50 border border-dashed border-white/15 text-gray-400 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid gap-6 md:grid-cols-2 items-center">
        <a
          href={pdf}
          target="_blank"
          rel="noreferrer"
          className="group block overflow-hidden rounded-2xl border border-dashed border-white/20 bg-surface/70 transition hover:border-accent/30"
        >
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </a>

        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">
              Certificação
            </p>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              {title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/20">
              {tech}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10">
              {org}
            </span>
          </div>
          <a
            href={pdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent/90"
          >
            Ver certificado
          </a>
        </div>
      </div>
    </div>
  );
};

const ExperiencesPage = () => {
  const { ref: expRef, inView: expInView } = useInView();
  const { ref: eduRef, inView: eduInView } = useInView();

  return (
    <PageTransition>
      <section className="page-section relative">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[180px]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-16 animate-fade-up">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              Minha trajetória
            </span>
            <h1 className="page-title gradient-text mb-4">Experiência</h1>
            <p className="page-subtitle">
              Minha jornada profissional e acadêmica no desenvolvimento de
              software.
            </p>
          </div>

          <div className="space-y-20">
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-xl font-display font-bold text-white">
                  Experiência Profissional
                </h2>
              </div>

              <div
                ref={expRef}
                className={`relative transition-all duration-700 ${
                  expInView ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

                {experiences.map((exp, i) => (
                  <TimelineItem key={i} index={i}>
                    <div className="absolute left-3 top-6 w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/30 ring-4 ring-surface">
                      {exp.current && (
                        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                      )}
                    </div>

                    <div className="group rounded-2xl p-6 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500">
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
                  </TimelineItem>
                ))}
              </div>
            </div>

            <div>
              <div
                ref={eduRef}
                className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
                  eduInView ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <BookOpen />
                </div>
                <h2 className="text-xl font-display font-bold text-white">
                  Formação
                </h2>
              </div>

              {education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: "0.2s" }}
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
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <BookOpen />
                </div>
                <h2 className="text-xl font-display font-bold text-white">
                  Certificados
                </h2>
              </div>

              <div className="space-y-6">
                <CertCard
                  pdf={CertificadoJavaFundamentos}
                  image={CertificadoJavaFundamentosFoto}
                  alt="Certificado Java Fundamentos"
                  title="Java Fundamentos"
                  tech="Java"
                  org="Rocketseat"
                />
                <CertCard
                  pdf={CertificadoJava}
                  image={CertificadoJava}
                  alt="Certificado Java Intermediário"
                  title="Java Intermediário"
                  tech="Java"
                  org="Sololearning"
                />
                <CertCard
                  pdf={CertificadoSpringFundamentos}
                  image={CertificadoSpringFundamentosFoto}
                  alt="Certificado Spring Fundamentos"
                  title="Spring Boot Fundamentos"
                  tech="Spring Boot"
                  org="Rocketseat"
                />
                <CertCard
                  pdf={CertificadoSpring}
                  image={CertificadoSpringFoto}
                  alt="Certificado Spring"
                  title="Spring Boot"
                  tech="Spring Boot"
                  org="Rocketseat"
                />
                <CertCard
                  pdf={CertificadoClaude}
                  image={CertificadoClaudeFoto}
                  alt="Certificado Claude 101"
                  title="Claude 101"
                  tech="IA"
                  org="Anthropic"
                />
                <CertCard
                  pdf={CertificadoBdIA}
                  image={CertificadoBdIAft}
                  alt="Certificado Microsoft"
                  title="Microsoft"
                  tech="IA"
                  org="Microsoft"
                />
                <CertCard
                  pdf={CertificadoNode}
                  image={CertificadoNodeft}
                  alt="Certificado Node JS"
                  title="Node Js"
                  tech="Node JS"
                  org="Instituto Federal"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ExperiencesPage;
