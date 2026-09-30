import {
  Briefcase,
  Calendar,
  MapPin,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
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

const TimelineItem = ({ children, index = 0 }: { children: React.ReactNode; index?: number }) => (
  <Reveal variant="left" delay={index} className="relative pl-14 mb-8">
    {children}
  </Reveal>
);

const CertCard = ({ pdf, image, alt, title, tech, org, index }: {
  pdf: string;
  image: string;
  alt: string;
  title: string;
  tech: string;
  org: string;
  index: number;
}) => (
  <Reveal delay={index}>
    <div className="surface-card p-6">
      <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="overflow-hidden rounded-2xl border border-line bg-card2">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="eyebrow mb-2">certificação</p>
            <h4 className="card-title">
              {title}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="tag">{tech}</span>
            <span className="tag">{org}</span>
          </div>
          <a
            href={pdf}
            target="_blank"
            rel="noreferrer"
            className="btn-quiet self-start"
          >
            Ver certificado
          </a>
        </div>
      </div>
    </div>
  </Reveal>
);

const certificates = [
  {
    pdf: CertificadoJavaFundamentos,
    image: CertificadoJavaFundamentosFoto,
    alt: "Certificado Java Fundamentos",
    title: "Java Fundamentos",
    tech: "Java",
    org: "Rocketseat",
  },
  {
    pdf: CertificadoJava,
    image: CertificadoJava,
    alt: "Certificado Java Intermediário",
    title: "Java Intermediário",
    tech: "Java",
    org: "Sololearning",
  },
  {
    pdf: CertificadoSpringFundamentos,
    image: CertificadoSpringFundamentosFoto,
    alt: "Certificado Spring Fundamentos",
    title: "Spring Boot Fundamentos",
    tech: "Spring Boot",
    org: "Rocketseat",
  },
  {
    pdf: CertificadoSpring,
    image: CertificadoSpringFoto,
    alt: "Certificado Spring",
    title: "Spring Boot",
    tech: "Spring Boot",
    org: "Rocketseat",
  },
  {
    pdf: CertificadoClaude,
    image: CertificadoClaudeFoto,
    alt: "Certificado Claude 101",
    title: "Claude 101",
    tech: "IA",
    org: "Anthropic",
  },
  {
    pdf: CertificadoBdIA,
    image: CertificadoBdIAft,
    alt: "Certificado Microsoft",
    title: "Microsoft",
    tech: "IA",
    org: "Microsoft",
  },
  {
    pdf: CertificadoNode,
    image: CertificadoNodeft,
    alt: "Certificado Node JS",
    title: "Node Js",
    tech: "Node JS",
    org: "Instituto Federal",
  },
];

const ExperiencesPage = () => {
  return (
    <PageTransition>
      <section className="page-section">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="minha trajetória"
            title="Experiência"
            description="Minha jornada profissional e acadêmica no desenvolvimento de software."
          />

          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
                  <Briefcase size={20} aria-hidden="true" />
                </div>
                <h3 className="section-title">
                  Experiência Profissional
                </h3>
              </div>

              <Reveal variant="fade" className="relative">
                <div aria-hidden="true" className="absolute left-5 top-0 bottom-0 w-px bg-line-strong" />

                {experiences.map((exp, i) => (
                  <TimelineItem key={exp.title} index={i}>
                    <span
                      aria-hidden="true"
                      className="absolute left-3 top-7 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-canvas"
                    />

                    <div className="surface-card p-6">
                      {exp.current && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line font-mono text-xs text-ink-soft mb-4">
                          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-success" />
                          atual
                        </span>
                      )}

                      <h4 className="card-title">
                        {exp.title}
                      </h4>
                      <p className="text-accent-text font-medium text-sm mb-3">
                        {exp.company}
                      </p>

                      <p className="flex flex-wrap items-center gap-4 font-mono text-xs text-ink-mute mb-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={12} aria-hidden="true" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} aria-hidden="true" />
                          {exp.location}
                        </span>
                      </p>

                      <p className="text-ink-soft text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {exp.highlights && (
                        <ul className="space-y-2">
                          {exp.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-sm text-ink-soft"
                            >
                              <ArrowUpRight
                                size={14}
                                aria-hidden="true"
                                className="text-accent-text mt-0.5 flex-shrink-0"
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TimelineItem>
                ))}
              </Reveal>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
                  <BookOpen aria-hidden="true" />
                </div>
                <h3 className="section-title">
                  Formação
                </h3>
              </div>

              {education.map((edu) => (
                <Reveal key={edu.title}>
                  <div className="surface-card p-6">
                    <h4 className="card-title">
                      {edu.title}
                    </h4>
                    <p className="text-accent-text font-medium text-sm mb-2">
                      {edu.institution}
                    </p>
                    <p className="flex items-center gap-1.5 font-mono text-xs text-ink-mute mb-4">
                      <Calendar size={12} aria-hidden="true" />
                      {edu.period}
                    </p>
                    <p className="text-ink-soft text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
                  <BookOpen aria-hidden="true" />
                </div>
                <h3 className="section-title">
                  Certificados
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {certificates.map((cert, i) => (
                  <CertCard key={cert.title} {...cert} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ExperiencesPage;
