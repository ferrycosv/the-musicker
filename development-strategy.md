# THE-MUSICKER: development strategy

---

## 0. Setup

- Cloned repository and installed all dependencies, tested existing routes and identified the parts of code to implement the CRUD operations.

---

## 1. User Story: `API to interact with the database and store permanent data`

- User must be able to perform any CRUD operation to the SQLite database using REST  API commands, the server must process the request and give back a response and status "ok" or and status "error" with the corresponding error message.
- Inside `./api` we define a database connection specifying the db file location and the routes to manage the different endpoints used by each table of interest inside the database.
- The folders inside `./api` contains the endpoints and controllers to perform CRUD operations for the tables `albums, tracks, artists and playlist`, the queries used are defined in the `user-stories.md` file.

---