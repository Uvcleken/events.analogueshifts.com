"use client";
import ApplicationLogo from "@/components/application/application-logo";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Loading from "@/components/application/loading";
import FormInput from "@/components/application/form-input";
import { successToast } from "@/utils/success-toast";
import { errorToast } from "@/utils/error-toast";
import { Mail, Lock, Text } from "lucide-react";
import Group from "@/assets/images/login/group.png";
import Avatar from "@/assets/images/login/avatar.png";
import Image from "next/image";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/register";
    const axios = require("axios");
    let config = {
      method: "POST",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        secret_key: process.env.NEXT_PUBLIC_SECRET_KEY,
      },
      data: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: confirm_password,
        device_token: crypto.randomUUID(),
      }),
    };

    if (password !== confirm_password) {
      errorToast("Bad Input", "Password Must Match with Confirm Password");
      return;
    }

    // Start Loading Process
    setLoading(true);

    // Make Request
    try {
      const response = await axios.request(config);

      if (response.data[0].status) {
        const userData = JSON.stringify(response.data[0].data);
        Cookies.set("analogueshifts", userData);
        successToast(
          "Account Created Successfully",
          "Redirecting You to your dashboard."
        );

        // Redirect To Dashboard
        window.location.href = "";
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Uh oh! Something went wrong.",
        error?.response?.data?.message || error.message || "Failed To Login"
      );
    }
  };

  return (
    <>
      {loading && <Loading />}
      <main className="w-full h-max min-h-screen mx-auto flex justify-center items-center px-5 py-10">
        <section className="max-w-full lg:w-[1000px] md:w-[800px] md:flex-row flex-col flex justify-between items-center">
          <div className="hidden md:flex"></div>
          <div className="w-max h-screen top-0 items-center justify-center fixed hidden md:flex">
            <div className="lg:w-[450px] md:w-[350px] relative flex  justify-center items-center">
              <Image src={Group} alt="" className="absolute" />
              <Image src={Avatar} alt="" />
            </div>
          </div>
          <div className="lg:w-[450px] md:w-[350px] flex flex-col">
            <ApplicationLogo />
            <form
              onSubmit={handleSubmit}
              className="pt-11 w-full flex flex-col"
            >
              <p className="font-medium text-lg text-content-grayText pb-4">
                Welcome!
              </p>
              <p className="font-bold text-3xl text-[#292929] pb-5">
                Join our Community
              </p>
              <FormInput
                icon={<Text width={17} />}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                label="First Name"
                placeholder="First Name"
                value={firstName}
              />
              <FormInput
                icon={<Text width={17} />}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
              />
              <FormInput
                icon={<Mail width={17} />}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder="Enter Email"
                value={email}
              />
              <FormInput
                icon={<Lock width={17} />}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Enter Password"
                value={password}
              />
              <FormInput
                icon={<Lock width={17} />}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                placeholder="Enter Password"
                value={confirm_password}
              />
              <button
                type="submit"
                className="w-full bg-background-darkYellow font-semibold text-base text-[#FDFAEF] flex items-center justify-center hover:bg-background-darkYellow/80 duration-300 h-12 rounded-2xl "
              >
                Sign Up
              </button>
              <div className="w-full pt-4 flex justify-center items-center gap-1">
                <p className="font-normal text-sm text-black/90">
                  Already have an account?
                </p>
                <Link
                  href="/login"
                  className="font-normal text-sm text-background-darkYellow"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
