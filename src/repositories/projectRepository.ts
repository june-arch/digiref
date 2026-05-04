import db from "../db";

const TABLE = "projects";

export async function insert({ name }: { name: string }): Promise<{ id: number }[]> {
  return await db(TABLE).insert({ name }).returning('id');
}

export async function findAll() {
  return db.select("id", "name").from(TABLE);
}

export async function findById(id: number) {
  return db(TABLE).where({ id }).first('id', 'name');
}

export async function update(id: number, { name }: { name: string }): Promise<boolean> {
  try {
    await db(TABLE).where({ id }).update({ name });
    return true;
  } catch {
    return false;
  }
}

export async function deleteOne(id: number): Promise<boolean> {
  try {
    await db(TABLE).where({ id }).del();
    return true;
  } catch {
    return false;
  }
}
