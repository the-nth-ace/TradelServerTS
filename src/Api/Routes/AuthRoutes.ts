import { Router } from "express";
import AuthController from "Api/Controllers/AuthController";
import validate from "Api/Validators/Common/validate";
import userSignInValidator from "Api/Validators/Auth/userSignInValidator";
import { asyncMiddlewareHandler } from "Utils/asyncMiddlewareHandler";
import { isAuthenticated } from "Api/Middleware/isAuthenticated";

const routes = Router();

routes.post(
  "/Initiate/EmailSignIn",
  userSignInValidator,
  validate,
  AuthController.emailSignIn
);

routes.get(
  "/Initiate/EmailVerification/:emailVerifyToken",
  asyncMiddlewareHandler(isAuthenticated),
  AuthController.verifyEmail
);

routes.get(
  "/Initiate/RequestEmailVerificationToken",
  asyncMiddlewareHandler(isAuthenticated),
  AuthController.requestEmailVerificationToken
);

routes.post("Initiate/PasswordRecovery", AuthController.startPasswordRecovery);

routes.post("Initiate/ChangePassword", AuthController.changePassword);

export default routes;