import { Container } from "@/components/container";
import { InvoiceStatusBadge } from "@/components/invoice-status-badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateInvoiceAction } from "@/app/action";

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const invoiceId = parseInt(params.id);
  const { userId } = auth();

  if (!userId) {
    return;
  }

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice id");
  }

  const [invoice] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!invoice) {
    notFound();
  }

  return (
    <main className="w-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            Invoice {invoiceId}
            <InvoiceStatusBadge status={invoice.status} />
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Change Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {AVAILABLE_STATUSES.map((status) => (
                <DropdownMenuItem key={status.id}>
                  <form action={updateInvoiceAction}>
                    <input type="hidden" name="id" value={invoiceId} />
                    <input type="hidden" name="status" value={status.id} />
                    <button>{status.label}</button>
                  </form>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-3xl mb-3">$ {(invoice.value / 100).toFixed(2)}</p>
        <p className="text-lg mb-8"></p>
        <h2 className="font-bold text-lg mb-4">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Id
            </strong>
            <span>{invoiceId}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span></span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
