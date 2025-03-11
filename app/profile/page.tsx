import { auth } from "@/auth";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { UserProfile } from "./userProfile";
import { AdminProfile } from "./adminProfile";
import { SignOutButton } from "./components/signOutButton";

export default async function Profile() {
  const session = await auth();
  const user = session?.user as User;

  if (!session) {
    redirect("/sign-in");
  }
  if (!user.acceptWaiver) {
    redirect("/waiver");
  }

  return (
    <div>
      <div className="ml-auto mr-4 w-fit mt-4">
        <SignOutButton />
      </div>
      {user.role === "USER" ? (
        <UserProfile user={user} />
      ) : (
        <AdminProfile user={user} />
      )}
    </div>
  );
}
