import * as React from "react";
import { useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current transition-opacity duration-300",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-destructive/15 [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90 border-destructive/50",
        success:
          "text-emerald-500 bg-emerald-500/15 [&>svg]:text-current *:data-[slot=alert-description]:text-emerald-500 border-emerald-500/50",
      },
      isHiding: {
        true: "opacity-0",
        false: "opacity-100",
      },
    },
    defaultVariants: {
      variant: "default",
      isHiding: false,
    },
  },
);

function Alert({
  className,
  variant,
  timeout,
  onTimeout,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    timeout?: number;
    onTimeout?: () => void;
  }) {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        setIsHiding(true);
        onTimeout?.();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout, onTimeout]);

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, isHiding }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
