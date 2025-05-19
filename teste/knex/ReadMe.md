npm install knex mysql2
npx knex init

 "scripts": {
    "start": "node index.js",
    "migrate": "knex migrate:latest"
  }

npx knex --knexfile knexfile.mjs migrate:make create_users_table
npm run migrate
