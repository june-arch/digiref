import db from "../db";

const TABLE = "districts";

export async function findByRegencyId(regencyId: number) {
  return db.select("id", "regency_id", "name").from(TABLE).where({
    regency_id: regencyId,
  });
}

export async function findAll() {
  return db.select("id", "regency_id", "name").from(TABLE);
}

export async function findById(id: number) {
  return db(TABLE).where({ id }).first("id", "regency_id", "name");
}
