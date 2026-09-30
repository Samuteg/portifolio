import { Github } from "lucide-react";
import { LinkedinIcon, XIcon, InstagramIcon } from "../icons/SocialIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm"
            >
              S
            </span>
            <span className="text-sm text-ink-mute">
              © {currentYear} Samuel. Todos os direitos reservados.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: "https://github.com/Samuteg", label: "GitHub" },
              { icon: LinkedinIcon, href: "https://www.linkedin.com/in/samu-teg-b9002b385/", label: "LinkedIn" },
              { icon: XIcon, href: "https://x.com/Samuteg10", label: "X" },
              { icon: InstagramIcon, href: "https://www.instagram.com/samuteg10/", label: "Instagram" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-ink-mute hover:text-ink border border-transparent hover:border-line transition-colors duration-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
