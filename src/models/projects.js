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

export {getAllProjects}
