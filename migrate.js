require('dotenv').config();
const knex = require('./node_modules/knex');
const knexConfig = require('./dist/knexfile.js');
const db = knex(knexConfig.production);

async function migrate() {
  try {
    await db.raw('SELECT 1');
    console.log('DB Connected!');
    await db.migrate.latest();
    console.log('Migrations complete!');
    process.exit(0);
  } catch(e) {
    console.error('Error:', e.message, e.code);
    process.exit(1);
  }
}
migrate();
