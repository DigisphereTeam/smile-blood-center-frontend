import { z } from "zod";

export const registerSchema = z
  .object({
    first_name: z.string().trim().min(1, "First Name is required."),

    last_name: z.string().trim().optional(),

    email: z.email("Enter a valid email address."),

    phone_number: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number."),

    password: z.string().min(8, "Password must be at least 8 characters."),

    confirm_password: z.string().trim().min(1, "Confirm Password is required."),

    role: z.enum(["frontdesk", "technical"]),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export const registerDefaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  confirm_password: "",
  role: "frontdesk",
};
