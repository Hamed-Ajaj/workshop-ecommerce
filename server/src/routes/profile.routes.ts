import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { updateProfileSchema } from "../schemas/profile.schema";

const router = Router();

router.get("/", requireAuth, getProfile);
router.patch("/", requireAuth, validate({ body: updateProfileSchema }), updateProfile);

export default router;
