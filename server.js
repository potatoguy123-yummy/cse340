import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";
const PORT = process.env.PORT?.toLowerCase() || 3000;
const HOST = process.env.HOST?.toLowerCase() || "0.0.0.0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    if (NODE_ENV === "development") {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.get("/", async (req, res) => {
    const title = "Home";
    res.render("home", { title });
});

app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
});

app.get("/organizations", async (req, res) => {
    const organizations = await getAllOrganizations();
    //console.log(organizations);
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
});

app.get("/projects", async (req, res) => {
    const projects = await getAllProjects();
    const title = "Service Projects";
    res.render("projects", { title, projects });
});

app.get("/categories", async (req, res) => {
    const categories = await getAllCategories();
    const title = "Categories";
    res.render("categories", { title, categories });
});

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

app.listen(PORT, HOST, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://${HOST}:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
