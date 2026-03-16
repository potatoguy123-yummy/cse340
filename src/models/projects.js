import db from './db.js'

const getAllProjects = async() => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
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

export { getAllProjects, getProjectsByOrganizationId }
