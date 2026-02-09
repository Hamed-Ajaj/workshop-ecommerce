import z from "zod";

export const createOrderSchema = z.object({
  totalAmount: z.coerce.number().positive(),
  items: z
    .array(
      z.object({
        productId: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().positive(),
        price: z.coerce.number().positive(),
      }),
    )
    .min(1),
});
