"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DELETE_APPLICATION = async (id: string) => {
  const app = await db.application.findUnique({
    where: {
      id,
    },
  });

  if (!app) throw new Error("Application not found");

  await db.application.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/application");

  return {
    success: "Deleted",
  };
};
