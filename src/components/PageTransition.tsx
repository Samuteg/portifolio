import type { ReactNode } from "react";

const PageTransition = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`animate-fade-up ${className}`}>
      {children}
    </div>
  );
};

export default PageTransition;
