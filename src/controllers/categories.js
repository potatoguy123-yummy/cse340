import { getAllCategories, getCategoryDetails, getCategoriesByServiceProjectId, updateCategoryAssignments, createCategory, updateCategory } from "../models/categories.js";
import { getProjectsByCategoryId, getProjectDetails } from "../models/projects.js";
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters')
];

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

    console.log("h", assignedCategories);

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

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name, description } = req.body;

    const organizationId = await createCategory(name, description);
    res.redirect(`/category/${organizationId}`);
};

export { categoryPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, categoryValidation, processNewCategoryForm };
