"use server";

import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createInvoiceAction(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = String(formData.get("description"));

  const results = await db
    .insert(Invoices)
    .values({
      description,
      value,
      status: "open",
      userId,
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
}

export async function updateInvoiceAction(formData: FormData) {
  console.log("updateInvoiceAction");
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  const result = await db
    .update(Invoices)
    .set({
      status,
    })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  console.log("result", result);
}
