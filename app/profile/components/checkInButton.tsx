"use client";

export const CheckInButton: React.FC<{ id: string }> = () => {
  return (
    <button className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-6 w-full rounded">
      Check in!
    </button>
  );
};

export default CheckInButton;
