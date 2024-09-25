import { z } from "zod";

const requiredString = z.string().trim().min(1, { message: "required" });

export const RegistrationSchema = z.object({
  name: requiredString.min(4, { message: "min 4 characters" }),
  email: requiredString.email({ message: "invalid email" }).optional(),
  phone: requiredString.min(11, { message: "invalid number" }),
  batch: z.number().min(1, { message: "required" }),
  imageUrl: requiredString,
});

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
