import express from 'express';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from "./organizations.js";

import { projectsPage, projectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from "./projects.js";
import { indexPage } from "./index.js";
import { testErrorPage } from "./errors.js";
import { categoryPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, categoryValidation, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from "./categories.js";
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, showUsersPage, requireRole } from "./users.js";

const router = express.Router();

router.get("/", indexPage);
router.get("/organizations", showOrganizationsPage);
router.get("/new-organization", requireRole('admin'), showNewOrganizationForm);
router.post("/new-organization", requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.get("/projects", projectsPage);
router.get("/project/:id", projectDetailsPage);
router.get("/categories", categoryPage);
router.get("/category/:id", categoryDetailsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.get("/new-category", requireRole('admin'), showNewCategoryForm);
router.post("/new-category", requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), showUsersPage);

router.get('/test-error', testErrorPage);

export default router;
