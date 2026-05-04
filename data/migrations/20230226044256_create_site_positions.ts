import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("site_positions", function (table) {
      table.increments("id");
      table.integer("project_device_id").nullable().index();
      table.string("name", 100).nullable();
      table.string("xPos", 255).notNullable();
      table.string("yPos", 255).notNullable();
      table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
  .dropTable("site_positions")
}

