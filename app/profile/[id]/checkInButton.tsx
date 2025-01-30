"use client";

import { checkInUser } from "@/app/actions";

export const CheckInButton: React.FC<{ id: number }> = ({ id }) => {
  const checkIn = async () => {
    await checkInUser(id);
  };
  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full rounded"
      onClick={checkIn}
    >
      Check in!
    </button>
  );
};

export default CheckInButton;
