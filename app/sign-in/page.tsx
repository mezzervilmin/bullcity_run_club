"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  clubNumber: number;
};

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="mx-4 lg:w-1/2 lg:mx-auto">
      <div className="text-7xl mb-8">Sign In</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="clubNumber"
          >
            Last name
          </label>
          <input
            {...register("clubNumber", { required: true })}
            id="clubNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.clubNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mt-8">
          <input
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
