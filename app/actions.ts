"use server";
import { prisma } from "@/lib/prisma";
import { SignUpInfo } from "@/sign-up/page";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { json2csv } from "json-2-csv";

export const addUser = async (newUser: SignUpInfo) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...user } = newUser;
  const hashedPassword = hashSync(user.password, 12);
  try {
    await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Email already in use",
        };
      } else {
        return {
          error: "Error with sign up, please speak to run club employee.",
        };
      }
    }
    throw e;
  }
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

export const signOutUser = async () => {
  await signOut({ redirectTo: "/", redirect: true });
};

export const checkInUser = async (code: string, email: string) => {
  const session = await auth();
  const requestMaker = session?.user as User;
  if (requestMaker.role !== "ADMIN") {
    return { error: "Not allowed!" };
  }
  try {
    if (code) {
      await prisma.user.update({
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
      await prisma.user.update({
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
    revalidatePath(`/profile`);
    return {
      error: false,
    };
  } catch {
    return {
      error: "Issue checking in member. Try again",
    };
  }
};

export const getCheckedInUsers = async () => {
  const session = await auth();
  const requestMaker = session?.user as User;

  if (requestMaker.role !== "ADMIN") {
    return { error: "Not allowed!", users: [] };
  }
  const users = await prisma.user.findMany({
    where: {
      lastCheckIn: {
        gte: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      visits: true,
    },
  });
  return { error: false, users };
};

export const getMemberCSV = async () => {
  const session = await auth();
  const requestMaker = session?.user as User;

  if (requestMaker.role !== "ADMIN") {
    return { error: "Not allowed!", file: null };
  }
  const users = await prisma.user.findMany({
    where: {
      visits: {
        gt: 0,
      },
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      shirtSize: true,
      visits: true,
    },
  });

  const csv = await json2csv(users);
  return { error: false, file: csv };
};

export const linkEmailToBarcode = async (email: string, code: string) => {
  const session = await auth();
  const requestMaker = session?.user as User;

  if (requestMaker.role !== "ADMIN") {
    return { error: "Not allowed!", file: null };
  }
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        code: parseInt(code),
      },
    });

    return { error: false };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return {
          error: "Code already in use",
        };
      } else {
        return {
          error: "Email not found",
        };
      }
    }
    throw e;
  }
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
  redirect(`/profile`);
};
