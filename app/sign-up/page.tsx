"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { addUser } from "../actions";
import { openSans, poppinsHeavy } from "../fonts";
import { useState } from "react";

export type SignUpInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  shirtSize: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInfo>();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<SignUpInfo> = async (data) => {
    const res = await addUser({ ...data, dob: new Date(data.dob) });
    if (res) {
      setErrorMessage(res);
    }
  };
  return (
    <div className="mx-4 lg:w-1/2 lg:mx-auto">
      <div className={`text-6xl my-4 mx-auto w-fit ${poppinsHeavy.className}`}>
        Sign up
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${openSans.className}`}
      >
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First name
          </label>
          <input
            {...register("firstName", { required: true })}
            id="firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last name
          </label>
          <input
            {...register("lastName", { required: true })}
            id="lastName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone number
          </label>
          <input
            {...register("phone", { required: true })}
            type="tel"
            id="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phone && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dob"
          >
            Date of birth
          </label>
          <input
            {...register("dob", { required: true })}
            type="date"
            id="dob"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dob && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
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
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="shirtSize"
          >
            Shirt size
          </label>
          <select
            {...register("shirtSize", { required: true })}
            id="shirtSize"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="xsmall">x-small</option>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
            <option value="xlarge">x-large</option>
            <option value="xxlarge">xx-large</option>
          </select>
          {errors.shirtSize && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mt-4">
          <input
            type="submit"
            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-6 w-full rounded"
          />
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        </div>
      </form>
    </div>
  );
}
