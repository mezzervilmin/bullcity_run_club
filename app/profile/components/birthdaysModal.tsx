import { openSans } from "@/app/fonts";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { User } from "@prisma/client";

type ComponentProps = {
  isOpen: boolean;
  toClose: () => void;
  birthdays?: User[];
};

export default function BirthdayModal({
  isOpen,
  toClose,
  birthdays,
}: ComponentProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={toClose}
      className={`relative z-10 ${openSans.className}`}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-bold text-gray-900"
                  >
                    BIRTHDAYS!!!
                  </DialogTitle>
                  <div className="mt-2">
                    <table>
                      <tbody>
                        {birthdays?.map((birthday) => {
                          const birthDate = new Date(birthday.dob || "");
                          return (
                            <tr key={birthday.code}>
                              <td>
                                {`${birthday?.firstName} ${birthday?.lastName}`}
                              </td>
                              <td className="pl-4">{`${
                                birthDate.getMonth() + 1
                              }/${birthDate.getDate()}`}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
