import db from "../db";

const TABLE = "villages";

export async function findAll() {
  return db.select("id", "district_id", "postcode", "name").from(TABLE);
}

export async function findByDistrictId(districtId: number) {
  return db.select("id", "district_id", "postcode", 'name').from(TABLE).where({
    district_id: districtId,
  });
}
