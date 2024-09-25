"use server";

import { db } from "@/lib/prisma";

type VerifyUser = {
  id: string;
  code: string;
};

export const VERIFY_APPLICATION = async ({ id, code }: VerifyUser) => {
  const token = await db.verificationToken.findFirst({
    where: {
      identifier: id,
    },
  });

  if (!token) {
    throw new Error("Invalid verification code");
  }

  if (code !== token.token) {
    throw new Error("Invalid verification code");
  }

  const isExpired = new Date() > new Date(token.expires);

  if (isExpired) {
    throw new Error("Verification token has expired");
  }

  await db.$transaction(async (ctx) => {
    await ctx.application.update({
      where: {
        id: token.identifier,
      },
      data: {
        isVerified: true,
      },
    });

    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: id,
          token: code,
        },
      },
    });
  });

  return {
    success: "Verification successful",
    id: token.identifier,
  };
};
