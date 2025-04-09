"use client";
import { getBirthdays } from "@/app/actions";
import { useState } from "react";
import { Spinner } from "./spinner";
import BirthdayModal from "./birthdaysModal";
import { User } from "@prisma/client";

export const BirthdaysButton = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [birthdays, setBirthdays] = useState<User[] | undefined>();

  const onOpen = async () => {
    setLoading(true);

    const birthdaysQuery = await getBirthdays();
    setBirthdays(birthdaysQuery.users as User[]);

    setOpenModal(true);
    setLoading(false);
  };
  return (
    <>
      <button
        onClick={onOpen}
        className="bg-purple-500 hover:bg-purple-800 text-white font-bold p-4 rounded"
      >
        {loading ? <Spinner /> : "Birthdays"}
      </button>
      <BirthdayModal
        isOpen={openModal}
        toClose={() => setOpenModal(false)}
        birthdays={birthdays}
      />
    </>
  );
};
export default BirthdaysButton;
