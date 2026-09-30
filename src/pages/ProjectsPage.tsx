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

const ProjectCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => (
  <Reveal delay={index}>
    <article className="surface-card overflow-hidden">
      <div
        className={`grid grid-cols-1 ${
          project.featured ? "md:grid-cols-[420px_1fr]" : "md:grid-cols-[320px_1fr]"
        }`}
      >
        <div className="relative bg-card2 min-h-56 md:min-h-full">
          <img
            src={project.image}
            alt={`Preview do projeto ${project.title}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-7">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="card-title">{project.title}</h3>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-wash border border-line text-accent-text font-mono text-[0.75rem]">
                <Star size={11} fill="currentColor" aria-hidden="true" />
                destaque
              </span>
            )}
          </div>

          <p className="text-ink-soft text-[0.95rem] leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="flex items-center gap-4 meta mb-5">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              {project.date}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={18} aria-hidden="true" />
                Ver projeto
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet"
              >
                <Github size={18} aria-hidden="true" />
                Código
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  </Reveal>
);

const ProjectsPage = () => {
  return (
    <PageTransition>
      <section className="page-section">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="meu trabalho"
            title="Projetos"
            description="Uma seleção dos projetos que mais representam minhas habilidades e paixão por desenvolver soluções impactantes."
          />

          <div className="flex flex-col gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectsPage;
