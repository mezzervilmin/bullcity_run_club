import { getUser } from "@/app/actions";
import CheckInButton from "./checkInButton";

export const Profile = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const user = await getUser(parseInt(id));
  const checkedInToday = () => {
    if (!user?.lastCheckIn) {
      return false;
    }
    const today = new Date();
    const lastCheckIn = new Date(user.lastCheckIn);

    return (
      today.getFullYear() === lastCheckIn.getFullYear() &&
      today.getMonth() === lastCheckIn.getMonth() &&
      today.getDate() === lastCheckIn.getDate()
    );
  };

  return (
    <div className="mx-4 flex flex-col items-center h-screen mt-48">
      <div className="text-4xl">{`Welcome back ${user?.firstName}`}</div>
      <div className="flex flex-col justify-center items-center mt-12">
        <div className="w-fit text-7xl">{user?.visits}</div>
        <div className="w-fit text-2xl">Number of runs</div>
      </div>
      {new Date().getDay() === 3 && user?.id && !checkedInToday() && (
        <div className="mt-8 w-full">
          <CheckInButton id={user.id} />
        </div>
      )}
    </div>
  );
};

export default Profile;
