import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { CurrentUser } from '../controllers/homeController.js';
import { clickedProject} from '../controllers/employeeController.js';
import { createUser } from '../controllers/userController.js';
import { postCreateProject, projectsOfClickedEmployee } from '../controllers/projectController.js';
import { validateSignup, validateLogin } from '../middlewares/user-validation.js';
import verifyJwt from '../middlewares/verify-jwt.js';
import validateProject from '../middlewares/project-validation.js';

const router = express.Router();

//Routes

// Common
router.route('/current-user').get(verifyJwt, CurrentUser);
router.route('/login').post(validateLogin, login);
router.route('/logout').post(logout);

// Admin protected
router.route('/create-user').post(validateSignup, createUser);
router.route('/create-project').post(validateProject, postCreateProject);
router.route('/employees/:employeeId').get(verifyJwt, projectsOfClickedEmployee);

// Admin + Employee
router.route('/projects/:projectId').get(verifyJwt, clickedProject);

export default router;
