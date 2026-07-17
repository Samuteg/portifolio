import PageTransition from "../components/PageTransition";
import { useInView } from "../hooks/useInView";

const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716H7.664l.24 2.573h6.987l-.258 3.078-2.796.764-2.797-.762-.168-1.9H5.88l.329 4.275 5.794 1.56 5.777-1.562 1.24-13.651z" />
  </svg>
);

const JsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.03-.09.24-.705.074-1.39l.046.001zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 9.26a2.74 2.74 0 100 5.48 2.74 2.74 0 000-5.48zm8.79-2.46c-.46-1.82-2.03-2.63-4.42-2.63-1.34 0-2.8.28-4.37.86-1.57-.58-3.03-.86-4.37-.86-2.39 0-3.96.81-4.42 2.63-.56 2.2.35 5.02 2.48 8.06 1.04 1.48 2.24 2.84 3.58 4.05 1.34-1.21 2.54-2.57 3.58-4.05 2.13-3.04 3.04-5.86 2.48-8.06h.04zm-1.07 1.49c.1.38.14.78.12 1.18-.61-.14-1.24-.24-1.89-.31.18-.49.37-.96.59-1.42.4-.09.81-.16 1.18.55zm-4.47-2.69c.53.56 1.02 1.18 1.45 1.85-.53.08-1.07.19-1.61.33-.16-.5-.35-.99-.56-1.47.25-.24.5-.47.72-.71zm-3.22 0c.22.24.47.47.72.71-.21.48-.4.97-.56 1.47-.54-.14-1.08-.25-1.61-.33.43-.67.92-1.29 1.45-1.85zm-3.14 4.4c.41-.19.82-.36 1.24-.51.2.46.39.93.56 1.41-.64.07-1.27.17-1.88.31-.02-.4.02-.8.12-1.21h-.04zm1.25 3.76c-.44-.26-.86-.56-1.24-.89.35-.49.74-.96 1.16-1.39.16.4.34.79.55 1.16-.13.38-.3.75-.47 1.12zm5.71 5.74c-.56.68-1.14 1.32-1.74 1.92-.6-.6-1.18-1.24-1.74-1.92.58-.13 1.15-.3 1.71-.52.56.22 1.13.39 1.71.52h.06zm5.63-2.01c-.4.36-.84.7-1.3 1-.19-.37-.38-.74-.54-1.13.18-.33.35-.67.48-1.02.44.46.85.94 1.25 1.44.05.24.07.48.06.71h.05zm3.1-4.15c-.64-.19-1.31-.33-2-.42.17-.48.36-.96.56-1.44.45.17.89.37 1.3.6.16.4.24.84.14 1.26z" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M11.998 24c-.321 0-.641-.084-.925-.249l-2.936-1.737c-.44-.245-.224-.332-.08-.383.586-.203.705-.249 1.328-.604.066-.037.152-.023.22.016l2.256 1.339c.082.044.198.044.273 0l8.793-5.076c.082-.05.14-.147.14-.242V7.319c0-.095-.058-.191-.14-.252l-8.793-5.055c-.082-.049-.191-.049-.273 0L3.107 7.058c-.082.05-.14.146-.14.252v10.139c0 .096.058.191.14.252l2.409 1.39c1.307.653 2.108-.116 2.108-.891V8.516c0-.127.103-.249.23-.249h1.114c.127 0 .231.122.231.249v9.679c0 1.743-.95 2.742-2.603 2.742-.509 0-.909 0-2.025-.55l-2.304-1.34c-.57-.326-.925-.928-.925-1.587V7.319c0-.66.355-1.261.925-1.596l8.805-5.076c.566-.326 1.299-.326 1.857 0l8.793 5.076c.57.335.926.936.926 1.596v10.139c0 .66-.355 1.261-.926 1.587l-8.793 5.076c-.275.165-.595.249-.916.249l.008-.008z" />
  </svg>
);

const GoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M4.79 10.22c-.1 0-.2-.03-.28-.1l-.67-.55a.44.44 0 010-.67l.67-.55a.43.43 0 01.56 0l.67.55c.18.15.18.41 0 .56l-.67.55c-.08.1-.18.12-.28.12zm5.67 0c-.1 0-.2-.03-.28-.1l-.67-.55a.44.44 0 010-.67l.67-.55a.43.43 0 01.56 0l.67.55c.18.15.18.41 0 .56l-.67.55c-.08.1-.18.12-.28.12zm10.17-1.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm-8.14 5.95c-2.2 0-5.16-.5-7.6-1.48a.32.32 0 01-.2-.3c0-.15.1-.3.3-.3 2.25.78 5.1 1.2 7.15 1.2 2.4 0 4.97-.6 4.97-2.4 0-.7-.3-1.1-.9-1.4l-.2-.1c-.2-.1-.4-.2-.3-.4.1-.2.2-.3.4-.2 1.7.8 2.1 1.8 2.1 2.9 0 1.6-1.5 2.7-4.1 2.9.0 0 0 .08-.02.08zm3.5-2.1c-.1 0-.2-.03-.28-.1l-.67-.55a.44.44 0 010-.67l.67-.55a.43.43 0 01.56 0l.67.55c.18.15.18.41 0 .56l-.67.55c-.08.1-.18.12-.28.12z" />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M13.983 11.078h2.119v-1.836h-2.119v1.836zm0-3.25h2.119V5.927h-2.119v1.901zm-3.24 3.25h2.119v-1.836h-2.119v1.836zm0-3.25h2.119V5.927h-2.119v1.901zm-3.187 0h2.119V5.927H7.556v1.901zm0 3.25h2.119v-1.836H7.556v1.836zm-6.236 2.436c.483 4.087 3.558 5.803 7.734 5.803 4.547 0 7.811-2.221 9.077-5.786 0 0 2.218-1.076 1.993-3.175h-5.614c0-.04.007-.078.007-.118v-.009c0-1.18.94-2.118 2.118-2.118v-2.467a.708.708 0 00-.708-.708c-2.646 0-4.647 1.116-5.159 3.572-.242.139-.53.287-.926.287-.395 0-.678-.146-.919-.283-.511-2.456-2.513-3.576-5.159-3.576-.391 0-.708.317-.708.708v2.467c1.177 0 2.118.938 2.118 2.118 0 .04.004.078.012.118H3.166c-.505 0-.909.407-.909.909 0 0 0 .003.003.006v1.455l.06.006z" />
  </svg>
);

const LinuxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12.535.062c-.456-.058-1.052.166-1.432 1.056-.474 1.115-.825 1.873-.825 1.873l.263.345c-.314.416-1.064 1.527-1.064 1.527l.238.437c-.209.34-.757 1.484-.757 1.484L9.25 5.757c-.733 1.901-1.644 4.174-1.644 4.174-.07.152-.222.513-.39.912.375-.44.704-.75.704-.75 1.406-1.306 2.283-2.053 2.283-2.053l.517.094c-.553.53-1.587 1.89-2.346 2.967-.64.91-1.135 1.724-1.135 1.724-.22.4-.408.823-.565 1.262.157-.173.317-.34.475-.489 0 0 1.043-.9 1.863-1.531.488-.376 1.015-.71 1.502-1.018.287-.182.562-.341.815-.48l.202.836.246 1.012c.573 1.705 1.112 2.88 1.112 2.88.376.74.4 1.6.062 2.44-.193.477-.493.895-.866 1.245.157.118.547.565.77 1.08.31.718.28 1.518-.056 2.225-.336.707-.887 1.248-1.447 1.62.584.148 1.056.788 1.056 1.54 0 .87-.71 1.575-1.586 1.575-.875 0-1.586-.705-1.586-1.575 0-.475.208-.9.538-1.18-.522-.26-1.27-.744-1.868-1.45-.803-.955-1.152-2.218-.8-3.471.18-.637.526-1.188.956-1.615-.095-.402-.243-.978-.36-1.59-.098-.51-.16-1.036-.16-1.53 0-.575.088-1.09.22-1.55l-1.02 1.31c-.364.467-.86.872-1.396 1.164-.604.33-1.268.507-1.945.507-1.223 0-2.373-.57-3.11-1.616-.74-1.05-.935-2.46-.515-3.715.184-.55.482-1.05.872-1.465-.133-.58-.445-1.175-.445-1.175L2.28 11.81l-.462-.12c.723 1.392.48 2.5-.18 3.27-.482.562-1.138.897-1.774 1.096.023.04.044.08.063.122.06.133.103.272.13.416.26 1.39-.57 2.717-1.86 2.99-1.29.272-2.538-.592-2.796-1.984-.084-.452-.04-.9.11-1.308-.31.067-.63.03-.925-.13-.294-.158-.5-.424-.6-.739-.246-.77.3-1.604 1.176-1.89.065-.02.13-.04.197-.05-.023-.137-.036-.28-.036-.428v-.378c-.31.024-.63-.036-.926-.19-.37-.193-.63-.518-.76-.88-.254-.72.198-1.522 1.023-1.855l.03.013.1.02.003.04c.08.054.157.113.228.178.26.237.42.58.418.94l-.008.14c.622-.69 1.486-1.03 2.384-1.03.746 0 1.465.22 2.07.63l1.31.9c.826.57 1.756 1.153 2.305 1.5.336.21.653.33.892.37.13.02.22.02.26 0 .052-.028.087-.096.087-.22v-.008c0-.12-.03-.202-.08-.266-.03-.04-.08-.08-.16-.14-.11-.08-.28-.2-.49-.37-.2-.16-.47-.35-.76-.56l-1.32-.94c-.37-.26-.76-.5-1.12-.69-.45-.24-.89-.39-1.29-.46-.56-.1-1.05-.02-1.43.24-.04.03-.08.06-.12.1.34-.09.72-.07 1.08.1.31.15.57.39.73.72.2.36.26.78.16 1.17-.08.31.08.44.07.44-.02-.14-.04-.28-.04-.42z" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
  </svg>
);

const JavaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M8.851 18.56s-.817.475.581.636c1.695.194 2.561.166 4.426-.187 0 0 .492.308 1.178.574-4.189 1.795-9.487-.198-6.185-1.023zm-.512-2.331s-.917.679.483.824c1.807.186 3.234.202 5.703-.274 0 0 .342.347.878.537-5.06 1.48-10.702.222-7.064-1.087zm6.407 4.94c0 0 .68.56-1.495.992-2.703.536-11.26.698-13.634.021-.854-.243 1.5-.58 2.51-.651.0 0 .59-.048.928-.177-3.636-1.034-6.354-3.613-1.769-3.996 4.385-.367 7.908.328 11.46 1.174zM9.23 14.21s-3.689.876-1.306 1.194c1.006.134 3.012.103 4.88-.052 1.527-.127 3.06-.39 3.06-.39s-.538.23-.928.494c-3.743.984-10.958.525-8.878-.479.918-.444 1.753-.767 1.753-.767zm6.092 3.862c3.808-1.978 2.048-3.878.818-3.622-.3.063-.436.232-.436.232s.112-.11.324-.158c1.178-.414 3.579.631-.687 2.188 0 0 .017-.64-.019 0zm-2.598-6.78c.588-.676 0 0 0 0zM16.99 24s.543-.56-.508-.992c-1.832-.75-4.087-.836-6.728-.678 0 0 .338-.139 1.025-.173-4.166-1.048-7.313.63-5.679 1.57 2.301 1.323 5.42 1.614 11.89.273zm1.597-5.66c.043.047.182-.03.182-.03s-.036.252-.151.388c-2.071 2.494-7.416 1.918-11.054 1.53 0 0 .417-.213.98-.326-4.193-.59-7.029-2.095-6.832-3.156.082-.434.496-.463 1.581-.299.0 0 .583-.058.374-.164-2.19-.725-5.475-1.455-4.99-2.741.397-1.05 3.577-1.444 5.864-1.194 0 0 .351-.053.566-.145-3.68-1.029-6.328-2.706-5.847-4.111.543-1.614 5.192-2.114 8.65-1.94 0 0 .85-.246 1.383-.599C9.016 2.024 6.643.712 6.643.712S10.569 2.59 12.88 5.36c1.564 1.872.418 3.347.418 3.347s-2.646-.752-4.782-.786c-2.078-.033-2.744.928-1.803 1.258 1.056.371 2.927.672 4.41 1.467 1.54.825 2.866 2.113 1.464 3.874" />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const GearsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

type SkillData = {
  icon: React.ReactNode;
  label: string;
  level?: number;
};

type StackCardProps = {
  title: string;
  icon: React.ReactNode;
  skills: SkillData[];
};

const SkillItem = ({ icon, label, level }: SkillData) => (
  <div className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 min-w-0 overflow-hidden">
    <span className="text-accent text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-300 block w-4 h-4">
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
  </div>
);

const StackCard = ({ title, icon, skills }: StackCardProps) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`relative rounded-3xl p-7 bg-surface-100/50 border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden group hover:-translate-y-1 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: "0s",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.6s",
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xl">
            {icon}
          </div>
          <h2 className="text-lg font-display font-bold text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {skills.map((skill) => (
            <SkillItem key={skill.label} {...skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SkillsPage() {
  const { ref: headerRef, inView: headerInView } = useInView();

  return (
    <PageTransition>
      <section className="page-section relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div
            ref={headerRef}
            className={`mb-16 transition-all duration-700 ${
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">
              Minhas competências
            </span>
            <h1 className="page-title gradient-text mb-4">Skills</h1>
            <p className="page-subtitle">
              Tecnologias e ferramentas que utilizo para construir aplicações
              modernas, escaláveis e de alta performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StackCard
              title="Frontend"
              icon={<CodeIcon />}
              skills={[
                { icon: <HtmlIcon />, label: "HTML5", level: 5 },
                { icon: <CssIcon />, label: "CSS3 / Tailwind", level: 5 },
                { icon: <JsIcon />, label: "JavaScript", level: 4 },
                { icon: <ReactIcon />, label: "React", level: 4 },
                { icon: <ReactIcon />, label: "Next.js", level: 4 },
                { icon: <CodeIcon />, label: "Responsive Design", level: 5 },
              ]}
            />

            <StackCard
              title="Backend"
              icon={<ServerIcon />}
              skills={[
                { icon: <NodeIcon />, label: "Node.js", level: 4 },
                { icon: <NodeIcon />, label: "Fastify", level: 4 },
                { icon: <GoIcon />, label: "Golang", level: 3 },
                { icon: <JavaIcon />, label: "Java", level: 4 },
                { icon: <ServerIcon />, label: "REST APIs", level: 5 },
                { icon: <DatabaseIcon />, label: "MongoDB / SQLite", level: 4 },
              ]}
            />

            <StackCard
              title="DevOps & Tools"
              icon={<GearsIcon />}
              skills={[
                { icon: <DockerIcon />, label: "Docker", level: 2 },
                { icon: <LinuxIcon />, label: "Linux", level: 5 },
                { icon: <GitIcon />, label: "Git & GitHub", level: 5 },
                { icon: <GearsIcon />, label: "CI / CD", level: 2 },
                { icon: <ServerIcon />, label: "Deployment", level: 4 },
                { icon: <GearsIcon />, label: "Automação", level: 2 },
              ]}
            />
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "2+", label: "Anos de experiência" },
              { value: "10+", label: "Projetos concluídos" },
              { value: "5+", label: "Tecnologias dominadas" },
              { value: "∞", label: "Vontade de aprender" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl glass border border-white/5 hover:border-accent/20 transition-colors duration-300"
              >
                <div className="text-3xl font-display font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
