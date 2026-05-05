import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("devices", function (table) {
    table.string("analog_1", 50).defaultTo("0").nullable();
    table.string("analog_2", 50).defaultTo("0").nullable();
    table.string("kalibrasi_1", 50).defaultTo("0").nullable();
    table.string("kalibrasi_2", 50).defaultTo("0").nullable();
    table.string("kalibrasi_temperatur_1", 50).defaultTo("0").nullable();
    table.string("kalibrasi_temperatur_2", 50).defaultTo("0").nullable();
    table.string("kalibrasi_temperatur_3", 50).defaultTo("0").nullable();
    table.string("kalibrasi_temperatur_4", 50).defaultTo("0").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("devices", function (table) {
    table.dropColumn("analog_1");
    table.dropColumn("analog_2");
    table.dropColumn("kalibrasi_1");
    table.dropColumn("kalibrasi_2");
    table.dropColumn("kalibrasi_temperatur_1");
    table.dropColumn("kalibrasi_temperatur_2");
    table.dropColumn("kalibrasi_temperatur_3");
    table.dropColumn("kalibrasi_temperatur_4");
  });
}
