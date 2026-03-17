import { getUpcomingProjects, getProjectDetails } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = "Service Projects";
    res.render("projects", { title, projects });
};

const projectDetailsPage = async (req, res, next) => {
    const projectId = req.params.id;
    const details = await getProjectDetails(projectId);
    if (details.length < 1) {
        const err = new Error("Project Not Fount");
        err.status = 404;
        next(err);
    }
    console.log(details);
    const title = "Project Details";
    res.render("project", { title, details: details[0] });
}

export { projectsPage, projectDetailsPage };
