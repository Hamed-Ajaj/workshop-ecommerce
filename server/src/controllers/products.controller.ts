import type { RequestHandler } from "express";
import {
  createProduct,
  getProductById,
  listProducts,
} from "../services/products.service";
import { getErrorMessage } from "../utils/errors";

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const category =
      typeof req.query.category === "string" ? req.query.category.trim() : "";
    const products = await listProducts(category || undefined);
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export const addProduct: RequestHandler = async (req, res) => {
  const { name, description, price, image, category } = req.body as {
    name: string;
    description?: string;
    price: number;
    image?: string;
    category: string;
  };

  try {
    const product = await createProduct({
      name,
      description,
      price,
      image,
      category,
    });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};
