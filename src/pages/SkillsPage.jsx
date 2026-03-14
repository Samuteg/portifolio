import { motion } from "framer-motion";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGolang,
  FaDocker,
  FaLinux,
  FaGitAlt,
  FaServer,
  FaCode,
  FaGears,
  FaPython,
  FaDatabase,
  FaJs,
} from "react-icons/fa6";
import PageTransition from "../components/PageTransition";

/* ================= Skill Item ================= */

const SkillItem = ({ icon, label, level }) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -2 }}
    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 min-w-0 overflow-hidden"
  >
    <span className="text-accent text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
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
  </motion.div>
);

/* ================= Stack Card ================= */

const StackCard = ({ title, icon, skills, accentColor = "accent" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ y: -4 }}
    className="relative rounded-3xl p-7 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden group"
  >
    {/* Subtle gradient glow on hover */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xl">
          {icon}
        </div>
        <h2 className="text-lg font-display font-bold text-white">{title}</h2>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 gap-2">
        {skills.map((skill, index) => (
          <SkillItem key={index} {...skill} />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ================= Page ================= */

export default function SkillsPage() {
  return (
    <PageTransition>
      <section className="page-section relative">
        {/* Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              Minhas competências
            </span>
            <h1 className="page-title gradient-text mb-4">Skills</h1>
            <p className="page-subtitle">
              Tecnologias e ferramentas que utilizo para construir aplicações
              modernas, escaláveis e de alta performance.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Frontend */}
            <StackCard
              title="Frontend"
              icon={<FaCode />}
              skills={[
                { icon: <FaHtml5 />, label: "HTML5", level: 5 },
                { icon: <FaCss3Alt />, label: "CSS3 / Tailwind", level: 5 },
                { icon: <FaJs />, label: "JavaScript", level: 4 },
                { icon: <FaReact />, label: "React", level: 4 },
                { icon: <FaReact />, label: "Next.js", level: 4 },
                { icon: <FaCode />, label: "Responsive Design", level: 5 },
              ]}
            />

            {/* Backend */}
            <StackCard
              title="Backend"
              icon={<FaServer />}
              skills={[
                { icon: <FaNodeJs />, label: "Node.js", level: 4 },
                { icon: <FaNodeJs />, label: "Express", level: 4 },
                { icon: <FaGolang />, label: "Golang", level: 3 },
                { icon: <FaPython />, label: "Python", level: 4 },
                { icon: <FaServer />, label: "REST APIs", level: 5 },
                { icon: <FaDatabase />, label: "MongoDB / SQLite", level: 4 },
              ]}
            />

            {/* DevOps */}
            <StackCard
              title="DevOps & Tools"
              icon={<FaGears />}
              skills={[
                { icon: <FaDocker />, label: "Docker", level: 3 },
                { icon: <FaLinux />, label: "Linux", level: 4 },
                { icon: <FaGitAlt />, label: "Git & GitHub", level: 5 },
                { icon: <FaGears />, label: "CI / CD", level: 3 },
                { icon: <FaServer />, label: "Deployment", level: 4 },
                { icon: <FaGears />, label: "Automação", level: 4 },
              ]}
            />
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "2+", label: "Anos de experiência" },
              { value: "10+", label: "Projetos concluídos" },
              { value: "5+", label: "Tecnologias dominadas" },
              { value: "∞", label: "Vontade de aprender" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl glass border border-white/5 hover:border-accent/20 transition-colors duration-300"
              >
                <div className="text-3xl font-display font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
