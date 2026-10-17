import { Mail, MapPin, Send, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { LinkedinIcon, XIcon, InstagramIcon } from "../icons/SocialIcons";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "samuneveslopes@gmail.com",
    href: "mailto:samuneveslopes@gmail.com",
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
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samu-teg-b9002b385/",
    username: "/in/samu-teg",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Samuteg",
    username: "@Samuteg",
  },
  {
    icon: XIcon,
    label: "X / Twitter",
    href: "https://x.com/Samuteg10",
    username: "@Samuteg10",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/samuteg10/",
    username: "@samuteg10",
  },
];

const ContactPage = () => {
  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-b border-line">
          <SectionHeader
            eyebrow="vamos conversar"
            title="Contato"
            description="Tem um projeto em mente ou quer bater um papo? Entre em contato por qualquer um dos canais abaixo."
          />

          <Reveal className="border-b border-line px-4 sm:px-6 py-10">
            <div className="max-w-xl">
              <h3 className="page-title mb-3">
                Vamos construir algo <span className="italic">juntos</span>?
              </h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-6">
                Me conta o que você precisa — respondo em até 24h.
              </p>
              <a
                href="https://www.99freelas.com.br/user/Samuteg10"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Send size={16} aria-hidden="true" />
                Solicitar orçamento
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
            <div className="border-line md:border-r">
              <div className="border-b border-line px-4 sm:px-6 py-3">
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink">
                  Informações
                </h3>
              </div>
              <ul>
                {contactInfo.map((item) => (
                  <li key={item.label} className="border-b border-line last:border-b-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-wash transition-colors group"
                      >
                        <span className="meta w-20 shrink-0">{item.label}</span>
                        <span className="text-sm font-medium text-ink group-hover:text-accent-text transition-colors break-all">
                          {item.value}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 px-4 sm:px-6 py-4">
                        <span className="meta w-20 shrink-0">{item.label}</span>
                        <span className="text-sm font-medium text-ink">{item.value}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="border-b border-line px-4 sm:px-6 py-3">
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink">
                  Redes Sociais
                </h3>
              </div>
              <ul>
                {socialLinks.map((social) => (
                  <li key={social.href} className="border-b border-line last:border-b-0">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-wash transition-colors group"
                    >
                      <social.icon
                        size={15}
                        aria-hidden="true"
                        className="text-ink-mute shrink-0 group-hover:text-accent-text transition-colors"
                      />
                      <span className="meta w-24 shrink-0 hidden sm:block">
                        {social.label}
                      </span>
                      <span className="flex-1 text-sm font-medium text-ink">
                        {social.username}
                      </span>
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="text-ink-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal className="px-4 sm:px-6 py-6">
            <p className="text-ink-soft text-[0.85rem] leading-relaxed max-w-2xl">
              Prefiro conversar sobre projetos via{" "}
              <a
                href="mailto:samuneveslopes@gmail.com"
                className="text-accent-text underline underline-offset-4"
              >
                email
              </a>{" "}
              ou{" "}
              <a
                href="https://www.linkedin.com/in/samu-teg-b9002b385/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text underline underline-offset-4"
              >
                LinkedIn
              </a>
              . Respondo em até 24h.
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;
