import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("project_devices", function (table) {
    table.integer("chiller_type_id").index();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("admins", function (table) {
    table.dropColumn("chiller_type_id");
  });
}

