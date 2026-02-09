import bcrypt from "bcryptjs";
import { getUserByEmail } from "./user.service";

export const validateUserCredentials = async (
  email: string,
  password: string,
) => {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
};
