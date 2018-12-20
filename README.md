# Final Project for SI664, UMSI, 2018 Fall H1B Detector

# Introduction

This application allows users to easily search for H1B sponsoring companies in the US by using the dataset from the U.S. Department of Labor. The detailed description of the dataset can be found here: https://www.foreignlaborcert.doleta.gov/pdf/PerformanceData/2017/H-1B_FY17_Record_Layout.pdf. Each row of the dataset represents an application case. And along with the case number, the employer information is also included as well as general information about the position. (company name, employer address, job title, salary, etc).

### Data set

The dataset is downloaded from [United States Department of Labor](https://www.foreignlaborcert.doleta.gov/performancedata.cfm)

### Data model

There are mainly two types of information I want to show to the users in this application:
company information, and job information. The company detail page contains information about
company location, job list, salaries, job categories, and H1B application number in the most
recent year. By selecting the job list, the user can see all the positions this company is willing to
sponsor H1B visa.
The job detail page shows information about the average salary, companies that sponsor visas
this job position, job title and job category, work locations, and application numbers in the most
recent year. (see detail in sql data model file)

![model image](https://github.com/Adonais0/H1B-Detector/blob/master/model.png)

### Demo Video

[![Demo](https://img.youtube.com/vi/sLn883H-7OY/0.jpg)](https://www.youtube.com/watch?v=sLn883H-7OY)


# Project Setup

### Package Dependencies

- Ionic 4
- Angular 7
- Django 2.1.3
- Python 3.7
- PostgreSQL 10.0

### Postgres SQL
- **Install postgreSQL**: `$ brew install postgresql`
- Mac in terminal **start postgres server**: `$ pg_ctl -D /usr/local/var/postgres start`
- Wait for the terminal to show `server started`
- Create a table named `$ createdb h1bee`
- In the **project root directory** (h1bee), run `pg_restore -d h1bee database` (database is the dump file name)
- If no error appear, the dump file is restored in the new `h1bee` database
- In order to browse the database better, you need to install pgAdmin
- If you want to **Connect to the database** in terminal `psql`

### Backend
-  `cd backend`
-  set up new virtual environment `venv`
-  in the virtual environment `pip3 install -r requirements.txt`
-  `cd h1bee`
-  `python3 manage.py runserver`

### Frontend
- In the project root folder (h1bee) run `npm install`
- Install any packages if the `ionic server` raise package error
- Run `$ ionic serve` to start front end

### pgAdmin
- [pgAdmin](https://www.pgadmin.org/) is a GUI interface of postgres
- [Download from here](https://www.pgadmin.org/download/)
- After installation, launch the pgAdmin application
- Double click `PostgreSQL` under the `Servers` item
- Enter password for your mac user in the pop up window
- After connecting with the server:
  - Click the expand icon [+] before `PostgreSQL`
  - Expand `Databases`
  - Expand `h1bee`
  - Expand `Schemas`
  - Expand `Public`
  - Expand `Tables`
- Then you can see all the database tables


# Work Plan
- [ ] Add CSS and styling pages
- [ ] Add Login view
- [ ] Add Logout function (figure out communication between frontend, backend, and the provider)
- [ ] Adjust post job function, allow users to add companies to the job
- [ ] (Authorization) After logged in, users can see jobs they posted in the 'me' page
- [ ] (Authorization & CRUD) In the 'me' page, users can delete or edit the jobs they posted
