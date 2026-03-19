import db from './db.js'

const getAllProjects = async() => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.organization_id,
      sp.date,
      o.name AS organization_name,
      o.contact_email AS organization_contact_email
    FROM
      service_projects sp
    JOIN
      organization o ON sp.organization_id = o.organization_id;
  `;

  const result = await db.query(query);

  return result.rows;
}

const getUpcomingProjects = async(limit) => {
  if (!limit) {
    limit = 0;
  }
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.organization_id,
      o.name AS organization_name,
      o.contact_email AS organization_contact_email
    FROM
      service_projects sp
    JOIN
      organization o ON sp.organization_id = o.organization_id
    WHERE
      sp.date >= CURRENT_DATE
    ORDER BY sp.date
    LIMIT $1;
  `;

  const result = await db.query(query, [limit]);

  return result.rows;
}

const getProjectDetails = async (projectId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.organization_id,
      org.name AS organization_name,
      sp.date,
      cat.category_id AS project_category,
      cat.name AS category_name
    FROM
      service_projects sp
    LEFT JOIN
      service_project_categories scat ON sp.project_id = scat.project_id
    LEFT JOIN
      categories cat ON cat.category_id = scat.category_id
    LEFT JOIN
      organization org ON org.organization_id = sp.organization_id
    WHERE sp.project_id=$1;
  `;

  const result = await db.query(query, [projectId]);

  return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM service_projects
    WHERE organization_id = $1
    ORDER BY date;
  `;
  
  const query_params = [organizationId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date
    FROM service_projects sp
    RIGHT JOIN
      service_project_categories scat ON scat.project_id = sp.project_id
    WHERE scat.category_id = $1;
  `;
  
  const query_params = [categoryId];
  const result = await db.query(query, query_params);

  return result.rows;
};

export { getAllProjects, getProjectsByCategoryId, getUpcomingProjects, getProjectsByOrganizationId, getProjectDetails }
