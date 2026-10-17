import { ExternalLink, Github, Star, Calendar } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import devbox_print from "../assets/debox_print.webp";
import taskprint from "../assets/taskprint.webp";
import blog_print from "../assets/blog_print.png";

const projects = [
  {
    title: "SamutegDev",
    description:
      "Blog pessoal e portfólio de projetos, com foco em performance, SEO e experiência do usuário. Desenvolvido com Astro.",
    image: blog_print,
    tags: ["Astro", "Css", "React", "KeyStatic"],
    date: "Jan 2026",
    liveUrl: "https://samuteg-dev.vercel.app/",
    codeUrl: "https://github.com/Samuteg/SamutegDev",
    featured: true,
  },
  {
    title: "TaskNest",
    description:
      "Sistema de gestão de tarefas e projetos com quadro Kanban nativo. Membros podem visualizar e mover tarefas entre estados — Pendente, Em Progresso e Concluído — de forma fluida e intuitiva.",
    image: taskprint,
    tags: ["Node.js", "Express", "MongoDB", "Next.js"],
    date: "Mar 2026",
    liveUrl: "https://task-nest-lac.vercel.app/",
    codeUrl: "https://github.com/Samuteg/TaskNest",
    featured: false,
  },
  {
    title: "DevBox CLI",
    description:
      'CLI de alta performance feita em Go para eliminar a fricção do dia-a-dia de desenvolvimento. Scaffolding de arquiteturas, git best practices e automação do "boring stuff".',
    image: devbox_print,
    tags: ["Go", "Cobra", "Viper", "Promptui", "Go-git"],
    date: "Jan 2026",
    codeUrl: "https://github.com/Samuteg/DevboxCLI",
    featured: false,
  },
];

const ProjectLinks = ({ liveUrl, codeUrl }: { liveUrl?: string; codeUrl?: string }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
    {liveUrl && (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-accent-text"
      >
        Ver projeto
        <ExternalLink
          size={13}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    )}
    {codeUrl && (
      <a
        href={codeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-mute hover:text-ink transition-colors"
      >
        <Github size={13} aria-hidden="true" />
        Código
      </a>
    )}
  </div>
);

const FeaturedCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => (
  <Reveal delay={index}>
    <article className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
      <div className="relative overflow-hidden border-b md:border-b-0 md:border-r border-line bg-card2 min-h-56 md:min-h-full group">
        <img
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-2.5">
          <h3 className="section-title">{project.title}</h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-wash border border-line font-mono text-[0.6rem] uppercase tracking-[0.06em] text-accent-text">
            <Star size={10} fill="currentColor" aria-hidden="true" />
            destaque
          </span>
        </div>

        <p className="text-ink-soft text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <p className="flex items-center gap-4 meta mb-5">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={11} aria-hidden="true" />
            {project.date}
          </span>
        </p>

        <ProjectLinks liveUrl={project.liveUrl} codeUrl={project.codeUrl} />
      </div>
    </article>
  </Reveal>
);

const SecondaryCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => (
  <Reveal delay={index} className="h-full">
    <article className="group flex h-full flex-col">
      <div className="relative aspect-video overflow-hidden border-b border-line bg-card2">
        <img
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="card-title">{project.title}</h3>
          <span className="meta">{project.date}</span>
        </div>

        <p className="text-ink-soft text-[0.85rem] leading-relaxed mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <ProjectLinks liveUrl={project.liveUrl} codeUrl={project.codeUrl} />
        </div>
      </div>
    </article>
  </Reveal>
);

const ProjectsPage = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-b border-line">
          <SectionHeader
            eyebrow="meu trabalho"
            title="Projetos"
            description="Uma seleção dos projetos que mais representam minhas habilidades e paixão por desenvolver soluções impactantes."
          />

          {featured.map((project, i) => (
            <div key={project.title} className="border-b border-line">
              <FeaturedCard project={project} index={i} />
            </div>
          ))}

          <div className="border-b border-line px-4 sm:px-6 py-3.5">
            <h3 className="section-title">Outros projetos</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
            {rest.map((project, i) => (
              <div
                key={project.title}
                className={`border-line ${i % 2 === 0 ? "md:border-r" : ""} ${
                  i > 0 ? "border-t md:border-t-0" : ""
                } ${i >= 2 ? "md:border-t" : ""}`}
              >
                <SecondaryCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectsPage;
