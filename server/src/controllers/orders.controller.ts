import type { RequestHandler } from "express";
import { createOrder } from "../services/orders.service";
import { getErrorMessage } from "../utils/errors";

export const placeOrder: RequestHandler = async (req, res) => {
  const { totalAmount, items } = req.body as {
    totalAmount: number;
    items: { productId: number; quantity: number; price: number }[];
  };

  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const orderId = await createOrder(userId, totalAmount, items);
    return res
      .status(201)
      .json({ message: "Order placed successfully", orderId });
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};
