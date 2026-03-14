import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import PageTransition from "../components/PageTransition";
import profile from "../assets/profile.jpeg";

const socials = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/samu-teg-b9002b385/", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com/Samuteg", label: "GitHub" },
  { icon: FaXTwitter, href: "https://x.com/Samuteg10", label: "X/Twitter" },
  { icon: FaInstagram, href: "https://www.instagram.com/samuteg10/", label: "Instagram" },
];

const roles = ["Full-Stack Developer", "Web Designer", "Freelancer", "Automação & Scripts"];

const HomePage = () => {
  return (
    <PageTransition>
      <section className="page-section flex items-center justify-center relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(183,75,75,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(183,75,75,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orb */}
        <div className="absolute top-1/4 right-[15%] w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 left-[10%] w-60 h-60 bg-accent-dark/10 rounded-full blur-[100px] animate-float" style={{animationDelay: '3s'}} />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Disponível para projetos</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4"
            >
              Olá, eu sou{" "}
              <span className="gradient-text text-shadow-glow">Samuel</span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 justify-center lg:justify-start text-lg sm:text-xl text-gray-400">
                <Sparkles size={18} className="text-accent" />
                <div className="overflow-hidden h-8 relative">
                  <motion.div
                    animate={{ y: [0, -32, -64, -96, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.25, 0.5, 0.75, 1],
                    }}
                    className="flex flex-col"
                  >
                    {roles.map((role, i) => (
                      <span key={i} className="h-8 flex items-center font-medium text-accent-400">
                        {role}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Desenvolvedor focado em construir soluções eficientes e funcionais,
              com experiência em Python, React e Go. Forte interesse em sistemas,
              automação e projetos que combinam lógica, design e uma experiência
              de usuário sólida.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10"
            >
              <a
                href="https://www.99freelas.com.br/user/Samuteg10"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-2xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
              >
                Me contrate
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/Samuteg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/10 text-gray-300 font-medium hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              >
                <FaGithub size={18} />
                Ver GitHub
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {socials.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent-dark/10 to-accent-light/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow" />

              {/* Ring */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1 bg-gradient-to-br from-accent to-accent-dark shadow-2xl shadow-accent/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-surface">
                  <img
                    src={profile}
                    alt="Samuel — Desenvolvedor Full-Stack"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-2 px-4 py-2 rounded-xl glass-strong border border-accent/20 shadow-lg"
              >
                <span className="text-sm font-medium text-accent">2+ anos exp.</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;
