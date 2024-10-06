import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container } from "@/components/container";
import Link from "next/link";

export function Header() {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center">
          <p className="font-bold">
            <Link href="/dashboard">Invoicipedia</Link>
          </p>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Container>
    </header>
  );
}
