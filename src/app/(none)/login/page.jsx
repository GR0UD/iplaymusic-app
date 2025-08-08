import Intro from "@/components/intro";
import LoginForm from "@/components/loginForm";
import "@/styles/pages/_login.scss";

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
