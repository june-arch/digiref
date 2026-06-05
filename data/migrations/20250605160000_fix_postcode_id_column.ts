import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn("project_devices", "postcode_id");
  if (!hasColumn) {
    await knex.schema.alterTable("project_devices", function (table) {
      table.integer("postcode_id").nullable().index();
    });
  }
}

export async function down(_knex: Knex): Promise<void> {
  // noop - do not drop, as the original 20230226 migration may have created it
}
