"use server";

import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

type UserRole = {
  id: string;
  role: Role;
};

export const UPDATE_USER_ROLE = async ({ id, role }: UserRole) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) throw new Error("User not found");

  await db.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });

  revalidatePath("/dashboard/user");
  revalidatePath("/dashboard/user/moderator");

  return {
    success: "Role updated",
  };
};

export const DELETE_USER = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) throw new Error("User not found");

  await db.user.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/user");

  return {
    success: "User deleted",
  };
};
