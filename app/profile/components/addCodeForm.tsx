"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { openSans } from "@/app/fonts";
import { linkEmailToBarcode } from "@/app/actions";
import { User } from "@prisma/client";
import { Spinner } from "./spinner";

type Inputs = {
  code: string;
};

export const AddCodeForm: React.FC<{ user: User }> = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async ({ code }) => {
    setLoading(true);
    const { error } = await linkEmailToBarcode(user.email, code);
    setLoading(false);
    if (error) {
      setErrorMessage(`${error}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mb-4 w-full ${openSans.className}`}
      autoComplete="off"
    >
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="code"
        >
          Code
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
          {loading ? <Spinner /> : "Link your existing code"}
        </button>
      </div>
    </form>
  );
};
