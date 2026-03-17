DROP TABLE IF EXISTS organization;
DROP TABLE IF EXISTS service_projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS service_project_categories;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

-- BrightFuture Builders (OrganizationID = 1)
INSERT INTO service_projects (organization_id, title, description, location, date) VALUES
(1, 'Community Center Repair', 'Repaired the roof and windows of the local community center.', '123 Main Street', '2027-03-15'),
(1, 'Park Bench Installation', 'Installed new benches in the town park.', 'Central Park', '2027-04-01'),
(1, 'School Playground Upgrade', 'Added new safety surfacing to the school playground.', 'Oakwood Elementary', '2027-04-22'),
(1, 'Senior Center Ramp Construction', 'Built a wheelchair-accessible ramp for the senior center.', 'Golden Years Center', '2027-05-10'),
(1, 'Habitat for Humanity Build', 'Assisted with building a new home for a local family.', '456 Elm Street', '2027-06-01');

-- GreenHarvest Growers (OrganizationID = 2)
INSERT INTO service_projects (organization_id, title, description, location, date) VALUES
(2, 'Community Garden Planting', 'Planted vegetables and herbs in the community garden.', 'Community Garden', '2027-03-20'),
(2, 'Food Bank Donation', 'Donated fresh produce to the local food bank.', 'Food Bank', '2027-04-05'),
(2, 'Urban Farming Workshop', 'Hosted a workshop on urban farming techniques.', 'Community Center', '2027-04-29'),
(2, 'School Garden Creation', 'Created a school garden at a local elementary school.', 'Pine Ridge Elementary', '2027-05-15'),
(2, 'Composting Initiative', 'Implemented a composting program at the community garden.', 'Community Garden', '2027-06-10');

-- UnityServe Volunteers (OrganizationID = 3)
INSERT INTO service_projects (organization_id, title, description, location, date) VALUES
(3, 'Soup Kitchen Service', 'Served meals at the local soup kitchen.', 'Soup Kitchen', '2027-03-10'),
(3, 'Clothing Drive Collection', 'Collected and distributed clothing donations.', 'Community Center', '2027-04-12'),
(3, 'Park Cleanup', 'Cleaned up litter and debris in the town park.', 'Central Park', '2027-04-26'),
(3, 'Animal Shelter Support', 'Volunteered at the local animal shelter.', 'Animal Shelter', '2027-05-03'),
(3, 'Holiday Gift Wrapping', 'Wrapped gifts for underprivileged children during the holidays.', 'Community Center', '2027-06-15');

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

INSERT INTO categories (name, description) VALUES
('Community Development', 'Projects focused on improving community infrastructure and facilities'),
('Environmental Sustainability', 'Projects related to conservation, recycling, and ecological initiatives'),
('Food Security', 'Projects addressing hunger, nutrition, and food distribution');

CREATE TABLE service_project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_projects(project_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Associate projects with categories:
-- BrightFuture Builders Projects
INSERT INTO service_project_categories (project_id, category_id) VALUES
(1, 1), -- Community Center Repair -> Community Development
(2, 1), -- Park Bench Installation -> Community Development
(3, 1), -- School Playground Upgrade -> Community Development
(4, 1), -- Senior Center Ramp Construction -> Community Development (accessibility)
(5, 1); -- Habitat for Humanity Build -> Community Development

-- GreenHarvest Growers Projects
INSERT INTO service_project_categories (project_id, category_id) VALUES
(6, 2), -- Community Garden Planting -> Environmental Sustainability
(7, 3), -- Food Bank Donation -> Food Security
(8, 2), -- Urban Farming Workshop -> Environmental Sustainability
(9, 2), -- School Garden Creation -> Environmental Sustainability
(10, 2); -- Composting Initiative -> Environmental Sustainability

-- UnityServe Volunteers Projects
INSERT INTO service_project_categories (project_id, category_id) VALUES
(11, 3), -- Soup Kitchen Service -> Food Security
(12, 1), -- Clothing Drive Collection -> Community Development
(13, 2), -- Park Cleanup -> Environmental Sustainability
(14, 1), -- Animal Shelter Support -> Community Development
(15, 1); -- Holiday Gift Wrapping -> Community Development
