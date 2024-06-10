"use client";
import ApplicationLogo from "@/components/application/application-logo";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { successToast } from "@/utils/success-toast";
import { errorToast } from "@/utils/error-toast";
import FormInput from "@/components/application/form-input";
import Loading from "@/components/application/loading";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/login";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const axios = require("axios");
    let config = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        secret_key: process.env.NEXT_PUBLIC_SECRET_KEY,
      },
      data: JSON.stringify({
        email: email,
        password: password,
        device_token: crypto.randomUUID(),
      }),
    };

    // Start Loading Process
    setLoading(true);

    // Make Request
    try {
      const response = await axios.request(config);
      const userData = JSON.stringify(response.data.data);
      Cookies.set("analogueshifts", userData);
      successToast("Login Successful", "Redirecting You to your dashboard.");

      // Redirect To Dashboard
      window.location.href = "";
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Uh oh! Something went wrong.",
        error?.response?.data?.message || error.message || "Failed To Login"
      );
    }
  };

  return (
    <main className="w-full h-max min-h-screen mx-auto flex justify-center items-center px-5 py-10">
      {loading && <Loading />}
      <section className="max-w-full lg:w-[1000px] md:w-[800px]  flex justify-center items-center">
        <div className="lg:w-[450px] md:w-[350px] flex flex-col items-center">
          <ApplicationLogo />
          <form onSubmit={handleSubmit} className="pt-11 w-full flex flex-col">
            <p className="font-medium text-lg text-content-grayText pb-4">
              Welcome!
            </p>
            <p className="font-bold text-3xl text-[#292929] pb-5">
              Sign Into Your Account
            </p>

            <FormInput
              icon={
                <Mail
                  width={18}
                  className="absolute left-5  text-base text-gray-400"
                />
              }
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter Email"
              value={email}
            />

            <FormInput
              icon={
                <Lock
                  width={18}
                  className="absolute left-5  text-base text-gray-400"
                />
              }
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter Password"
              value={password}
            />

            <button
              type="submit"
              className="w-full bg-background-lightYellow font-semibold text-base text-[#FDFAEF] flex items-center justify-center hover:bg-background-lightYellow/80 duration-300 h-12 rounded-2xl "
            >
              Login
            </button>
            <div className="w-full pt-4 flex justify-center items-center gap-1">
              <Link
                href="https://www.analogueshifts.com/forgot-password"
                className="font-normal cursor-pointer text-sm text-black/90"
              >
                Forgotten Password?
              </Link>
            </div>
            <div className="w-full pt-2 flex justify-center items-center gap-1">
              <p className="font-normal text-sm text-black/90">
                Don&apos;t have an account?
              </p>
              <Link
                href="/register"
                className="font-normal text-sm text-background-lightYellow"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
