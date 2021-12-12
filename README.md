# guestbook

## scripts in package.json

### $ npm run client

```bash
cd client && npm run start
```

Runs the ReactJS client independently

### $ npm run server

```bash
DEBUG=server:* npx nodemon -r dotenv/config src/index.js dotenv_config_path=.development.env
```

Runs the NodeJS server independently in development mode

### $ npm run dev

```bash
npm run server && npm run client
```

Runs both Client and Server independently

### $ npm run start

```bash
node -r dotenv/config src/index.js dotenv_config_path=.production.env
```

Runs the whole application in production mode, serving ReactJS built static files from `build` folder inside `/client`

### $ npm run build

```bash
cd client && npm install && npm run build
```

Builds production static files for the client and install its dependencies

---

### Side notes

-  Add `"proxy":"http://localhost:${local_server_port}",` to the package.json file of the ReactJS client folder

-  Add `"homepage":".",` to the package.json file of the ReactJS client folder
