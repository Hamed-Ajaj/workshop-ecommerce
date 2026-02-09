import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required");
}

export const signAuthToken = (userId: number) => {
  return jwt.sign({ sub: userId }, jwtSecret, { expiresIn: "7d" });
};

export const verifyAuthToken = (token: string) => {
  const payload = jwt.verify(token, jwtSecret);

  if (
    !payload ||
    typeof payload !== "object" ||
    payload.sub === undefined ||
    payload.sub === null
  ) {
    throw new Error("Invalid token payload");
  }

  const userId = Number(payload.sub);
  if (!Number.isFinite(userId)) {
    throw new Error("Invalid token subject");
  }

  return {
    sub: userId,
  };
};
