import PageTransition from "../components/PageTransition";
import { useInView } from "../hooks/useInView";
import {
  Code,
  Globe,
  FileCode,
  Layers,
  Server,
  Database,
  Cpu,
  Terminal,
  GitBranch,
  Box,
  Wrench,
} from "lucide-react";

type SkillData = {
  icon: React.ReactNode;
  label: string;
  level?: number;
};

type StackCardProps = {
  title: string;
  icon: React.ReactNode;
  skills: SkillData[];
};

const SkillItem = ({ icon, label, level }: SkillData) => (
  <div className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 min-w-0 overflow-hidden">
    <span className="text-accent text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-300 block w-4 h-4">
      {icon}
    </span>
    <span className="text-gray-300 text-sm font-medium truncate min-w-0 flex-1">
      {label}
    </span>
    {level && (
      <div className="flex gap-0.5 flex-shrink-0">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${
              dot <= level ? "bg-accent" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    )}
  </div>
);

const StackCard = ({ title, icon, skills }: StackCardProps) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`relative rounded-3xl p-7 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden group hover:-translate-y-1 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: "0s",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.6s",
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xl">
            {icon}
          </div>
          <h2 className="text-lg font-display font-bold text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {skills.map((skill) => (
            <SkillItem key={skill.label} {...skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SkillsPage() {
  const { ref: headerRef, inView: headerInView } = useInView();

  return (
    <PageTransition>
      <section className="page-section relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div
            ref={headerRef}
            className={`mb-16 transition-all duration-700 ${
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              Minhas competências
            </span>
            <h1 className="page-title gradient-text mb-4">Skills</h1>
            <p className="page-subtitle">
              Tecnologias e ferramentas que utilizo para construir aplicações
              modernas, escaláveis e de alta performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StackCard
              title="Frontend"
              icon={<Code className="w-5 h-5" />}
              skills={[
                { icon: <Globe className="w-4 h-4" />, label: "HTML5", level: 5 },
                { icon: <FileCode className="w-4 h-4" />, label: "CSS3 / Tailwind", level: 5 },
                { icon: <Code className="w-4 h-4" />, label: "JavaScript", level: 4 },
                { icon: <Layers className="w-4 h-4" />, label: "React", level: 4 },
                { icon: <Globe className="w-4 h-4" />, label: "Next.js", level: 4 },
                { icon: <FileCode className="w-4 h-4" />, label: "Responsive Design", level: 5 },
              ]}
            />

            <StackCard
              title="Backend"
              icon={<Server className="w-5 h-5" />}
              skills={[
                { icon: <Server className="w-4 h-4" />, label: "Node.js", level: 4 },
                { icon: <Server className="w-4 h-4" />, label: "Fastify", level: 4 },
                { icon: <Cpu className="w-4 h-4" />, label: "Golang", level: 3 },
                { icon: <Code className="w-4 h-4" />, label: "Java", level: 4 },
                { icon: <Globe className="w-4 h-4" />, label: "REST APIs", level: 5 },
                { icon: <Database className="w-4 h-4" />, label: "MongoDB / SQLite", level: 4 },
              ]}
            />

            <StackCard
              title="DevOps & Tools"
              icon={<Wrench className="w-5 h-5" />}
              skills={[
                { icon: <Box className="w-4 h-4" />, label: "Docker", level: 2 },
                { icon: <Terminal className="w-4 h-4" />, label: "Linux", level: 5 },
                { icon: <GitBranch className="w-4 h-4" />, label: "Git & GitHub", level: 5 },
                { icon: <Wrench className="w-4 h-4" />, label: "CI / CD", level: 2 },
                { icon: <Globe className="w-4 h-4" />, label: "Deployment", level: 4 },
                { icon: <Wrench className="w-4 h-4" />, label: "Automação", level: 2 },
              ]}
            />
          </div>          
        </div>
      </section>
    </PageTransition>
  );
}
