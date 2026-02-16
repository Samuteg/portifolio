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
} from "react-icons/fa6";

/* ================= Skill Item ================= */

const SkillItem = ({ icon, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="
      flex items-center gap-3
      px-4 py-3 rounded-xl
      bg-[#111]
      border border-red-500/10
      text-gray-300 text-sm
      hover:text-red-400
      hover:border-red-500/40
      hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]
      transition-all
    "
  >
    <span className="text-red-500 text-lg">{icon}</span>
    {label}
  </motion.div>
);

/* ================= Stack Card ================= */

const StackCard = ({ title, icon, skills, size = "normal" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`
      bg-[#0b0b0b]
      border border-red-500/20
      rounded-3xl p-8
      shadow-[0_0_50px_rgba(239,68,68,0.15)]
      ${
        size === "large"
          ? "col-span-2 min-h-[220px]"
          : "min-h-[200px]"
      }
    `}
  >
    {/* Header */}
    <div className="flex items-center gap-4 mb-8">
      <span className="text-red-500 text-3xl">{icon}</span>
      <h2 className="text-2xl font-semibold text-red-500">{title}</h2>
    </div>

    {/* Skills grid */}
    <div className="grid grid-cols-2 gap-4">
      {skills.map((skill, index) => (
        <SkillItem key={index} {...skill} />
      ))}
    </div>
  </motion.div>
);

/* ================= Page ================= */

export default function Skills() {
  return (
    <section className="min-h-screen bg-black px-[8%] py-24">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <h1 className="text-5xl font-bold text-red-500">Skills</h1>
        <p className="text-gray-400 mt-4 max-w-xl">
          Technologies and tools I use to build scalable, modern and
          high-performance applications.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-10">
        {/* Frontend */}
        <StackCard
          title="Frontend"
          icon={<FaCode />}
          skills={[
            { icon: <FaHtml5 />, label: "HTML5" },
            { icon: <FaCss3Alt />, label: "CSS3 / Tailwind" },
            { icon: <FaReact />, label: "React" },
            { icon: <FaReact />, label: "Hooks & Context" },
            { icon: <FaCode />, label: "Responsive Design" },
            { icon: <FaCode />, label: "UI/UX Implementation" },
          ]}
        />

        {/* Backend */}
        <StackCard
          title="Backend"
          icon={<FaServer />}
          skills={[
            { icon: <FaNodeJs />, label: "Node.js" },
            { icon: <FaNodeJs />, label: "Express" },
            { icon: <FaGolang />, label: "Golang" },
            { icon: <FaServer />, label: "Gin" },
            { icon: <FaServer />, label: "REST APIs" },
            { icon: <FaServer />, label: "JWT Auth" },
          ]}
        />

        {/* DevOps (larger) */}
        <StackCard
          title="DevOps"
          icon={<FaGears />}
          size="large"
          skills={[
            { icon: <FaDocker />, label: "Docker" },
            { icon: <FaLinux />, label: "Linux" },
            { icon: <FaGitAlt />, label: "Git & GitHub" },
            { icon: <FaGears />, label: "CI / CD" },
            { icon: <FaServer />, label: "Server Setup" },
            { icon: <FaGears />, label: "Environment Vars" },
            { icon: <FaGears />, label: "Deployment" },
            { icon: <FaGears />, label: "Automation" },
          ]}
        />
      </div>
    </section>
  );
}

