import { Container } from "@/components/container";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Container className="flex justify-center">
      <SignUp />
    </Container>
  );
}
