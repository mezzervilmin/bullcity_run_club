"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { openSans } from "@/app/fonts";
import { checkInUser } from "@/app/actions";
import { useState } from "react";
import { Spinner } from "./spinner";

type Inputs = {
  email: string;
  code: string;
};

export const CheckInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, code }) => {
    setLoading(true);
    const { error } = await checkInUser(code, email);
    setLoading(false);
    if (error) {
      //   setErrorMessage(`${error}`);
    } // clear input
    else {
      // clear inputs
      setFocus("code");
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mb-4 w-full ${openSans.className}`}
    >
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="code"
        >
          Run club code
        </label>
        <input
          {...register("code")}
          id="code"
          type="text"
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.code && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="uppercase text-center">or</div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          {...register("email", {
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
  );
};
