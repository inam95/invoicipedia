"use client";

import { createInvoiceAction } from "@/app/action";
import { Container } from "@/components/container";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import { SyntheticEvent, useState } from "react";

export default function NewInvoicePage() {
  const [state, setState] = useState("ready");

  const handleSubmit = async (event: SyntheticEvent) => {
    if (state === "pending") {
      event.preventDefault();
      return;
    }
    setState("pending");
  };

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
        </div>
        <Form
          action={createInvoiceAction}
          onSubmit={handleSubmit}
          className="grid gap-4 max-w-sm"
        >
          <div>
            <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
              Billing Name
            </Label>
            <Input type="text" name="name" id="name" />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
              Billing Email
            </Label>
            <Input type="email" name="email" id="email" />
          </div>
          <div>
            <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
              Value
            </Label>
            <Input type="text" name="value" id="value" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block mb-2 font-semibold text-sm"
            >
              Description
            </Label>
            <Textarea name="description" id="description" />
          </div>
          <div>
            <SubmitButton />
          </div>
        </Form>
      </Container>
    </main>
  );
}
