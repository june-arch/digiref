import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("history_alerts", function (table) {
      table.increments("id");
      table.string("title", 100).nullable();
      table.string("event_id", 100).nullable();
      table.integer("ignition_state").nullable();
      table.integer("temperature").nullable();
      table.string("color", 50).nullable();
      table.integer("ignition").nullable();
      table.boolean("alert").nullable();
      table.string("device_name",100).nullable();
      table.integer("device_id").nullable().index();
      table.dateTime("timestamp").nullable();
      table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("history_alerts")
}

