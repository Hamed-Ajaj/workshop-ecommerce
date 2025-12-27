import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  description: z.string().optional(),
  image_url: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial().refine(data => Object.keys(data).length > 0, {
  message: "At least one field is required",
})

export const querySchema = z.object({
  search: z
    .string()
    .trim()
    .min(1)
    .optional(),

  sort: z
    .enum(["price", "newest"])
    .optional()
    .default("newest"),

  order: z
    .enum(["asc", "desc"])
    .optional()
    .default("desc"),
})
