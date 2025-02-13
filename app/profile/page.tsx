import { auth } from "@/auth";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { UserProfile } from "./userProfile";
import { AdminProfile } from "./adminProfile";

export default async function Profile() {
  const session = await auth();
  const user = session?.user as User;

  if (!session) {
    redirect("/sign-in");
  }

  return user.role === "USER" ? (
    <UserProfile user={user} />
  ) : (
    <AdminProfile user={user} />
  );
}
