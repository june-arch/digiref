import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("admins", function (table) {
    table.integer("role_id").after("password");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("admins", function (table) {
    table.dropColumn("role_id");
  });
}
