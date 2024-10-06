"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="relative w-full font-semibold">
      <span
        className={cn({
          invisible: pending,
        })}
      >
        Submit
      </span>
      {pending && (
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-gray-400">
          <LoaderCircle className="animate-spin" size={24} />
        </span>
      )}
    </Button>
  );
}
