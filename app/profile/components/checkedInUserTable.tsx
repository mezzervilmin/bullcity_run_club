"use client";
import { User } from "@prisma/client";
import UserInfoModal from "./userInfoModal";
import { useState } from "react";

const KEYS = ["firstName", "lastName", "visits"] as const;
const HEADERS = ["First name", "Last name", "Total visits"];

export const CheckedInUserTable: React.FC<{
  users: User[];
}> = ({ users }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
    setUserInfo(null);
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            {HEADERS.map((column) => {
              return (
                <th
                  key={column}
                  className="py-1 border-b-[1px] border-blue-800"
                >
                  {column}
                </th>
              );
            })}
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                {KEYS.map((column) => {
                  return (
                    <td key={column} className="py-1 text-center">
                      {user[column]}
                    </td>
                  );
                })}
                <td>
                  <button
                    onClick={() => {
                      setModalIsOpen(true);
                      setUserInfo(user);
                    }}
                    className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-bold py-1 px-4 rounded"
                  >
                    Info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <UserInfoModal
        isOpen={modalIsOpen}
        memberInfo={userInfo}
        toClose={closeModal}
      />
    </>
  );
};
