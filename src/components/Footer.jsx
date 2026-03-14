import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="text-sm text-gray-500">
              © {currentYear} Samuel. Todos os direitos reservados.
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: FaGithub, href: "https://github.com/Samuteg" },
              { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/samu-teg-b9002b385/" },
              { icon: FaXTwitter, href: "https://x.com/Samuteg10" },
              { icon: FaInstagram, href: "https://www.instagram.com/samuteg10/" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
