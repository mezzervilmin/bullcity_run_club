"use server";
import { prisma } from "@/lib/prisma";
import { SignUpInfo } from "@/sign-up/page";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { json2csv } from "json-2-csv";
import { redirect } from "next/navigation";
import { createTransport } from "nodemailer";

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
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
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
      phone: true,
      emergencyContactName: true,
      emergencyContactNumber: true,
      code: true,
      email: true,
      shirtSize: true,
      visits: true,
    },
  });

  const csv = await json2csv(users);
  return { error: false, file: csv };
};

export const linkEmailToBarcode = async (email: string, code: string) => {
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        code: parseInt(code),
      },
    });
    revalidatePath(`/profile`);
    return { error: false };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
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

export const userAcceptWaiver = async () => {
  const session = await auth();
  const requestMaker = session?.user as User;

  if (!requestMaker) {
    redirect("/sign-in");
  }
  const user = await prisma.user.update({
    where: {
      id: requestMaker.id,
    },
    data: {
      acceptWaiver: true,
    },
  });
  if (!user) {
    return "Issue accepting waiver, please speak to Run Club employee";
  }
};

export const clearVisits = async () => {
  const session = await auth();
  const requestMaker = session?.user as User;

  if (requestMaker.role !== "ADMIN") {
    return { error: "Not allowed!" };
  }
  try {
    await prisma.user.updateMany({
      data: {
        visits: 0,
      },
    });
    return { error: null };
  } catch {
    return { error: "Error resetting visits." };
  }
};

export const sendPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return;
  }
  const transporter = createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });
  transporter.sendMail(
    {
      from: "bcrcdowntown@bullcityrunning.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `
    <p>Hi, ${user.firstName},</p>
    <p>Here's your password recovery link</p>
    <a href="https://runclub.bullcityrunning.com/reset-password/${user.id}">Reset password here</a>
    <p>Love, Bull City Running Co</p>
  `,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

export const resetPassword = async (id: string, password: string) => {
  const hashedPassword = hashSync(password, 12);
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: { password: hashedPassword },
    });
  } catch {
    return {
      error: "Error with reset, please speak to run club employee.",
    };
  }
};
