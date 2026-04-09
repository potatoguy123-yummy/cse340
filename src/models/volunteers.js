import db from './db.js';

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    RETURNING user_id, project_id
  `;

  const query_params = [userId, projectId];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Failed to add volunteer');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Added volunteer:', result.rows[0]);
  }

  return result.rows[0];
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    RETURNING user_id, project_id
  `;

  const query_params = [userId, projectId];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Volunteer not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Removed volunteer:', result.rows[0]);
  }

  return result.rows[0];
};

const getProjectsByUserId = async (userId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date,
      sp.organization_id,
      o.name AS organization_name
    FROM service_projects sp
    JOIN organization o ON sp.organization_id = o.organization_id
    JOIN volunteers v ON v.project_id = sp.project_id
    WHERE v.user_id = $1
    ORDER BY sp.date
  `;

  const query_params = [userId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getVolunteersByProjectId = async (projectId) => {
  const query = `
    SELECT
      u.user_id,
      u.name,
      u.email
    FROM users u
    JOIN volunteers v ON v.user_id = u.user_id
    WHERE v.project_id = $1
    ORDER BY u.name
  `;

  const query_params = [projectId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const hasUserVolunteered = async (userId, projectId) => {
  const query = `
    SELECT COUNT(*)
    FROM volunteers
    WHERE user_id = $1 AND project_id = $2
  `;

  const query_params = [userId, projectId];
  const result = await db.query(query, query_params);

  return parseInt(result.rows[0].count, 10) > 0;
};

const getAllProjectVolunteers = async (projectId) => {
  const query = `
    SELECT
      u.user_id,
      u.name,
      u.email,
      u.created_at
    FROM users u
    JOIN volunteers v ON v.user_id = u.user_id
    WHERE v.project_id = $1
    ORDER BY u.name
  `;

  const query_params = [projectId];
  const result = await db.query(query, query_params);

  return result.rows;
};

export {
  addVolunteer,
  removeVolunteer,
  getProjectsByUserId,
  getVolunteersByProjectId,
  hasUserVolunteered,
  getAllProjectVolunteers
};
