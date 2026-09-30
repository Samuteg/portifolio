import { useInView } from "../hooks/useInView";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const SectionHeader = ({ eyebrow, title, description }: SectionHeaderProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <span className="eyebrow mb-4 block">$ {eyebrow}</span>
      <h2 className="page-title mb-4">{title}</h2>
      <p className="page-subtitle">{description}</p>
    </div>
  );
};

export default SectionHeader;
