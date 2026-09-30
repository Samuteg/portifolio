import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
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
  <li className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-line min-w-0">
    <span aria-hidden="true" className="text-ink-soft flex-shrink-0 block w-4 h-4">
      {icon}
    </span>
    <span className="text-ink text-sm font-medium truncate min-w-0 flex-1">
      {label}
    </span>
    {typeof level === "number" && (
      <span
        role="img"
        aria-label={`Nível ${level} de 5`}
        className="flex gap-1 flex-shrink-0"
      >
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            aria-hidden="true"
            className={`w-1.5 h-1.5 rounded-full ${
              dot <= level ? "bg-accent-text" : "bg-line-strong"
            }`}
          />
        ))}
      </span>
    )}
  </li>
);

const StackCard = ({ title, icon, skills }: StackCardProps) => (
  <Reveal className="h-full">
    <div className="surface-card p-7 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
          {icon}
        </div>
        <h3 className="card-title">{title}</h3>
      </div>

      <ul className="grid grid-cols-1 gap-2">
        {skills.map((skill) => (
          <SkillItem key={skill.label} {...skill} />
        ))}
      </ul>
    </div>
  </Reveal>
);

export default function SkillsPage() {
  return (
    <PageTransition>
      <section className="page-section">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="minhas competências"
            title="Skills"
            description="Tecnologias e ferramentas que utilizo para construir aplicações modernas, escaláveis e de alta performance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <StackCard
              title="Frontend"
              icon={<Code className="w-5 h-5" aria-hidden="true" />}
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
              icon={<Server className="w-5 h-5" aria-hidden="true" />}
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
              icon={<Wrench className="w-5 h-5" aria-hidden="true" />}
              skills={[
                { icon: <Box className="w-4 h-4" />, label: "Docker", level: 4 },
                { icon: <Terminal className="w-4 h-4" />, label: "Linux", level: 5 },
                { icon: <GitBranch className="w-4 h-4" />, label: "Git & GitHub", level: 5 },
                { icon: <Wrench className="w-4 h-4" />, label: "CI / CD", level: 2 },
                { icon: <Globe className="w-4 h-4" />, label: "Deployment", level: 4 },
                { icon: <Wrench className="w-4 h-4" />, label: "Automação", level: 1 },
              ]}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
