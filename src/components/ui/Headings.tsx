"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/* ================= STYLES ================= */

const headingVariants = cva(
  "text-black font-bold leading-tight",
  {
    variants: {
      level: {
        h1: "text-[32px] md:text-[42px] lg:text-[58px]",
        h2: "text-[24px] md:text-[32px] lg:text-[42px]",
        h3: "text-[18px] md:text-[20px] lg:text-[24px]",
      },
    },
    defaultVariants: {
      level: "h2",
    },
  }
);

/* ================= TYPES ================= */

type HeadingLevel = "h1" | "h2" | "h3";

type HeadingProps =
  ComponentPropsWithoutRef<HeadingLevel> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingLevel;
  };

/* ================= COMPONENT ================= */

export const Heading = ({
  as = "h2",
  level,
  className,
  children,
  ...props
}: HeadingProps) => {
  const Component = as;

  return (
    <Component
      className={cn(
        headingVariants({ level: level ?? as }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
