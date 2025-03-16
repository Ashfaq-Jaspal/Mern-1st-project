import express from 'express';
import { login, logout } from '../controllers/authController.js';ok
import Home from '../controllers/homeController.js';ok
import Admin from '../controllers/adminController.js';ok
import {Employee, allEmployees, clickedProject} from '../controllers/employeeController.js';ok
import { getCreate, postCreate } from '../controllers/userController.js';ok
import { getCreateProject, postCreateProject, allProjects, projectsOfClickedEmployee } from '../controllers/projectController.js';ok
import { validateSignup, validateLogin } from '../middlewares/input-validation.js';
import verifyJwt from '../middlewares/verify-jwt.js';
import isAdmin from '../middlewares/isAdmin.js';
import isEmployee from '../middlewares/isEmployee.js';
import validateProject from '../middlewares/project-validation.js';

const router = express.Router();

//Routes

// Common
router.route('/').get(verifyJwt, Home);
router.route('/login').post(validateLogin, login);
router.route('/logout').post(logout);

// Employee protected
router.route('/employee-dashboard').get(verifyJwt, isEmployee, Employee);

// Admin protected
router.route('/admin-panel').get(verifyJwt, isAdmin, Admin);
router.route('/create').get(verifyJwt, isAdmin, getCreate);
router.route('/create').post(validateSignup, postCreate);
router.route('/create-project').get(verifyJwt, isAdmin, getCreateProject);
router.route('/create-project').post(validateProject, postCreateProject);
router.route('/projects').get(verifyJwt, isAdmin, allProjects);
router.route('/employees').get(verifyJwt, isAdmin, allEmployees);
router.route('/employees/:employeeId').get(verifyJwt, isAdmin, projectsOfClickedEmployee);

// Admin + Employee
router.route('/projects/:projectId').get(verifyJwt, clickedProject);

export default router;
