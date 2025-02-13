import { poppinsHeavy } from "@/app/fonts";
import { User } from "@prisma/client";

export const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div
      className={`mx-4 flex flex-col items-center h-screen ${poppinsHeavy.className}`}
    >
      <div className="my-auto">
        <div className="text-4xl whitespace-pre-line text-center">{`Welcome back,\n${user?.firstName}`}</div>
        <div className="flex flex-col justify-center items-center text-center mt-8">
          <div className="w-fit text-8xl text-blue-800">{user?.visits}</div>
          <div className="w-fit text-3xl mt-2">Run count (so far...)</div>
        </div>
      </div>
    </div>
  );
};
