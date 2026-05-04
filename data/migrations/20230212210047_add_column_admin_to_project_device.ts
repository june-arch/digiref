import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("project_devices", function (table) {
        table.integer("admin_id").nullable().after("company_id").index();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("project_devices", function (table) {
        table.dropColumn("admin_id");
    });
}

