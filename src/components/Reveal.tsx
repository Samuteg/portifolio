import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type Variant = "up" | "left" | "fade" | "scale";

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-6",
  left: "opacity-0 -translate-x-6",
  fade: "opacity-0",
  scale: "opacity-0 scale-95",
};

const shown: Record<Variant, string> = {
  up: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  fade: "opacity-100",
  scale: "opacity-100 scale-100",
};

type RevealProps = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        inView ? shown[variant] : hidden[variant]
      } ${className}`}
      style={{ transitionDelay: `${Math.min(delay * 0.1, 0.3)}s` }}
    >
      {children}
    </div>
  );
}
