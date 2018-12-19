# Final Project for SI664, UMSI, 2018 Fall
## H1B Detector

## Purpose

This application allows users to easily search for H1B sponsoring companies in the US by using the dataset from the U.S. Department of Labor. The detailed description of the dataset can be found here: https://www.foreignlaborcert.doleta.gov/pdf/PerformanceData/2017/H-1B_FY17_Record_Layout.pdf. Each row of the dataset represents an application case. And along with the case number, the employer information is also included as well as general information about the position. (company name, employer address, job title, salary, etc).

## Data set

The dataset is downloaded from [United States Department of Labor](https://www.foreignlaborcert.doleta.gov/performancedata.cfm)

## Data model

There are mainly two types of information I want to show to the users in this application:
company information, and job information. The company detail page contains information about
company location, job list, salaries, job categories, and H1B application number in the most
recent year. By selecting the job list, the user can see all the positions this company is willing to
sponsor H1B visa.
The job detail page shows information about the average salary, companies that sponsor visas
this job position, job title and job category, work locations, and application numbers in the most
recent year. (see detail in sql data model file)

## Package Dependencies

- Ionic 3
- Angular 7
- Django 1.11
- Python 3.7

- Back-end
  -  `cd backend`
  -  set up new virtual environment `venv`
  -  `cd h1bee`
  -  in the virtual environment `pip3 install -r requirements.txt`
  -  `python3 manage.py runserver`

- Front-end
  - Run `npm install`
  - Install Ionic Native LocalNotifications
    - `ionic cordova plugin add cordova-plugin-local-notification`
    - `npm install --save @ionic-native/local-notifications`
  - `ionic serve`

- Mac in terminal start postgres server: `pg_ctl -D /usr/local/var/postgres start`
- Wait for the terminal to show `server started`
- Create a table named `h1bee`
- navigate to sqlfile.sql run `$ psql h1bee < sqlfile.sql`

# Authentication

## Front end

- Angular 6 social login
```
$ npm install angular-6-social-login --save
```
