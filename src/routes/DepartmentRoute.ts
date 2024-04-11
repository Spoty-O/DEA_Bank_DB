import { Router } from "express";
import DepartmentController from "../controllers/DepartmentController.js";
const DepartmentRouter = Router();

DepartmentRouter.get('/departments', DepartmentController.getDepartments);
// router.get('/validation/:id', authMiddleware, authController.email_confirm);
// router.get('/refresh', authController.handleRefreshToken);
// router.post('/login', validation(joiUserLoginSchema), authController.login);
// router.post('/telegram-login', authTelegramValidation, authController.telegram_login, authController.telegram_register);
// router.post('/register', validation(joiUserRegisterSchema), authController.register);
// router.post('/logout', authController.logout);

export default DepartmentRouter;