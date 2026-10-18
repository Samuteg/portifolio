import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
};

const SectionHeader = ({ eyebrow, title, description, action }: SectionHeaderProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-4 sm:px-6 py-3.5">
        <h2 className="section-title leading-none">{title}</h2>
        {action ?? (eyebrow ? <p className="eyebrow">~/ {eyebrow}</p> : null)}
      </header>
      <div className="border-b border-line px-4 sm:px-6 py-3.5">
        <p className="page-subtitle">{description}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
