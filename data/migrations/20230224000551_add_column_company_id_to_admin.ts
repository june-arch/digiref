import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("admins", function (table) {
        table.integer("company_id").nullable().after("id").index();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("admins", function (table) {
        table.dropColumn("company_id");
      });
}

