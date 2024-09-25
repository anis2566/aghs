"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

type UpdateService = {
  id: string;
  isCompleted: boolean;
};

export const UPDATE_SERVICE = async ({ id, isCompleted }: UpdateService) => {
  const service = await db.service.findUnique({
    where: {
      id,
    },
  });

  if (!service) throw new Error("Service not found");

  await db.service.update({
    where: {
      id,
    },
    data: {
      isCompleted,
    },
  });

  revalidatePath(`/dashboard/application/${service.appId}`);

  return {
    success: "Updated",
  };
};
