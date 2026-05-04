/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("provinces", function (table) {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.timestamps(true, true);
    })
    .createTable("regencies", function (table) {
      table.increments("id");
      table.integer("province_id").unsigned().index();
      // .references("id")
      // .inTable("provinces");
      table.string("name", 50).notNullable();
      table.timestamps(true, true);
    })
    .createTable("districts", function (table) {
      table.increments("id");
      table.integer("regency_id").unsigned().index();
      // .references("id")
      // .inTable("regencies");
      table.string("name", 50).notNullable();
      table.timestamps(true, true);
    })

    .createTable("postcodes", function (table) {
      table.increments("id");
      table.integer("district_id").unsigned().index();
      // .references("id")
      // .inTable("districts");
      table.integer("postcode");
      table.unique(["district_id", "postcode"]);
      table.timestamps(true, true);
    })

    .createTable("villages", function (table) {
      table.increments("id");
      table.integer("district_id").unsigned().index();
      // .references("id")
      // .inTable("regencies");
      table.integer("postcode").index();
      table.string("name", 50).notNullable();
      table.timestamps(true, true);
    })

    .createTable("devices", function (table) {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.string("imei", 50).notNullable().unique().index();
      table.string("sim_id", 50).notNullable().unique().index();
      table.timestamps(true, true);
    })
    .createTable("device_elements", function (table) {
      table.bigIncrements("id");
      table.integer("device_id").unsigned().notNullable().index();
      table.timestamp("timestamp").notNullable().index();
      table.string("longitude", 20).notNullable();
      table.string("latitude", 20).notNullable();
      table.integer("altitude").notNullable();
      table.integer("angle").notNullable();
      table.integer("temperatur").notNullable();
      table.integer("ignition").notNullable().defaultTo(0);
      table.string("analog_input").notNullable().defaultTo(0);
      table.timestamps(true, true);
    })
    .createTable("projects", function (table) {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.timestamps(true, true);
    })
    .createTable("companies", function (table) {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.timestamps(true, true);
    })
    .createTable("project_devices", function (table) {
      table.increments("id");
      table.string("name", 50).notNullable();
      table.string("pic", 50).notNullable();
      table.string("phone", 30).notNullable();
      table.integer("device_id").unsigned().notNullable().index();
      table.integer("project_id").unsigned().notNullable().index();
      table.integer("company_id").unsigned().notNullable().index();
      table.string("address", 100).notNullable();
      table.integer("province_id").unsigned().notNullable();
      table.integer("regency_id").unsigned().notNullable();
      table.integer("district_id").unsigned().notNullable();
      table.integer("village_id").unsigned().notNullable().index();
      table.timestamps(true, true);
    })
    .createTable("device_parsers", function (table) {
      table.bigIncrements("id");
      table.text("imei", 50).nullable().index();
      table.json("buffer");
      table.timestamps(true, true);
    })
    .createTable("device_element_histories", function (table) {
      table.bigIncrements("id");
      table.bigInteger("device_parser_id").unsigned().notNullable().index();
      table.bigInteger("device_element_id").unsigned().notNullable().index();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("provinces")
    .dropTable("regencies")
    .dropTable("districts")
    .dropTable("postcodes")
    .dropTable("villages")
    .dropTable("devices")
    .dropTable("device_elements")
    .dropTable("projects")
    .dropTable("companies")
    .dropTable("project_devices")
    .dropTable("device_parsers")
    .dropTable("device_element_histories")
};
