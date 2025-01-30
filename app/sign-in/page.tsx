"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { getByEmail } from "../actions";
import { openSans, poppinsHeavy } from "../fonts";

type Inputs = {
  email: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //   const [errorMessage, setErrorMessage] = useState("");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await getByEmail(data.email);
    // setErrorMessage(res);
  };
  return (
    <div className="flex flex-col items-center h-screen mt-64 lg:mt-16 mx-4 lg:w-1/2 lg:mx-auto">
      <div className={`text-7xl mb-8 ${poppinsHeavy.className}`}>Sign In</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mb-4 w-3/4 lg:w-1/3 ${openSans.className}`}
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
          <input
            type="submit"
            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 w-full rounded"
          />
        </div>
      </form>
    </div>
  );
}
