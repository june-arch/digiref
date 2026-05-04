import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("device_elements", function (table) {
    table.integer('analog_input2').nullable();
    table.integer('din_1').nullable();
    table.integer('din_2').nullable();
    table.integer('din_3').nullable();
    table.integer('dout_1').nullable();
    table.integer('dout_2').nullable();
    table.integer('dout_3').nullable();
    table.integer('sleep_mode').nullable();
    table.integer('gnss_status').nullable();
    table.integer('ext_voltage').nullable();
    table.integer('battery_voltage').nullable();
    table.integer('gsm_signal').nullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('device_elements', function (table) {
    table.dropColumn('analog_input2');
    table.dropColumn('din_1');
    table.dropColumn('din_2');
    table.dropColumn('din_3');
    table.dropColumn('dout_1');
    table.dropColumn('dout_2');
    table.dropColumn('dout_3');
    table.dropColumn('sleep_mode');
    table.dropColumn('gnss_status');
    table.dropColumn('ext_voltage');
    table.dropColumn('battery_voltage');
    table.dropColumn('gsm_signal');
  });
}

