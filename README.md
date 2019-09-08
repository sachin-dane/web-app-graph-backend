# CES : Web App

**CES Web App Backend application built in NodeJS**

## Prerequisites:
- GIT
- Node.js  (latest version e.g. v8.10.0)
- NPM (latest version e.g. v6.1.0)
- MySQL Server (You need to dump MySQL schema in your mysql database then you can easily use app)

## Getting started

To get the Backend running locally:
- Go to respective clone directory
- Fist you need to check mysql server is running, then create database, db name ces_web_app, then you need to import  the schema in your database. I have added schema dump in git repo at root folder.
    - reference (https://stackoverflow.com/questions/15884693/how-can-i-import-data-into-mysql-database-via-mysql-workbench)
- Once you connected with database then you need to add mysql configuration in /src/config/config.json like database name, password, port
    - reference ![alt text](https://github.com/sachin-dane/web-app-graph-backend/blob/master/screenshot/sql_config.png)
- `npm install` to install all req'd dependencies (from root directory where your package.json file located)
- `npm start` to start the local server
- Once you start nodejs server, then you need to add API end point in front end i.e. web-app-graph-frontend/.env fle
  ![alt text](https://github.com/sachin-dane/web-app-graph-backend/blob/master/screenshot/env_variable.png)
- You can access API on 'http://0.0.0.0:3001/' or 'http://localhost:3001/' 
- If you want to check API is running or not, go to browser and hit this url 'http://localhost:3001/ping' it will show the API is running or not it's response is '{ "status": "OK", "status_code": 200 }' 
- Also I have added postman collection of rest API's
- You can acces frontend application on 'http://0.0.0.0:8080/' or 'http://localhost:8080/'


## Cron / Scheduler

- To run cron job you need to open new terminal and run `npm run start-cron`. It will start and run on every hour and add data objects.
- Run this command from root directory.

## Test Accounts (Email / Password)
  ### Admin Account
  - admin@mail.com / admin@123

  ### Developer Account
  - rober_downey@mail.com / robert@123
  - chris_hemsworth@mail.com / chris@123
  - bradley_cooper@mail.com / bradley@123
  - matt_damon@mail.com / matt@123

  ### Reviewer Account
  - dwayne_johnson@mail.com /dwayne@123


## Sites
  ### Active Sites
  - Natural Gas
  - Hospitality
  - Automobile
  - Power Generation

  ### Proposed Sites
  - Textile Industry
  - Plastic 

  ### Inactive Sites
  - Electronics 
  - IT Industry

## Application Screenshot

  1.  Sign In Page
      - User can able to sign in to application
      - Added validation
      - If user want register, given sign up link to sign up.
      - If user forgot password, given forgot password link to reset password. 
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/sign_in.png)
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/signin_validation.png)
      
  2.  Sign Up Page
      - User can able to register and can pick role as Developer or Reviewer
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/sign_up.png)
    
  3.  Forgot password
      - First get email and phone number to validate user then user is able to reset password
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/forgot_password.png) 

  4.  Admin Panel / User List 
      - Once admin user login into app will redirect user list page. where admin can approve / activate user or admin can delete user. Also given success messages/
      - Once Use login to app left hand side / sidebar shown logged in user name and role.
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/admin_userList.png)
      - When you click on user table row, modal popup will appear and it will show all the details of user.
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/user_details.png)

  5.  Admin Panel / Site
      - Show all the sites created in application.
      - Given two button site list and create site,
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/admin_site_list.png)
      - On cilck of any site modal popup will appear and admin can assign that site to user.
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/assign_site_to_user.png)
      - On click of create site button, form will appear and can fill site details created date will bydefault current date when use create site.
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/create_site.png)
  
  6.  User Dashboard / Profile
      - User can update the profile information
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/update_profile.png)
  
  7.  User Dashboard
      - Once developer or reviewer login he/her will be redirected to dashboard page. Shown 3 tabs Acitve sites, Inactive sites and Proposed sites.
      - If use is developer the sites which are authorized to developer only that sites are visible. Reviewer can all the sites.
      - When user select any site by click on any dropdown list. Then selected sites will be visible on below blank space.
      - If active sites are there then shown Graphical representation in bar chart format.
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/site_info.png)
      - ![alt text](https://github.com/sachin-dane/web-app-graph-frontend/blob/development/screenshot/graph_title.png)
 
  8.  Logout
      - User can able to logout by click on logout button from left hand sidebar.
