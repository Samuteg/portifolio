import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, ExternalLink } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import PageTransition from "../components/PageTransition";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "samuteg10@gmail.com",
    href: "mailto:samuteg10@gmail.com",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Brasil",
    href: null,
  },
];

const socialLinks = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samu-teg-b9002b385/",
    username: "/in/samu-teg",
    color: "hover:border-blue-500/30 hover:text-blue-400",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Samuteg",
    username: "@Samuteg",
    color: "hover:border-gray-400/30 hover:text-gray-200",
  },
  {
    icon: FaXTwitter,
    label: "X / Twitter",
    href: "https://x.com/Samuteg10",
    username: "@Samuteg10",
    color: "hover:border-sky-500/30 hover:text-sky-400",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/samuteg10/",
    username: "@samuteg10",
    color: "hover:border-pink-500/30 hover:text-pink-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ContactPage = () => {
  return (
    <PageTransition>
      <section className="page-section relative">
        {/* Background */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              Vamos conversar
            </span>
            <h1 className="page-title gradient-text mb-4">Contato</h1>
            <p className="page-subtitle">
              Tem um projeto em mente ou quer bater um papo? Entre em contato
              por qualquer um dos canais abaixo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                <Mail size={20} className="text-accent" />
                Informações
              </h2>

              {contactInfo.map((item, i) => (
                <motion.div key={i} variants={itemVariants}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                          {item.value}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-100/50 border border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div variants={itemVariants} className="pt-4">
                <a
                  href="https://www.99freelas.com.br/user/Samuteg10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-2xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <Send size={18} />
                  Solicitar orçamento
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                <ExternalLink size={20} className="text-accent" />
                Redes Sociais
              </h2>

              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-2xl bg-surface-100/50 border border-white/5 ${social.color} transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-all duration-300">
                    <social.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 block">
                      {social.label}
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      {social.username}
                    </span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-gray-600 group-hover:text-current transition-colors"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="glass rounded-2xl p-8 border border-white/5">
              <p className="text-gray-400 text-sm">
                💡 Prefiro conversar sobre projetos via{" "}
                <a
                  href="mailto:samuteg10@gmail.com"
                  className="text-accent hover:underline"
                >
                  email
                </a>{" "}
                ou{" "}
                <a
                  href="https://www.linkedin.com/in/samu-teg-b9002b385/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  LinkedIn
                </a>
                . Respondo em até 24h!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;