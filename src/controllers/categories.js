import { getAllCategories, getCategoryDetails } from "../models/categories.js";
import { getProjectsByCategoryId } from "../models/projects.js";

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

export { categoryPage, categoryDetailsPage };
