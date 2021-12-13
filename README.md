# guestbook

## scripts in package.json

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
