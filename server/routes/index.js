import express from 'express';
import { getDataForCurrentUser, login, logout, refresh } from '../controllers/authController.js';
import { createUser, deleteUser, getUserDetails, updateUser } from '../controllers/userController.js';
import { createProject, deleteProject, getProjectDetails, updateProject } from '../controllers/projectController.js';
import { validateSignup, validateLogin } from '../middlewares/validateUser.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateProject from '../middlewares/validateProject.js';
import { getAdminData } from '../controllers/adminController.js';

const router = express.Router();

//Routes

// Common
router.route('/login').post(validateLogin, login);
router.route('/refresh').post(refresh);
router.route('/logout').post(logout);

// authentication based
router.route('/projects/:projectId').get(authenticateJWT, getProjectDetails);

// only admin
router.route('/get-admin-data').get(authenticateJWT, isAdmin, getAdminData);
router.route('/create-user').post(authenticateJWT, isAdmin, validateSignup, createUser);
router.route('/update-user/:employeeId').put(authenticateJWT, isAdmin, validateSignup, updateUser);
router.route('/delete-user/:employeeId').delete(authenticateJWT, isAdmin, deleteUser);
router.route('/create-project').post(authenticateJWT, isAdmin, validateProject, createProject);
router.route('/update-project/:projectId').put(authenticateJWT, isAdmin, validateProject, updateProject);
router.route('/delete-project/:projectId').delete(authenticateJWT, isAdmin, deleteProject);
router.route('/employees/:employeeId').get(authenticateJWT, isAdmin, getUserDetails);

export default router;
