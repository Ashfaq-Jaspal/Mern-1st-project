import express from 'express';
import { getCurrentUser, login, logout } from '../controllers/authController.js';
import { createUser, getUserDetails } from '../controllers/userController.js';
import { createProject, getProjectDetails } from '../controllers/projectController.js';
import { validateSignup, validateLogin } from '../middlewares/validateUser.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';
import isAdmin from '../middlewares/isAdmin.js'
import validateProject from '../middlewares/validateProject.js';

const router = express.Router();

//Routes

// Common
router.route('/login').post(validateLogin, login);
router.route('/logout').post(logout);

// authentication based
router.route('/current-user').get(authenticateJWT, getCurrentUser);
router.route('/projects/:projectId').get(authenticateJWT, getProjectDetails);

// only dmin
router.route('/create-user').post(authenticateJWT, isAdmin, validateSignup, createUser);
router.route('/create-project').post(authenticateJWT, isAdmin, validateProject, createProject);
router.route('/employees/:employeeId').get(authenticateJWT, isAdmin, getUserDetails);

export default router;
