import { Router } from "express";
import {
  addProduct,
  getProduct,
  getProducts,
} from "../controllers/products.controller";
import { validate } from "../middlewares/validate";
import { createProductSchema } from "../schemas/products.schema";
import { z } from "zod";

const router = Router();

const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

router.get("/", getProducts);
router.post("/", validate({ body: createProductSchema }), addProduct);
router.get("/:id", validate({ params: productIdSchema }), getProduct);

export default router;
