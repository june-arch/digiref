/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const fs = require("fs");
  const path = require("path");
  const zlib   = require('zlib');
  const list = ['provinces', 'regencies', 'districts', 'postcodes', 'villages']
  for (const item of list) {
    const sql = zlib.gunzipSync(fs.readFileSync(path.resolve(__dirname, `${item}.sql.gz`))).toString();
    await knex.raw(`TRUNCATE TABLE ${item} CASCADE`)
    await knex.raw(sql)
  }
  
  return true
};
