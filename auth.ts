import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { ZodError } from "zod";
import { encode } from "next-auth/jwt";
import { randomUUID } from "crypto";
import { z } from "zod";

class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

const loginSchema = z.object({
  email: z.string().email("Email is invalid").default(""),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .default(""),
});

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const adapter = PrismaAdapter(prisma);

  return {
    adapter,
    providers: [
      CredentialsProvider({
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
        },

        authorize: async (credentials) => {
          try {
            const result = await loginSchema.parseAsync(credentials);
            const { email, password } = result;
            const user = await prisma.user.findUnique({
              where: {
                email,
              },
            });

            if (!user) {
              throw new InvalidLoginError("User account does not exist");
            }
            if (user.password) {
              // need to add logic for setting password
              const passwordsMatch = await compare(password, user?.password);

              if (!passwordsMatch) {
                throw new InvalidLoginError("Password is not correct");
              }
            }

            return user as User;
          } catch (error) {
            if (
              error instanceof Prisma?.PrismaClientInitializationError ||
              error instanceof Prisma?.PrismaClientKnownRequestError
            ) {
              throw new InvalidLoginError(
                "System error. Please contact support"
              );
            }

            if (error instanceof ZodError) {
              throw new InvalidLoginError(error.errors[0].message);
            }

            throw error;
          }
        },
      }),
    ],

    secret: process.env.AUTH_SECRET!,

    callbacks: {
      async jwt({ token, user, account }) {
        if (account?.provider === "credentials") {
          const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
          const sessionToken = randomUUID();

          const session = await adapter.createSession!({
            userId: user.id!,
            sessionToken,
            expires,
          });

          token.sessionId = session.sessionToken;
        }

        return token;
      },
    },
    jwt: {
      maxAge: 60 * 60 * 24 * 30,
      async encode(arg) {
        return (arg.token?.sessionId as string) ?? encode(arg);
      },
    },
    pages: {
      error: "/sign-in",
      signIn: "/sign-in",
      newUser: "/sign-up",
    },
    debug: process.env.NODE_ENV === "development",
    trustHost: true,
    events: {
      async signOut(message) {
        if ("session" in message && message.session?.sessionToken) {
          await prisma.session.deleteMany({
            where: {
              sessionToken: message.session?.sessionToken,
            },
          });
        }
      },
    },
  };
});
