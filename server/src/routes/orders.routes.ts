import { Router } from "express";
import { placeOrder } from "../controllers/orders.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createOrderSchema } from "../schemas/orders.schema";

const router = Router();

router.post("/", requireAuth, validate({ body: createOrderSchema }), placeOrder);

export default router;
