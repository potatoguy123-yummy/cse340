import { getAllCategories, getCategoryDetails, getCategoriesByServiceProjectId, updateCategoryAssignments } from "../models/categories.js";
import { getProjectsByCategoryId, getProjectDetails } from "../models/projects.js";

const categoryPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = "Categories";
    res.render("categories", { title, categories });
};

const categoryDetailsPage = async (req, res, next) => {
    const categoryId = req.params.id;
    const details = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    if (details.length < 1) {
        const err = new Error("Category Not Found");
        err.status = 404;
        next(err);
    }
    const title = "Category Details";
    res.render("category", { title, details: details[0], projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { categoryPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };
