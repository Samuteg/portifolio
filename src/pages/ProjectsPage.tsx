import { ExternalLink, Github, Star, Calendar } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useInView } from "../hooks/useInView";
import devbox_print from "../assets/debox_print.webp";
import taskprint from "../assets/taskprint.webp";
import blog_print from "../assets/blog_print.webp";

const projects = [
  {
    title: "TaskNest",
    description:
      "Sistema de gestão de tarefas e projetos com quadro Kanban nativo. Membros podem visualizar e mover tarefas entre estados — Pendente, Em Progresso e Concluído — de forma fluida e intuitiva.",
    image: taskprint,
    tags: ["Node.js", "Express", "MongoDB", "Next.js"],
    rating: "4.8",
    date: "Mar 2026",
    liveUrl: "https://task-nest-lac.vercel.app/",
    codeUrl: "https://github.com/Samuteg/TaskNest",
    featured: true,
  },
  {
    title: "SamutegDev",
    description:
      'Blog pessoal e portfólio de projetos, com foco em performance, SEO e experiência do usuário. Desenvolvido com Astro.',
    image: blog_print,
    tags: ["Astro", "Css", "React", "KeyStatic"],
    rating: "4.9",
    date: "Jan 2026",
    codeUrl: "https://github.com/Samuteg/SamutegDev",
    featured: true
  },
  {
    title: "DevBox CLI",
    description:
      'CLI de alta performance feita em Go para eliminar a fricção do dia-a-dia de desenvolvimento. Scaffolding de arquiteturas, git best practices e automação do "boring stuff".',
    image: devbox_print,
    tags: ["Go", "Cobra", "Viper", "Promptui", "Go-git"],
    rating: "4.1",
    date: "Jan 2026",
    liveUrl: "https://samuteg-dev.vercel.app/",
    codeUrl: "https://github.com/Samuteg/DevboxCLI",
    featured: true
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => {
  const { ref, inView } = useInView();
  return (
    <article
      ref={ref}
      className={`group relative grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 rounded-3xl p-5 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden hover:-translate-y-1 ${
        project.featured ? "ring-1 ring-accent/10" : ""
      } ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${index * 0.15}s`,
        transitionProperty: "opacity, transform",
        transitionDuration: "0.7s",
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          Destaque
        </div>
      )}

      <div className="relative rounded-2xl overflow-hidden bg-surface h-56 md:h-auto">
        <img
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col justify-center py-2">
        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-accent-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, j) => (
            <span
              key={j}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
          <span className="flex items-center gap-1">
            <Star size={12} className="text-accent" />
            {project.rating}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {project.date}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:scale-[1.02] transition-all duration-300"
            >
              <ExternalLink size={14} />
              Ver projeto
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300"
            >
              <Github size={14} />
              Código
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const ProjectsPage = () => {
  return (
    <PageTransition>
      <section className="page-section relative">
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-16 animate-fade-up">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              Meu trabalho
            </span>
            <h1 className="page-title gradient-text mb-4">Projetos</h1>
            <p className="page-subtitle">
              Uma seleção dos projetos que mais representam minhas habilidades e
              paixão por desenvolver soluções impactantes.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectsPage;
