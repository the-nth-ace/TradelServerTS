import { Request, Response, Router } from "express";

import OnboardingAndAuthenticationRoutes from "Api/Modules/Client/OnboardingAndAuthentication/Routes/index";
import InventoryRoutes from "Api/Modules/Client/Inventory/Routes/index";
import OrderRoutes from "Api/Modules/Client/Order/Routes/index";
import { HttpStatusCodeEnum } from "Utils/HttpStatusCodeEnum";
import {
  SUCCESS,
  WELCOME_TO_API,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";

const routes = Router();

routes.use("", OnboardingAndAuthenticationRoutes);
routes.use("", InventoryRoutes);
routes.use("", OrderRoutes);

routes.use("/", (request: Request, response: Response) => {
  response.status(HttpStatusCodeEnum.OK).json({
    status_code: HttpStatusCodeEnum.OK,
    status: SUCCESS,
    message: WELCOME_TO_API,
  });
});
export default routes;