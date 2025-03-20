"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetPassword } from "@/app/actions";
import { openSans, poppinsHeavy } from "@/app/fonts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./spinner";

export type ResetInfo = {
  password: string;
  confirmPassword: string;
};

export default function SubmitForm({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetInfo>();

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ResetInfo> = async ({ password }) => {
    setLoading(true);
    const res = await resetPassword(id, password);
    setLoading(false);
    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <div className="my-auto w-4/5">
      <div className={`text-7xl mb-8 text-center ${poppinsHeavy.className}`}>
        Reset Password
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${openSans.className}`}
      >
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            New Password
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
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do not match";
                }
              },
            })}
            id="confirmPassword"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message ?? "This field is required"}
            </span>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-6 w-full rounded"
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        </div>
      </form>
    </div>
  );
}
