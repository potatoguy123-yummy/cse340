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

export { getAllCategories, getCategoryDetails }
