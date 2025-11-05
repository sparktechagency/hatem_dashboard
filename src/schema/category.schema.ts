/* eslint-disable no-useless-escape */
import { z } from "zod";


export const categorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    })
    .min(1, "Name is required")
    .trim()
    .regex(/^[^0-9]*$/, {
      message: "Name cannot contain numbers",
    })
    .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
      message: 'Name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
    }),
  categoryImage: z
    .instanceof(File, {message: "Please select an image"})
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size must be 5MB or less",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type),
      { message: "Only .jpg, .jpeg, .png, or .webp formats are allowed" }
    )
});



