import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Github } from "lucide-react";
import { LinkedinIcon, XIcon, InstagramIcon } from "../icons/SocialIcons";
import PageTransition from "../components/PageTransition";
import { useInView } from "../hooks/useInView";
import profile from "../assets/profile.webp";

const socials = [
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/samu-teg-b9002b385/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Samuteg", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/Samuteg10", label: "X/Twitter" },
  { icon: InstagramIcon, href: "https://www.instagram.com/samuteg10/", label: "Instagram" },
];

const roles = ["Full-Stack Developer", "Web Designer", "Freelancer", "Automação & Scripts"];

const HomePage = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const { ref: textRef, inView: textInView } = useInView();
  const { ref: imageRef, inView: imageInView } = useInView();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <section className="page-section flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(183,75,75,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(183,75,75,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-1/4 right-[15%] w-72 h-72 bg-accent/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 left-[10%] w-60 h-60 bg-accent-dark/10 rounded-full blur-[100px] animate-float" style={{animationDelay: '3s'}} />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div
              ref={textRef}
              className={`transition-all duration-700 ${textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Disponível para projetos</span>
              </div>

              <h1 className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4 transition-all duration-700 delay-75 ${textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                Olá, eu sou{" "}
                <span className="gradient-text text-shadow-glow">Samuel</span>
              </h1>

              <div className={`mb-6 transition-all duration-700 delay-150 ${textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-center gap-2 justify-center lg:justify-start text-lg sm:text-xl text-gray-400">
                  <Sparkles size={18} className="text-accent" />
                  <div className="overflow-hidden h-8 relative">
                    <div
                      className="flex flex-col transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateY(-${roleIndex * 32}px)` }}
                    >
                      {roles.map((role) => (
                        <span key={role} className="h-8 flex items-center font-medium text-accent-400">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className={`text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 transition-all duration-700 delay-200 ${textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                Desenvolvedor focado em construir soluções eficientes e funcionais,
                com experiência em Python, React e Go. Forte interesse em sistemas,
                automação e projetos que combinam lógica, design e uma experiência
                de usuário sólida.
              </p>

              <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10 transition-all duration-700 delay-300 ${textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
                  <Github size={18} />
                  Ver GitHub
                </a>
              </div>

              <div className={`flex items-center gap-3 justify-center lg:justify-start transition-all duration-700 delay-500 ${textInView ? "opacity-100" : "opacity-0"}`}>
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className={`flex-shrink-0 transition-all duration-700 delay-150 ${imageInView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent-dark/10 to-accent-light/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow" />

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1 bg-gradient-to-br from-accent to-accent-dark shadow-2xl shadow-accent/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-surface">
                  <img
                    src={profile}
                    alt="Samuel — Desenvolvedor Full-Stack"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div
                className="absolute -bottom-2 -right-2 px-4 py-2 rounded-xl glass-strong border border-accent/20 shadow-lg animate-float"
              >
                <span className="text-sm font-medium text-accent">2+ anos exp.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;
