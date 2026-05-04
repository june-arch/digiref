import db from "../../db";

const TABLE_ET = "t_cst_price_electrecities";
const TABLE_PL = "t_cst_price_places";
const TABLE_PPN = "t_ppn_percents";

let yourDate = new Date()
const curdate = yourDate.toISOString().split('T')[0]

export async function ecPrices(id: number) {
  return db(TABLE_ET).where({ 'id_cst_list': id, 'status': 1 }).where('tanggal_berlaku', '<=', curdate).first().orderBy('id', 'desc');
}
export async function plPrices(id: number) {
  return db(TABLE_PL).where({ 'id_cst_list': id, 'status': 1 }).where('tanggal_berlaku', '<=', curdate).first().orderBy('id', 'desc');
}
export async function ppn() {
  return db(TABLE_PPN).where('tanggal_berlaku', '<=', curdate).first().orderBy('id', 'desc');
}

