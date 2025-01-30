"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { addUser } from "../actions";

export type SignUpInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  shirtSize: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInfo>();
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const onSubmit: SubmitHandler<SignUpInfo> = async (data) => {
    await addUser({ ...data, dob: new Date(data.dob) });
  };

  const openDisclaimer = () => {
    // alert(
    //   `As a participant in Bull City Run Club (the event),
    // I do hereby waive and forever release any and all rights and claims for damages
    // or injuries that I may have against the Bull City Running Company LLC and all of their
    // agents assisting with the event, sponsors and their representatives, volunteers and
    // employees for any and all injuries to me or my personal property. This release includes
    // all injuries and/or damages suffered by me before, during, or after participating in the event.
    // I recognize, intend and understand that this release is binding on my heirs, executors,
    // administrators, or assignees. I know that running and walking is a potentially
    // hazardous activity. I should not participate unless I am medically able to do so and
    // properly trained. I assume all risks associated with walking and  running in this
    // event including, but not limited to: falls, contact with other participants, the
    // effects of weather, traffic, and route conditions, man-made and natural hazards,
    // and I waive any and all claims which I might have based on any of those and other
    // risks typically found in walking or running on roads, sidewalks, and trails.
    // I acknowledge all such risks and they are known and understood by me.`
    // );
    setDisclaimerAccepted(true);
  };
  return (
    <div className="mx-4 lg:w-1/2 lg:mx-auto">
      <div className="text-6xl my-8 mx-auto w-fit">Sign up</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
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

          <div className="mt-5">
            <button
              onClick={openDisclaimer}
              className="bg-red-500 hover:bg-red-700 text-white font-bold h-full px-4 rounded"
            >
              Waiver Agreement
            </button>
          </div>
        </div>
        <div className="mt-8">
          <input
            type="submit"
            className={classNames(
              "bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full rounded",
              { "opacity-50 cursor-not-allowed": !disclaimerAccepted }
            )}
          />
        </div>
      </form>
    </div>
  );
}
