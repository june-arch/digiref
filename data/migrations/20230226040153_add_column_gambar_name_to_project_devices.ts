import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("project_devices", function (table) {
        table.string("gambar_name", 100).nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("project_devices", function (table) {
        table.dropColumn("gambar_name");
      });
}


