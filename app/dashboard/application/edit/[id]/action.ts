"use server";

import { revalidatePath } from "next/cache";

import {
  RegistrationSchema,
  RegistrationSchemaType,
} from "@/app/(home)/register/schema";
import { db } from "@/lib/prisma";

type UpdateApp = {
  id: string;
  values: RegistrationSchemaType;
};

export const UPDATE_APPLICATION = async ({ id, values }: UpdateApp) => {
  const { data, success } = RegistrationSchema.safeParse(values);

  if (!success) throw new Error("Invalid input value");

  const app = await db.application.findUnique({
    where: {
      id,
    },
  });

  if (!app) throw new Error("Application not found");

  await db.application.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/application");

  return {
    success: "Updated",
  };
};
