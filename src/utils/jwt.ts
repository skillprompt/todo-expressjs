import jwt from "jsonwebtoken";

type TGenerateTokenInput = {
  username: string;
  email: string;
};

const secretKey = "random_secret";

export function generateToken(payload: TGenerateTokenInput) {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 2 * 60,
  });
  return token;
}
