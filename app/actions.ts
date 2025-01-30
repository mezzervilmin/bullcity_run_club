"use server";
import { prisma } from "@/lib/prisma";
import { SignUpInfo } from "@/sign-up/page";
import { redirect } from "next/navigation";

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
