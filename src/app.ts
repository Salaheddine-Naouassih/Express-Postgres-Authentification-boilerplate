import * as express from "express";
import { AppDataSource } from "./data-source";

import { authenticateToken } from "./middlewares/authMiddleware";
import { User } from "./entity/User";
import {
  joiBodyValidator,
  joiLoginSchema,
  joiRefreshTokenSchema,
  joiSignupSchema,
} from "./middlewares/Joi";
import { RefreshToken } from "./entity/RefreshToken";
import { UserController } from "./controllers/userController";
import * as cors from "cors";

export const createApp = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const userController = new UserController(
    userRepository,
    refreshTokenRepository
  );

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.post(
    "/register",
    joiBodyValidator(joiSignupSchema),
    userController.register.bind(userController)
  );

  app.post(
    "/token",
    joiBodyValidator(joiRefreshTokenSchema),
    userController.refreshToken.bind(userController)
  );

  app.post(
    "/login",
    joiBodyValidator(joiLoginSchema),
    userController.login.bind(userController)
  );

  app.post(
    "/logout",
    authenticateToken,
    userController.logout.bind(userController)
  );

  return app;
};
