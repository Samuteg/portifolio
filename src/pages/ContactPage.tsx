import { Mail, MapPin, Send, Github, ExternalLink } from "lucide-react";
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
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="vamos conversar"
            title="Contato"
            description="Tem um projeto em mente ou quer bater um papo? Entre em contato por qualquer um dos canais abaixo."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal className="space-y-3">
              <h3 className="section-title mb-5 flex items-center gap-2">
                <Mail size={20} aria-hidden="true" className="text-accent-text" />
                Informações
              </h3>

              {contactInfo.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="surface-card flex items-center gap-4 p-4 transition-colors hover:border-line-strong"
                    >
                      <span className="w-12 h-12 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
                        <item.icon size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="meta block">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-ink break-all">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-4">
                      <span className="w-12 h-12 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
                        <item.icon size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="meta block">{item.label}</span>
                        <span className="text-sm font-medium text-ink">{item.value}</span>
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-3">
                <a
                  href="https://www.99freelas.com.br/user/Samuteg10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  <Send size={18} aria-hidden="true" />
                  Solicitar orçamento
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal className="space-y-3">
              <h3 className="section-title mb-5 flex items-center gap-2">
                <ExternalLink size={20} aria-hidden="true" className="text-accent-text" />
                Redes Sociais
              </h3>

              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card flex items-center gap-4 p-4 transition-colors hover:border-line-strong"
                >
                  <span className="w-12 h-12 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink-soft">
                    <social.icon size={20} aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="meta block">
                      {social.label}
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {social.username}
                    </span>
                  </span>
                  <ExternalLink
                    size={14}
                    aria-hidden="true"
                    className="text-ink-mute"
                  />
                </a>
              ))}
            </Reveal>
          </div>

          <div className="mt-12 text-center">
            <div className="surface-card p-7">
              <p className="text-ink-soft text-sm leading-relaxed">
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
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;
