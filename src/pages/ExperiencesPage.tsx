import {
  Calendar,
  MapPin,
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

const SubHeader = ({ title }: { title: string }) => (
  <div className="border-b border-line px-4 sm:px-6 py-3">
    <h3 className="section-title">{title}</h3>
  </div>
);

const CertCard = ({ pdf, image, alt, title, tech, org }: {
  pdf: string;
  image: string;
  alt: string;
  title: string;
  tech: string;
  org: string;
}) => (
  <div className="flex gap-4 p-4 sm:p-5">
    <img
      src={image}
      alt={alt}
      loading="lazy"
      className="w-20 h-24 object-cover rounded-md border border-line shrink-0 bg-card2"
    />
    <div className="flex flex-col min-w-0">
      <p className="eyebrow mb-1.5">certificação</p>
      <h4 className="card-title mb-2.5">{title}</h4>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="tag">{tech}</span>
        <span className="tag">{org}</span>
      </div>
      <a
        href={pdf}
        target="_blank"
        rel="noreferrer"
        className="group mt-auto inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute hover:text-accent-text transition-colors"
      >
        Ver certificado
        <ArrowUpRight
          size={12}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  </div>
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
  const oddCount = certificates.length % 2 === 1;
  const lastIndex = certificates.length - 1;

  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-b border-line">
          <SectionHeader
            eyebrow="minha trajetória"
            title="Experiência"
            description="Minha jornada profissional e acadêmica no desenvolvimento de software."
          />

          <SubHeader title="Experiência Profissional" />

          <Reveal variant="fade" className="px-4 sm:px-6 py-8">
            <div className="relative ml-1 border-l border-dashed border-line-strong pl-7">
              {experiences.map((exp) => (
                <div key={exp.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -translate-x-1/2 top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-canvas"
                  />

                  {exp.current && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-wash px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-soft mb-3">
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-success" />
                      atual
                    </span>
                  )}

                  <h4 className="section-title mb-1">{exp.title}</h4>
                  <p className="text-accent-text font-medium text-sm mb-2.5">
                    {exp.company}
                  </p>

                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={11} aria-hidden="true" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={11} aria-hidden="true" />
                      {exp.location}
                    </span>
                  </p>

                  <p className="text-ink-soft text-sm leading-relaxed mb-4 max-w-2xl">
                    {exp.description}
                  </p>

                  {exp.highlights && (
                    <ul className="space-y-1.5 max-w-2xl">
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
              ))}
            </div>
          </Reveal>

          <SubHeader title="Formação" />

          <Reveal className="px-4 sm:px-6 py-7">
            {education.map((edu) => (
              <div key={edu.title}>
                <h4 className="section-title mb-1">{edu.title}</h4>
                <p className="text-accent-text font-medium text-sm mb-2.5">
                  {edu.institution}
                </p>
                <p className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute mb-4">
                  <Calendar size={11} aria-hidden="true" />
                  {edu.period}
                </p>
                <p className="text-ink-soft text-sm leading-relaxed max-w-2xl">
                  {edu.description}
                </p>
              </div>
            ))}
          </Reveal>

          <SubHeader title="Certificados" />

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
            {certificates.map((cert, i) => (
              <div
                key={cert.title}
                className={`border-line ${
                  i % 2 === 0 && !(oddCount && i === lastIndex) ? "md:border-r" : ""
                } ${i !== 0 ? "border-t md:border-t-0" : ""} ${i >= 2 ? "md:border-t" : ""}`}
              >
                <Reveal delay={Math.min(i, 3)} className="h-full">
                  <CertCard {...cert} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ExperiencesPage;
