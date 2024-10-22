import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.headers["set-cookie"];

  const isCookieObtained = cookie && Array.isArray(cookie) && cookie.length > 0;

  if (!isCookieObtained) {
    res.status(401).json({
      message:
        "You are not logged in. Please login before accessing this route!",
    });
    return;
  }

  const token = cookie[0].split(";")[0].split("=")[1];

  // validate the token obtained from cookie
  const verifiedTokenOutput = verifyToken(token);
  if (!verifiedTokenOutput.isValid) {
    res.status(401).json({
      message: verifiedTokenOutput.message,
    });
    return;
  }

  req.user = verifiedTokenOutput.payload as any;

  next();
}
