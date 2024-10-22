import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

type TGenerateTokenInput = {
  username: string;
  email: string;
};

const secretKey = "random_secret";

export function generateToken(payload: TGenerateTokenInput) {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60,
  });
  return token;
}

export function verifyToken(token: string) {
  try {
    const verified = jwt.verify(token, secretKey);
    return {
      isValid: true,
      message: "token verified successfully",
      payload: verified,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        message: error.message,
        payload: null,
      };
    } else if (error instanceof JsonWebTokenError) {
      return {
        isValid: false,
        message: error.message,
        payload: null,
      };
    }
    return {
      isValid: false,
      message: "something went wrong when verifying token",
      payload: null,
    };
  }
}
