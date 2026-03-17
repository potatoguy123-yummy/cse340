import express from 'express';

import { showOrganizationsPage, showOrganizationDetailsPage } from "./organizations.js";
import { projectsPage, projectDetailsPage } from "./projects.js";
import { indexPage } from "./index.js";
import { testErrorPage } from "./errors.js";
import { categoryPage, categoryDetailsPage } from "./categories.js";

const router = express.Router();

router.get("/", indexPage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", projectsPage);
router.get("/project/:id", projectDetailsPage);
router.get("/categories", categoryPage);
router.get("/category/:id", categoryDetailsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/test-error', testErrorPage);

export default router;
