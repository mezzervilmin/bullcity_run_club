"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { openSans } from "@/app/fonts";
import { linkEmailToBarcode } from "@/app/actions";
import { useState } from "react";
import { Spinner } from "./spinner";

type Inputs = {
  email: string;
  code: string;
};

export const LinkBarcodeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async ({ email, code }) => {
    setLoading(true);
    const { error } = await linkEmailToBarcode(email, code);
    setLoading(false);
    if (error) {
      setErrorMessage(`${error}`);
    } else {
      // clear inputs
      setFocus("code");
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mb-4 w-full ${openSans.className}`}
      autoComplete="off"
    >
      <div className="mb-2">
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
            required: true,
          })}
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="code"
        >
          Run club code
        </label>
        <input
          {...register("code", { required: true })}
          id="code"
          type="text"
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.code && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div className="mt-4">
        {errorMessage && (
          <div className="text-red-500 mb-2">
            <span>{errorMessage}</span>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 w-full rounded"
        >
          {loading ? <Spinner /> : "Link account"}
        </button>
      </div>
    </form>
  );
};
