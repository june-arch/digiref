import db from "../db";

const TABLE = "postcodes";

export async function findAll() {
  return db.select("id", "district_id", "postcode").from(TABLE);
}

export async function findByDistrictId(districtId: number) {
  return db.select("id", "district_id", "postcode").from(TABLE).where({
    district_id: districtId,
  });
}
