import db from "../../db";

const TABLE = "t_komoditas";
const TABLE_TP = "t_tipe_packs";
const TABLE_KS = "t_komoditas_sizes";

export async function insert({ nama }: { nama: string }): Promise<{ id: number }[]> {
  return await db(TABLE).insert({ nama }).returning('id');
}

export async function findAll() {
  return db.select("id", "nama").from(TABLE);
}
export async function tipePackList() {
  return db.select("id", "nama").where({ 'status': 1 }).from(TABLE_TP);
}

export async function komoditasList(id: number) {
  return db(TABLE).select("id", "nama", "id_tipe_pack").where({ 'id_tipe_pack': id, 'status': 1 });
}

export async function komoditasSizeList(id: number) {
  return db(TABLE_KS).select("id", "nama", "id_komoditas").where({ 'id_komoditas': id, 'status': 1 });
}
