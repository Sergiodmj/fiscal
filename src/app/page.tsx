"use client";
import SignInForm from "@/components/Authentication/SignInForm";
import { signIn } from "next-auth/react";

export default function Home() {
  // async function login(e: React.FormEvent<HTMLFormElement>) {
  //   const formData = new FormData(e.currentTarget);
  //   e.preventDefault();

  //   const data = {
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   };

  //   // console.log(data)

  //   signIn("credentials", {
  //     ...data,
  //     callbackUrl: "/page/home",
  //   });
  // }
  return (
    <>
      <div className="fp-wrapper">
        {/* <form onSubmit={login}>
          <input type="text" name="email" id="email"></input>
          <input type="text" name="password" id="password"></input>
          <button type="submit">Login</button>
        </form> */}
        <SignInForm />
      </div>
    </>
  );
}
