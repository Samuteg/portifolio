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
  Atom,
  Zap,
  Coffee,
  Braces,
  Workflow,
  Palette,
  Bot,
  Rocket,
  type LucideIcon,
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

const marqueeItems: { label: string; icon: LucideIcon }[] = [
  { label: "React", icon: Atom },
  { label: "Next.js", icon: Globe },
  { label: "Node.js", icon: Server },
  { label: "Fastify", icon: Zap },
  { label: "Java", icon: Coffee },
  { label: "Golang", icon: Cpu },
  { label: "REST APIs", icon: Braces },
  { label: "MongoDB", icon: Database },
  { label: "SQLite", icon: Database },
  { label: "Docker", icon: Box },
  { label: "Linux", icon: Terminal },
  { label: "Git & GitHub", icon: GitBranch },
  { label: "CI / CD", icon: Workflow },
  { label: "HTML5", icon: FileCode },
  { label: "CSS3 / Tailwind", icon: Palette },
  { label: "JavaScript", icon: Code },
  { label: "Automação", icon: Bot },
  { label: "Deployment", icon: Rocket },
];

const MarqueeGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <div className="marquee-group py-3" aria-hidden={hidden || undefined}>
    {marqueeItems.map(({ label, icon: Icon }) => (
      <span
        key={label}
        className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ink-mute"
      >
        <Icon size={13} aria-hidden="true" className="shrink-0" />
        {label}
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="marquee border-b border-line" aria-label="Tecnologias que uso">
    <MarqueeGroup />
    <MarqueeGroup hidden />
  </div>
);

const levelWidth = ["w-0", "w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];

const SkillItem = ({ icon, label, level }: SkillData) => (
  <li className="flex items-center gap-3 py-2.5 border-b border-line last:border-b-0 min-w-0">
    <span aria-hidden="true" className="text-ink-mute flex-shrink-0 block w-4 h-4">
      {icon}
    </span>
    <span className="text-ink text-sm font-medium truncate min-w-0 flex-1">
      {label}
    </span>
    {typeof level === "number" && (
      <span
        role="img"
        aria-label={`Nível ${level} de 5`}
        className="block w-16 h-0.5 rounded-full bg-line flex-shrink-0 overflow-hidden"
      >
        <span
          aria-hidden="true"
          className={`block h-full rounded-full bg-accent-text transition-[width] duration-700 ${
            levelWidth[level] ?? "w-0"
          }`}
        />
      </span>
    )}
  </li>
);

const StackCard = ({ title, icon, skills }: StackCardProps) => (
  <Reveal className="h-full">
    <div className="flex items-center gap-2.5 border-b border-line px-4 sm:px-6 py-3">
      <span className="text-accent-text shrink-0">{icon}</span>
      <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink">
        {title}
      </h3>
    </div>
    <ul className="px-4 sm:px-6 py-2">
      {skills.map((skill) => (
        <SkillItem key={skill.label} {...skill} />
      ))}
    </ul>
  </Reveal>
);

export default function SkillsPage() {
  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-b border-line">
          <SectionHeader
            eyebrow="minhas competências"
            title="Skills"
            description="Tecnologias e ferramentas que utilizo para construir aplicações modernas, escaláveis e de alta performance."
          />

          <Marquee />

          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-line">
            <StackCard
              title="Frontend"
              icon={<Code className="w-4 h-4" aria-hidden="true" />}
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
              icon={<Server className="w-4 h-4" aria-hidden="true" />}
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
              icon={<Wrench className="w-4 h-4" aria-hidden="true" />}
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
