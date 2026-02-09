import type { RequestHandler } from "express";
import { z } from "zod";

type Schema = z.ZodTypeAny;

type ValidationSchemas = {
  body?: Schema;
  params?: Schema;
  query?: Schema;
};

export const validate = (schemas: ValidationSchemas): RequestHandler => {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        (req as typeof req & { body: unknown }).body = schemas.body.parse(
          req.body,
        );
      }

      if (schemas.params) {
        (req as any).params = schemas.params.parse(req.params) as any;
      }

      if (schemas.query) {
        (req as any).query = schemas.query.parse(req.query) as any;
      }

      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: err.flatten(),
        });
      }

      return res.status(400).json({ error: "Invalid request" });
    }
  };
};
