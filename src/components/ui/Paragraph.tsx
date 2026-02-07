"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ================= VARIANTS ================= */

const paragraphVariants = cva(
  "text-neutral-900 leading-relaxed",
  {
    variants: {
      size: {
        sm: "text-[14px] leading-[1.6]",
        base: "text-[16px] leading-[1.7]",
        lg: "text-[18px] leading-[1.75]",
        xl: "text-[20px] leading-[1.8]",
      },
      tone: {
        default: "text-neutral-900",
        soft: "text-neutral-800",
        muted: "text-neutral-700",
      },
    },
    defaultVariants: {
      size: "base",
      tone: "default",
    },
  }
);

/* ================= COMPONENT ================= */

export const Paragraph = ({
  as = "p",
  size = "base",
  tone = "default",
  className,
  children,
  ...props
}: ParagraphProps) => {
  const Component = as;

  return (
    <Component
      className={cn(paragraphVariants({ size, tone }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

/* ================= TYPES ================= */

type ParagraphProps = {
  as?: "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof paragraphVariants>;
