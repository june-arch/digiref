import db from "../../db";

const TABLE = "t_customer_drivers";
const TABLE_LOG_DRIVER = "log_login_drivers";
// export async function regist(params: { nama: string, telpon: string, alamat: string, username: string, password: string, id_customer: string, status: number, created_at: Date,updated_at: Date }): Promise<{ id: number }[]> {
export async function regist(params: any): Promise<{ id: number }[]> {
  return await db(TABLE).insert(params).returning('id');
}

export async function insert({ nama }: { nama: string }): Promise<{ id: number }[]> {
  return await db(TABLE).insert({ nama }).returning('id');
}

export async function findAll() {
  return db.select("id", "name").from(TABLE);
}

export async function findById(id: number) {
  return db(TABLE).where({ id }).first("id", "username", "nama", "telpon");
}
export async function findByCustomer(id_customer: any) {
  return db(TABLE).select("id", "username", "nama", "telpon").where({ id_customer });
}
export async function findByUsername(username: string) {
  return db(TABLE).where({ username }).first();
}
// export async function findByUsername(id_customer: any) {
//   return db(TABLE).select("id", "username", "nama", "telpon").where({ id_customer });
// }

export async function countByUsername(username: string) {
  let data = await db(TABLE).count('username').where({ username });
  return data[0];
}

export async function insertLoginDriver({ params }: { params: any }): Promise<{ id: number }[]> {
  return await db(TABLE_LOG_DRIVER).insert(params).returning('id');
}
