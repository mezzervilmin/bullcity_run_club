import { poppinsHeavy } from "@/app/fonts";
import { User } from "@prisma/client";
import { SignInBarcode } from "./components/barcode";
import { AddCodeForm } from "./components/addCodeForm";

export const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div
      className={`mx-4 flex flex-col items-center h-screen ${poppinsHeavy.className}`}
    >
      <div className="my-auto">
        <div className="text-4xl whitespace-pre-line text-center">{`Welcome back,\n${user?.firstName}`}</div>
        {user.code ? (
          <div className="mt-8">
            <SignInBarcode code={`${user.code}`} />
          </div>
        ) : (
          <div className="my-12">
            <AddCodeForm user={user} />
            <div>
              {`Don't have a barcode yet? See the check in desk to finalize your
              registration!`}
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center items-center text-center mt-8">
          <div className="w-fit text-8xl text-blue-800">{user?.visits}</div>
          <div className="w-fit text-3xl mt-2">Run count (so far...)</div>
        </div>
      </div>
    </div>
  );
};
