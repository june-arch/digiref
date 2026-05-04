import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("project_devices", function (table) {
        table.string("gambar_site", 50).nullable();
        table.integer("province_id").nullable().index().alter();
        table.integer("regency_id").nullable().index().alter();
        table.integer("district_id").nullable().index().alter();
        table.integer("village_id").nullable().index().alter();
        table.integer("postcode_id").nullable().index();
        table.integer("company_id").nullable().index().alter();
        table.integer("project_id").nullable().index().alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("project_devices", function (table) {
        table.dropColumn("gambar_site");
        table.dropColumn("postcode_id");
      });
}


