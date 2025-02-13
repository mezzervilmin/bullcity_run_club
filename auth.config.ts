// import type { NextAuthConfig } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma-edge";
// import { v4 as uuidv4 } from "uuid";

// import { encode } from "next-auth/jwt";

// export const authConfig = {
//   adapter: PrismaAdapter(prisma),
//   providers: [],
//   pages: {
//     signIn: "/sign-in",
//   },
//   callbacks: {
//     async jwt({ account, user, token }) {
//       if (account?.provider === "credentials") {
//         const sessionToken = uuidv4();
//         const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);

//         const session = await PrismaAdapter(prisma).createSession!({
//           userId: user.id!,
//           sessionToken,
//           expires,
//         });
//         token.sessionId = session.sessionToken;
//       }
//       return token;
//     },
//   },
//   jwt: {
//     maxAge: 60 * 60 * 24 * 30,
//     async encode(arg) {
//       return (arg.token?.sessionId as string) ?? encode(arg);
//     },
//   },
//   },
// } satisfies NextAuthConfig;
