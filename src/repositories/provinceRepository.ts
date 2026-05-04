import db from "../db";

const TABLE = "provinces";

export async function findAll() {
  return db.select("id", "name").from(TABLE);
}

export async function findById(id: number) {
  return db(TABLE).where({ id }).first('id', 'name');
}
