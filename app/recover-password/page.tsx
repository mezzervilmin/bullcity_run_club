"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { openSans, poppinsHeavy } from "../fonts";
import { sendPasswordReset } from "../actions";
import { useRouter } from "next/navigation";
import { Spinner } from "./components/spinner";

type Inputs = {
  email: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    setLoading(true);
    await sendPasswordReset(email);
    setLoading(false);
    router.push("/reset-password-sent");
  };
  return (
    <div className="flex flex-col items-center h-screen mx-4 lg:w-1/2 lg:mx-auto">
      <div className="my-auto w-4/5">
        <div className={`text-7xl mb-8 text-center ${poppinsHeavy.className}`}>
          Reset Password
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
      </div>
    </div>
  );
}
