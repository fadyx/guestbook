# Guestbook - Backend

---

## How to run

1. create copy of file `.example.env` and rename it `.development.env` and place it in the root folder of the project

2. provide the mongodb URI in proper place in `.development.env` file

3. in your terminal install the dependencies by running `npm i`

4. run the server in development mode by running the command `npm run dev`

---

## About

This is a nodejs backend server for a guestbook web application.

The server is written based only on the `http` module that is shipped with nodejs. **It is independent of any frameworks.**

### Endpoints

```bash
# accepts credentials (username, password)
# returns user and jwt token
POST    /api/auth/signup

# accepts credentials (username, password)
# returns user and jwt token
POST    /api/auth/login

# all /messages endpoints must be provided
# a bearer jwt in the authorization header

# returns list of all messages
GET     /api/messages/

# accepts new message
# returns the newly created message
POST    /api/messages/

# used to update a message
PATCH   /api/messages/:messageId

# used to delete a message
DELETE  /api/messages/:messageId

# used to get a message by id
GET     /api/messages/:messageId

# used to get all replies on a message
GET     /api/messages/:messageId/replies

# used to submit a reply on a message
POST    /api/messages/:messageId/replies
```

---

## Scripts in package.json

### $ npm run dev

```bash
npx nodemon -r dotenv/config src/index.js dotenv_config_path=.development.env
```

Runs the NodeJS server independently in development mode

### $ npm run start

```bash
node -r dotenv/config src/index.js dotenv_config_path=.production.env
```

Runs the whole application in production mode
