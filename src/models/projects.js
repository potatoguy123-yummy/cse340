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
      sp.description,
      sp.location,
      sp.organization_id,
      sp.date,
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
    SELECT * FROM service_projects WHERE project_id=$1;
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

export { getAllProjects, getUpcomingProjects, getProjectsByOrganizationId, getProjectDetails }
