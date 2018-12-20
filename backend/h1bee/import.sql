// import csv into sql
CREATE TABLE h1b (
    id integer,
    case_id integer,
    case_status text,
    visa_class text,
    company text,
    company_street text,
    company_city text,
    company_state text,
    company_postal_code text,
    job_title text,
    category text,
    salary text,
    salary_unit text,
    dependent text,
    work_city text,
    work_county text,
    work_state text,
    work_postal_code text
);

COPY h1b(id, case_id, case_status, visa_class, company, company_street, company_city, company_state, company_postal_code, job_title,
         category, salary, salary_unit, dependent, work_city, work_county, work_state, work_postal_code)
    FROM '/users/chuyao/documents/files/umich/si669/final-project/h1b_new.csv' DELIMITER '	' CSV HEADER;

CREATE TABLE company(
    company_id integer PRIMARY KEY,
    company text,
    street_address text,
    postal_code text,
    city text,
    state text
);

COPY company(company_id, company, street_address, postal_code, city, state)
    FROM '/users/chuyao/documents/files/umich/si669/final-project/company.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE county (
  county_id INT NOT NULL UNIQUE,
  county VARCHAR(255),
  PRIMARY KEY (county_id),
  FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE city (
  city_id INT NOT NULL,
  city VARCHAR(255),
  PRIMARY KEY(city_id),
  FOREIGN KEY ()
);


CREATE TABLE PUBLIC h1b (
    case_id integer(8),
    case_status varchar(255),
    visa_class varchar(255),
    company varchar(255),
    company_street varchar(255),
    company_city varchar(255),
    company_state varchar(10),
    company_postal_code varchar(255),
    job_title varchar(255),
    category varchar(255),
    salary varchar(255),
    salary_unit varchar(100),
    dependent varchar(100),
    work_city varchar(255),
    work_county varchar(255),
    work_state varchar(10),
    work_postal_code varchar(255)
);

CREATE TABLE postal_code AS SELECT DISTINCT company_postal_code FROM h1b_new;

ALTER TABLE your_table ADD COLUMN key_column SERIAL PRIMARY KEY;

ALTER TABLE postal_code ADD PRIMARY KEY (postal_code_id);

CREATE TABLE IF NOT EXISTS city AS SELECT DISTINCT h1b_new.comany_city FROM h1b_new;
ALTER TABLE city ADD COLUMN city_id SERIAL PRIMARY KEY;
ALTER TABLE city ADD COLUMN state_id INTEGER;
ALTER TABLE city ADD CONSTRAINT city_state FOREIGN KEY (state_id) REFERENCES state(state_id);

ALTER TABLE company ADD CONSTRAINT company_location FOREIGN KEY (location_id) REFERENCES location(location_id);
UPDATE company SET location_id = location.location_id
	FROM h1b
    JOIN location ON h1b.company_id = company.company_id
    WHERE h1b.company_city = location.city AND h1b.company_state = location.state AND h1b.company_postal_code = location.postal_code;

UPDATE city
   SET state_id = state.state_id
   FROM h1b JOIN state
        ON h1b.work_state = state.state
   WHERE city.city = h1b.company_city;

UPDATE h1b
	SET company_id = company.company_id
   FROM company
   WHERE h1b.company = company.company;

UPDATE h1b
	SET job_id = job.job_id
   FROM job
   WHERE h1b.job_title = job.job;


CREATE TABLE IF NOT EXISTS location(
	location_id SERIAL PRIMARY KEY,
    city_id int,
    county_id int,
    state_id int,
    postal_code_id int,
    FOREIGN KEY(city_id) REFERENCES city(city_id),
    FOREIGN KEY(state_id) REFERENCES state(state_id),
    FOREIGN KEY(postal_code_id) REFERENCES postal_code(postal_code_id),
    FOREIGN KEY(county_id) REFERENCES county(county_id)
);

//ONE TO MANY
UPDATE city
   SET state_id = state.state_id
   FROM h1b_new JOIN state
        ON h1b_new.state = state.state
   WHERE city.city = h1b_new.city;

//MANY TO MANY
UPDATE location
	SET city_id = city.city_id
    FROM h1b_new
    JOIN city
    	ON h1b_new.work_city = city.city
    JOIN county
    	ON h1b_new.work_county = county.county
    WHERE location.county_id = county.county_id;

INSERT INTO location
SELECT
postal_code.postal_code_id, city.city_id, state.state_id, county.county_id
FROM tmp
JOIN city ON city.city = tmp.city
JOIN postal_code ON postal_code.postal_code = tmp.postal_code
JOIN state ON state.state = tmp.state
JOIN county ON county.county = tmp.county

UPDATE company
SET location_id = location.location_id
FROM location JOIN tmp ON location.location_id = tmp.tmp_id
WHERE company.postal_code = tmp.postal_code
	AND company.city = tmp.city
    AND company.state = tmp.state
CASE_ID,CASE_STATUS, EMPLOYER_NAME, EMPLOYER_ADDRESS, EMPLOYER_CITY, EMPLOYER_STATE, EMPLOYER_POSTAL_CODE, JOB_TITLE, SOC_NAME, WAGE_RATE_OF_PAY_FROM, WAGE_UNIT_OF_PAY, H1B_DEPENDENT, WORKSITE_CITY, WORKSITE_COUNTY, WORKSITE_STATE, WORKSITE_POSTAL_CODE

//Back up
--file "/Users/chuyao/h1b_backup_1204" --host "localhost" --port "5432" --username "chuyao" --no-password --verbose --role "chuyao" --format=c --blobs --encoding "UTF8" "h1bee"


ALTER TABLE h1b ADD COLUMN location_id integer;
ALTER TABLE h1b ADD COLUMN job_id integer;
ALTER TABLE h1b ADD COLUMN company_id integer;
ALTER TABLE h1b ADD COLUMN company_location_id integer;


ALTER TABLE h1b ADD CONSTRAINT h1b_location FOREIGN KEY (location_id) REFERENCES location(location_id);
ALTER TABLE h1b ADD CONSTRAINT h1b_company FOREIGN KEY (company_id) REFERENCES company(company_id);
ALTER TABLE h1b ADD CONSTRAINT h1b_job FOREIGN KEY (job_id) REFERENCES job(job_id);
ALTER TABLE h1b ADD CONSTRAINT h1b_company_location FOREIGN KEY (company_location_id) REFERENCES location(location_id);


UPDATE h1b SET company_location_id = location.location_id
	FROM location
    WHERE h1b.company_city = location.city AND h1b.company_state = location.state AND h1b.postal_code = location.postal_code;

UPDATE h1b SET location_id = location.location_id
	FROM location
    WHERE h1b.work_city = location.city AND h1b.work_state = location.state AND h1b.work_county = location.county AND h1b.work_postal_code = location.postal_code;

UPDATE h1b SET company_id = company.company_id
	FROM company
    WHERE h1b.company = company.company

UPDATE h1b SET job_id = job.job_id
	FROM job
    WHERE h1b.job = job.job

ALTER TABLE company ADD CONSTRAINT company_location FOREIGN KEY (location_id) REFERENCES location(location_id);

UPDATE company SET location_id = location.location_id
	FROM h1b
    JOIN location ON h1b.company_location_id = location.location_id
    WHERE h1b.company_city = location.city AND h1b.company_state = location.state AND h1b.company_postal_code = location.postal_code;

// alter primary key to serial number
CREATE SEQUENCE postal_code_id_seq
   OWNED BY postal_code.postal_code_id;

ALTER TABLE h1b ADD COLUMN location_id integer;
UPDATE company_job SET job_id = job_id + 1;
INSERT INTO postal_code (postal_code) VALUES ('12345')
ALTER TABLE location ADD CONSTRAINT location_postal_code FOREIGN KEY (postal_code_id) REFERENCES postal_code(postal_code_id)
