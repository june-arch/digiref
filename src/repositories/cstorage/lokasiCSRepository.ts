import db from "../../db";

const TABLE = "t_cst_locations";
const TABLE_CS = "t_cst_lists";
const TABLE_LD = "t_cst_loading_docks";
const TABLE_SESI = "t_cst_sessions";
const TABLE_CHAMBER = "t_cst_chambers";
const TABLE_PALLETE = "t_cst_palletes";

export async function insert({ nama }: { nama: string }): Promise<{ id: number }[]> {
  return await db(TABLE).insert({ nama }).returning('id');
}

export async function findAll() {
  return db.select("id", "nama").from(TABLE);
}
export async function findActive() {
  return db.select("id", "nama").where({ 'status': 1 }).from(TABLE);
}
export async function sesi() {
  return db.select("id", "nama_sesi", "jam_mulai", "jam_berakhir").where({ 'status': 1 }).from(TABLE_SESI);
}

export async function CSList(id: number) {
  return db(TABLE_CS).select("id", "nama", "id_lokasi_cst").where({ 'id_lokasi_cst': id, 'status': 1 });
}
export async function detailCS(id: number) {
  return db(TABLE_CS).select("id", "nama", "id_lokasi_cst").where({ 'id': id}).first();
}

export async function LDList(id: number) {
  return db(TABLE_LD).select("id", "keterangan", "id_cst_list").where({ 'id_cst_list': id, 'status': 1 });
}
export async function CBRList(id: number) {
  return db(TABLE_CHAMBER).select("id", "keterangan", "id_cst_list").where({ 'id_cst_list': id, 'status': 1 });
}
export async function PLTList(id: number) {
  return db(TABLE_PALLETE).select("id", "nama", "baris", "kolom", "layer", "id_cst_chamber").where({ 'id_cst_chamber': id, 'status': 1 });
}
