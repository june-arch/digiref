import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("device_elements", function (table) {
    table.integer("temperature_4").nullable().after("temperatur");
    table.integer("temperature_3").nullable().after("temperatur");
    table.integer("temperature_2").nullable().after("temperatur");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("device_elements", function (table) {
    table.dropColumn("temperature_2");
    table.dropColumn("temperature_3");
    table.dropColumn("temperature_4");
  });
}

