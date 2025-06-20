import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";

// wrap with catchErrors() if you need this to be async
const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  // Define the expected payload type
  type JwtPayload = {
    userId: string;
    sessionId: import("mongodb").ObjectId;
    [key: string]: any;
  };

  const typedPayload = payload as JwtPayload;

  const { ObjectId } = require("mongodb");
  req.userId = new ObjectId(typedPayload.userId);
  req.sessionId = typedPayload.sessionId;
  next();
};

export default authenticate;
