import { Container } from "@/components/container";

export function Footer() {
  return (
    <footer className="mt-6 mb-8">
      <Container className="flex justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Invoicipedia. All rights reserved.
        </p>
        <p>Created by Inamul Hassan with Next.js, Xata, and Clerk.</p>
      </Container>
    </footer>
  );
}
