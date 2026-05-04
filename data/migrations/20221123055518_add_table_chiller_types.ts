import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("chiller_types", function (table) {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
  .dropTable("chiller_types")
}

