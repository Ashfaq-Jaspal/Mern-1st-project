import express from 'express';
import {login, logout} from '../controllers/auth-controller.js';
import Home from '../controllers/home-controller.js';
import Admin from '../controllers/admin-controller.js';
import Employee from '../controllers/employee-controller.js';
import { allEmployees, getCreate, postCreate, clickedProject } from '../controllers/user-controller.js';
import { allProjects, getCreateProject, postCreateProject, projectsOfClickedEmployee} from '../controllers/project-controller.js';
import { validateSignup, validateLogin } from '../middlewares/input-validation.js';
import verifyJwt from '../middlewares/verify-jwt.js';
import isAdmin from '../middlewares/isAdmin.js';
import isEmployee from '../middlewares/isEmployee.js';
import validateProject from '../middlewares/project-validation.js';
const router = express.Router();

//Routes
router.route('/').get(verifyJwt, Home);
router.route('/employee-dashboard').get(verifyJwt, isEmployee, Employee);
router.route('/admin-panel').get(verifyJwt, isAdmin, Admin);
router.route('/create').get( verifyJwt, isAdmin, getCreate);
router.route('/create').post(validateSignup, postCreate);
router.route('/login').post(validateLogin, login);
router.route('/logout').post(logout);
router.route('/create-project').get(verifyJwt, isAdmin, getCreateProject);
router.route('/create-project').post(validateProject, postCreateProject);
router.route('/projects').get(verifyJwt, isAdmin, allProjects);
router.route('/employees').get(verifyJwt, isAdmin, allEmployees);
router.route('/employees/:employeeId').get(verifyJwt, isAdmin, projectsOfClickedEmployee);
router.route('/projects/:projectId').get(verifyJwt, clickedProject);

export default router;
