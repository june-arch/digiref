import db from "../db";

const TABLE = "regencies";

export async function findByProvinceId(provinceId: number) {
  return db.select("id", "province_id", "name").from(TABLE).where({
    province_id: provinceId,
  });
}

export async function findAll() {
  return db.select("id", "province_id", "name").from(TABLE);
}

export async function findById(id: number) {
  return db(TABLE).where({ id }).first("id", "province_id", "name");
}
