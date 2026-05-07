import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("project_devices", function (table) {
    table.integer("postcode_id").nullable().index();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("project_devices", function (table) {
    table.dropColumn("postcode_id");
  });
}
