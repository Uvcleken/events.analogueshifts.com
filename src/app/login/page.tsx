import AuthenticationLayout from "@/components/application/layouts/authentication";
import LoginForm from "./components/login-form";

export default function Page() {
  return (
    <AuthenticationLayout>
      <LoginForm />
    </AuthenticationLayout>
  );
}
