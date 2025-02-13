"use server";
import { prisma } from "@/lib/prisma";
import { SignUpInfo } from "@/sign-up/page";
import { redirect } from "next/navigation";
import { hashSync } from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

export const addUser = async (newUser: SignUpInfo) => {
  const hashedPassword = hashSync(newUser.password, 12);

  const user = await prisma.user.create({
    data: { ...newUser, password: hashedPassword },
  });
  if (!user) {
    return "Issue creating user. Please speak to Run Club Employee.";
  }
  redirect(`/profile`);
};

export const signInUser = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return {
      error: false,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
};

// export const checkInUser = async (id: string) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (!user) {
//     return null;
//   }
//   return user;
// };

export const checkInUser = async (code: string, email: string) => {
  let user;
  if (code) {
    user = await prisma.user.update({
      where: {
        code: parseInt(code),
      },
      data: {
        visits: {
          increment: 1,
        },
        lastCheckIn: new Date(),
      },
    });
  } else {
    user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        visits: {
          increment: 1,
        },
        lastCheckIn: new Date(),
      },
    });
  }
  if (!user) {
    return { error: "Issue checking in member. Try again" };
  }

  revalidatePath(`/profile`);
  return {
    error: false,
  };
};

export const userAcceptWaiver = async (id: string) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      acceptWaiver: true,
    },
  });
  if (!user) {
    return "Issue accepting waiver, please speak to Run Club employee";
  }
  redirect(`/profile/${user.id}`);
};
