import * as jwt from "jsonwebtoken";
import { getConfig } from "../utils/config";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  user: {
    email: string;
  };
}

function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers["authorization"] || (req.headers["Authorization"] as string);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, getConfig().ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as { email: string };
    next();
  });
}
export { authenticateToken };
