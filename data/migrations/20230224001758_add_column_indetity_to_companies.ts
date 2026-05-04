import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("companies", function (table) {
        table.string("logo", 50).nullable();
        table.text("alamat").nullable();
        table.integer("province_id").nullable().index();
        table.integer("regencie_id").nullable().index();
        table.integer("village_id").nullable().index();
        table.integer("postcode_id").nullable().index();
        table.string("email", 320).nullable();
        table.string("contact_person", 255).nullable();
        table.string("no_hp", 20).nullable();
        
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("companies", function (table) {
        table.dropColumn("logo");
        table.dropColumn("alamat");
        table.dropColumn("province_id");
        table.dropColumn("regencie_id");
        table.dropColumn("village_id");
        table.dropColumn("postcode_id");
        table.dropColumn("email");
        table.dropColumn("contact_person");
        table.dropColumn("no_hp");
      });
}

