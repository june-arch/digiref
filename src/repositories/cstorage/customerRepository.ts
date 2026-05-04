import db from "../../db";

const TABLE = "t_customers";
const TABLE_LOG_CUST = "log_login_customers";

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
  return db(TABLE).where({ id }).first('id', 'name');
}

export async function findByNik(nik: any) {
  return db(TABLE).where({ nik }).first();
}

export async function countByEmail(email: string) {
  let data = await db(TABLE).count('email').where({ email });
  return data[0];
}

export async function countByNik(nik: any) {
  let data = await db(TABLE).count('nik').where({ nik });
  return data[0];
}

export async function insertLoginCustomer({ params }: { params: any }): Promise<{ id: number }[]> {
  return await db(TABLE_LOG_CUST).insert(params).returning('id');
}

export async function updateLoginCustomer(params : { token: string, updated_at: Date, is_login: number}) {
  return await db(TABLE).update(params);
}