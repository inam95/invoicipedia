import { Badge } from "@/components/ui/badge";

export function InvoiceStatusBadge({
  status,
}: {
  status: "open" | "paid" | "void" | "uncollectible";
}) {
  const statusColor = {
    open: "bg-blue-500",
    paid: "bg-green-500",
    void: "bg-zinc-500",
    uncollectible: "bg-red-600",
  };

  return (
    <Badge className={`rounded-full capitalize ${statusColor[status]}`}>
      {status}
    </Badge>
  );
}
