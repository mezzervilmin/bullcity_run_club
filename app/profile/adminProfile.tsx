import { poppinsHeavy } from "@/app/fonts";
import { User } from "@prisma/client";
import { CheckInForm } from "./components/checkInForm";
import { CheckedInUserTable } from "./components/checkedInUserTable";
import { CSVDownloadButton } from "./components/csvDownloadButton";
import { getCheckedInUsers } from "../actions";

export const AdminProfile: React.FC<{ user: User }> = async () => {
  const checkedInUsers = await getCheckedInUsers();
  return (
    <div className={`mt-8 ${poppinsHeavy.className}`}>
      <div className="text-4xl w-fit mx-auto text-blue-800">
        Run Club Admin Panel
      </div>
      <div className="mx-auto w-3/4 grid grid-cols-2 h-screen justify-center">
        <div className="flex flex-col justify-center">
          <CheckInForm />
          <CSVDownloadButton />
        </div>
        <div className="h-screen mt-8">
          <div className="text-2xl text-center mb-4">{`${checkedInUsers.users.length} runners currently checked in`}</div>
          <div className="mt-8 h-[80%] overflow-y-auto">
            <div>
              <CheckedInUserTable users={checkedInUsers.users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
