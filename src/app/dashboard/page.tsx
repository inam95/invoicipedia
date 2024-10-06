import { Container } from "@/components/container";
import { InvoiceStatusBadge } from "@/components/invoice-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const results = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.userId, userId));
  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p>
            <Button className="inline-flex gap-2" variant="ghost" asChild>
              <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="p-0 font-medium text-left">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="font-semibold p-4 block"
                  >
                    {new Date(invoice.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-left">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="font-semibold p-4 block"
                  >
                    John Doe
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-left">
                  <Link className="p-4 block" href={`/invoices/${invoice.id}`}>
                    john@something.com
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-center">
                  <Link className="p-4 block" href={`/invoices/${invoice.id}`}>
                    <InvoiceStatusBadge status={invoice.status} />
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-right">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="font-semibold p-4 block"
                  >
                    $ {(invoice.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
