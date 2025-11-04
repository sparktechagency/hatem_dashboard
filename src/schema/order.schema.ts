import z from "zod";

export const orderStatusSchema = z.object({
    status: z.string({
        invalid_type_error: "status must be a valid string value.",
        required_error: "Please, select a status"
    }).min(1, "Please, select a status")
})