import db from "../db";

const TABLE = "history_alerts";

export async function findAllByDeviceId(deviceId: string) {
    return db.select('*')
    .from('history_alerts')
    .where({ device_id: deviceId })
    .whereRaw('DATE(created_at) = DATE(NOW())')
    .orderBy('created_at', 'desc')
    .limit(1);
}

export async function insert(
    docs: any
  ): Promise<{ id: number }[]> {
    return db(TABLE)
      .insert(docs)
      .returning("id");
  }