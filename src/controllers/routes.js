import express from 'express';

import { organizationsPage } from "./organizations.js";
import { projectsPage } from "./projects.js";
import { indexPage } from "./index.js";
import { testErrorPage } from "./errors.js";
import { categoryPage } from "./categories.js";

const router = express.Router();

router.get("/", indexPage);
router.get("/organizations", organizationsPage);
router.get("/projects", projectsPage);
router.get("/categories", categoryPage);

router.get('/test-error', testErrorPage);

export default router;
