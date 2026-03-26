import db from './db.js'

const getAllCategories = async() => {
  const query = `
    SELECT name, category_id FROM categories;
  `;

  const result = await db.query(query);

  return result.rows;
}

const getCategoryDetails = async(id) => {
  const query = `
    SELECT * FROM categories WHERE category_id=$1;
  `;

  const result = await db.query(query, [id]);

  return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO service_project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM service_project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const getCategoriesByServiceProjectId = async (projectId) => {
  const query = `
SELECT
  cat.category_id,
  cat.name AS category_name
FROM
  service_projects sp
LEFT JOIN
  service_project_categories scat ON sp.project_id = scat.project_id
RIGHT JOIN
  categories cat ON cat.category_id = scat.category_id
WHERE sp.project_id=$1;
  `;
  
  const query_params = [projectId];
  const result = await db.query(query, query_params);

  return result.rows;
};

export { getAllCategories, getCategoryDetails, updateCategoryAssignments, getCategoriesByServiceProjectId }
