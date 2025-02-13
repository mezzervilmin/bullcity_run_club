"use client";

import { checkInUser } from "@/app/actions";

export const CheckInButton: React.FC<{ id: string }> = ({ id }) => {
  const checkIn = async () => {
    await checkInUser(id);
  };
  return (
    <button
      className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-6 w-full rounded"
      onClick={checkIn}
    >
      Check in!
    </button>
  );
};

export default CheckInButton;
