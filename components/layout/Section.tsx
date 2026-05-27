import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: "sm" | "md" | "lg" | "xl";
  background?: "white" | "gray" | "primary" | "secondary" | "gradient";
}

const spacingClasses = {
  sm: "py-4 md:py-12",
  md: "py-6 md:py-16",
  lg: "py-6 md:py-20",
  xl: "py-8 md:py-24",
};

const backgroundClasses = {
  white: "bg-white",
  gray: "bg-neutral-50",
  primary: "bg-primary-600",
  secondary: "bg-secondary-50",
  gradient: "bg-gradient-to-br from-primary-50 via-white to-secondary-50",
};

export const Section: React.FC<SectionProps> = ({
  children,
  spacing = "md",
  background = "white",
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

