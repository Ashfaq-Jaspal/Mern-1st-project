import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { CurrentUser } from '../controllers/homeController.js';
import Admin from '../controllers/adminController.js';
import { clickedProject} from '../controllers/employeeController.js';
import { createUser } from '../controllers/userController.js';
import { getCreateProject, postCreateProject, projectsOfClickedEmployee } from '../controllers/projectController.js';
import { validateSignup, validateLogin } from '../middlewares/input-validation.js';
import verifyJwt from '../middlewares/verify-jwt.js';
import isAdmin from '../middlewares/isAdmin.js';
import isEmployee from '../middlewares/isEmployee.js';
import validateProject from '../middlewares/project-validation.js';

const router = express.Router();

//Routes

// Common
// router.route('/').get(verifyJwt, Home);
router.route('/current-user').get(verifyJwt, CurrentUser);
router.route('/login').post(validateLogin, login);
router.route('/logout').post(logout);

// Admin protected
router.route('/admin-panel').get(verifyJwt, isAdmin, Admin);
router.route('/create').post(validateSignup, createUser);
router.route('/create-project').get(verifyJwt, isAdmin, getCreateProject);
router.route('/create-project').post(validateProject, postCreateProject);
router.route('/employees/:employeeId').get(verifyJwt, isAdmin, projectsOfClickedEmployee);

// Admin + Employee
router.route('/projects/:projectId').get(verifyJwt, clickedProject);

export default router;
