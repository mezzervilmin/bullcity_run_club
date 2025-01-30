"use server";
import { prisma } from "@/lib/prisma";
import { SignUpInfo } from "@/sign-up/page";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const addUser = async (newUser: SignUpInfo) => {
  const user = await prisma.user.create({
    data: { ...newUser },
  });
  redirect(`/profile/${user.id}`);
};

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return null;
  }
  return user;
};

export const getByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return "Email not found";
  }
  redirect(`/profile/${user?.id}`);
};

export const checkInUser = async (id: number) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      visits: {
        increment: 1,
      },
      lastCheckIn: new Date(),
    },
  });
  if (!user) {
    return "Issue checking in, please speak to Run Club employee";
  }
  revalidatePath(`/profile/${user.id}`);
};
