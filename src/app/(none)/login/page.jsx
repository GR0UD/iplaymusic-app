import Intro from "@/components/intro";
import LoginForm from "@/components/loginForm";

export default function HomePage() {
  return (
    <>
      <Intro />
      <main className='login'>
        <LoginForm />
      </main>
    </>
  );
}
