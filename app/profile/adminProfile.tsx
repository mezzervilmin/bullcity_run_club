"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { poppinsHeavy, openSans } from "@/app/fonts";
import { User } from "@prisma/client";
import { checkInUser } from "../actions";

type Inputs = {
  email: string;
  code: string;
};

export const AdminProfile: React.FC<{ user: User }> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, code }) => {
    console.log(`This is code ${code} and this is email ${email}`);
    const { error } = await checkInUser(code, email);
    if (error) {
      //   setErrorMessage(`${error}`);
    } // clear input
  };

  return (
    <div
      className={`mx-4 flex items-center h-screen ${poppinsHeavy.className}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mb-4 lg:w-1/3 ${openSans.className}`}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.code && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
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
          <input
            type="submit"
            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 w-full rounded"
          />
        </div>
      </form>
    </div>
  );
};
