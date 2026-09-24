import { Button } from "./Button";
import { waLink } from "@/lib/site";

export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  variant = "ghost-light",
  source,
  className,
}: {
  message?: string;
  label?: string;
  variant?: "gold" | "forest" | "ghost-light" | "ghost-dark";
  source: string;
  className?: string;
}) {
  return (
    <Button href={waLink(message)} variant={variant} event="whatsapp_click" params={{ source }} className={className}>
      {label}
    </Button>
  );
}
