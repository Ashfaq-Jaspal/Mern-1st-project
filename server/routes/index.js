import express from 'express';
import { getCurrentUser, login, logout } from '../controllers/authController.js';
import { createUser, getUserDetails } from '../controllers/userController.js';
import { createProject, getProjectDetails } from '../controllers/projectController.js';
import { validateSignup, validateLogin } from '../middlewares/validateUser.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';
import validateProject from '../middlewares/validateProject.js';

const router = express.Router();

//Routes

// Common
router.route('/current-user').get(authenticateJWT, getCurrentUser);
router.route('/login').post(validateLogin, login);
router.route('/logout').post(logout);

// Admin protected
router.route('/create-user').post(validateSignup, createUser);
router.route('/create-project').post(validateProject, createProject);
router.route('/employees/:employeeId').get(authenticateJWT, getUserDetails);

// Admin + Employee
router.route('/projects/:projectId').get(authenticateJWT, getProjectDetails);

export default router;
