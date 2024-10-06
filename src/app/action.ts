"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
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
