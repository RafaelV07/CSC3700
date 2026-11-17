Aurora CS Course Scheduler (M2)

CSC3700 Advanced Web Application Development, Fall 2026, Prof Lash.

A React app that displays the Aurora CS Developer Track course catalog, tracks which courses a student has completed, and shows which courses they are eligible to take next based on prerequisites. In Milestone 2 the data lives in MySQL and is served by our own Node/Express API. Completion state is saved to the database (not localStorage).


How to run

1. Set up the server environment

Create "server/.env" by copying "server/.env.example", then fill in your database values:

cp server/.env.example server/.env


PORT=3000
DB_HOST=from_your_team_sheet
DB_USER=from_your_team_sheet
DB_PASSWORD=from_your_team_sheet
DB_NAME=from_your_team_sheet
CLIENT_ORIGIN=http://localhost:5173


2. Create and seed the database

Run "server/sql/schema.sql" first, then "server/sql/seed.sql", against your database
(phpMyAdmin, WebStorm's Database tool, or the command line):

mysql -h DB_HOST -u DB_USER -p DB_NAME < server/sql/schema.sql
mysql -h DB_HOST -u DB_USER -p DB_NAME < server/sql/seed.sql


"schema.sql" drops and recreates the tables, so rerunning both files resets the database.
After seeding there are 10 courses, 10 prerequisite rows, 1 user (student1), and 2 completions.

3. Start the Express server (terminal 1)

cd server
npm install
npm run dev

The API is at http://localhost:3000/api (for example http://localhost:3000/api/courses).

4. Start the React app (terminal 2, project root)

Create ".env" in the project root (it is not committed to Git):

VITE_API_BASE_URL=http://localhost:3000


Then:

npm install
npm run dev

Open http://localhost:5173 in your browser.
