import { Github } from "lucide-react";
import { LinkedinIcon, XIcon, InstagramIcon } from "../icons/SocialIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 frame border-b border-line">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-4 sm:px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-accent-ink font-bold text-xs"
          >
            S
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute">
            © {currentYear} Samuel. Todos os direitos reservados.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
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
              className="w-9 h-9 rounded-full flex items-center justify-center text-ink-mute border border-line hover:text-ink hover:border-line-strong hover:-translate-y-0.5 transition-all duration-300"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
