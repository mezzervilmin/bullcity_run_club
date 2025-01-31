import { getUser } from "@/app/actions";
import CheckInButton from "./checkInButton";
import { poppinsHeavy } from "@/app/fonts";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
    <div
      className={`mx-4 flex flex-col items-center h-screen ${poppinsHeavy.className}`}
    >
      <div className="my-auto">
        <div className="text-4xl whitespace-pre-line text-center">{`Welcome back,\n${user?.firstName}`}</div>
        <div className="flex flex-col justify-center items-center text-center mt-8">
          <div className="w-fit text-8xl text-blue-800">{user?.visits}</div>
          <div className="w-fit text-3xl mt-2">Run count (so far...)</div>
        </div>
        {new Date().getDay() === 4 && user?.id && !checkedInToday() && (
          <div className="mt-8 w-full">
            <CheckInButton id={user.id} />
          </div>
        )}
      </div>
    </div>
  );
}
