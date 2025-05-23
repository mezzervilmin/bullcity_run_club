"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { openSans, poppinsHeavy } from "../fonts";
import Link from "next/link";
import { signInUser } from "../actions";
import { useRouter } from "next/navigation";
import { Spinner } from "./components/spinner";

type Inputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setLoading(true);
    const { error } = await signInUser(email, password);
    setLoading(false);
    if (error) {
      setErrorMessage(`${error}`);
    } else {
      router.push("/profile");
    }
  };
  return (
    <div className="flex flex-col items-center h-screen mx-4 lg:w-1/2 lg:mx-auto">
      <div className="my-auto w-4/5">
        <div className={`text-7xl mb-8 text-center ${poppinsHeavy.className}`}>
          Sign In
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`mb-4 ${openSans.className}`}
        >
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Must be valid email format",
                },
              })}
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {errorMessage && (
              <div className="text-red-500">
                <span>{`${errorMessage} Sign up `}</span>
                <Link href="/sign-up" className="text-blue-800 underline">
                  here!
                </Link>
              </div>
            )}
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 w-full rounded"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </form>
        <div className={`${openSans.className}`}>
          <span>{`Don't have an account on the new app yet? `}</span>
          <Link href="/sign-up" className="text-blue-800 underline">
            Sign up here!
          </Link>
        </div>
        <div className={`${openSans.className} mt-2`}>
          <span>{`Forgot your password? `}</span>
          <Link href="/recover-password" className="text-blue-800 underline">
            Reset it here!
          </Link>
        </div>
      </div>
    </div>
  );
}
