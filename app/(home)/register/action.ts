"use server";

import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { RegistrationSchema, RegistrationSchemaType } from "./schema";
import { generateApplicationId } from "@/lib/utils";

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const CREATE_APPLICATION = async (values: RegistrationSchemaType) => {
  const { data, success } = RegistrationSchema.safeParse(values);

  if (!success) throw new Error("Invalid input value");

  const app = await db.application.findFirst({
    where: {
      phone: data.phone,
    },
  });

  if (app && app.isVerified && app.isPaid) throw new Error("Already applied");

  if (app && !app.isVerified) {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sms`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ phone: data.phone, id: app.id }),
    // });

    // if (!response.ok) {
    //   throw new Error("Something went wrong. Try again!");
    // }

    redirect(`/register/verify/${app.id}`);
  }

  if (app && app.isVerified && !app.isPaid) {
    redirect(`/register/pay/${app.id}`);
  }

  const newApp = await db.application.create({
    data: {
      ...data,
      appId: generateApplicationId()
    },
    select: {
      id: true,
    },
  });

  await db.verificationToken.create({
    data: {
      identifier: newApp.id,
      token: generateVerificationCode(),
      expires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  //   const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sms`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ phone: data.phone, id: newApp.id }),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Something went wrong. Try again!");
  //   }

  return {
    success: "Registration successful",
    id: newApp.id,
  };
};
