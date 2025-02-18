"use client";
import { signOutUser } from "@/app/actions";

export const SignOutButton = () => {
  return (
    <button
      onClick={signOutUser}
      className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold p-2 rounded"
    >
      Log out
    </button>
  );
};
