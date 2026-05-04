import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("admins", function (table) {
      table.increments("id");
      table.string("username", 30).notNullable().index();
      table.string("password").notNullable();
      table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
  .dropTable("admins")
}

