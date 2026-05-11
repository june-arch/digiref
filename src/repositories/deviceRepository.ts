import db from "../db";
import { UpdateDeviceType } from "../dto/deviceDto";

const TABLE = "devices";

export async function findAll(roleId: number, adminId?: number) {
  if (roleId === 1) {
    // Admin: return all devices
    return db.select("id", "name", "imei", 'sim_id', 'analog_1', 'analog_2', 'kalibrasi_1', 'kalibrasi_2', 'kalibrasi_temperatur_1', 'kalibrasi_temperatur_2', 'kalibrasi_temperatur_3', 'kalibrasi_temperatur_4').from(TABLE);
  }
  // Non-admin (tenant): filter by admin_id from project_devices
  return db.select("d.id", "d.name", "d.imei", 'd.sim_id', 'd.analog_1', 'd.analog_2', 'd.kalibrasi_1', 'd.kalibrasi_2', 'd.kalibrasi_temperatur_1', 'd.kalibrasi_temperatur_2', 'd.kalibrasi_temperatur_3', 'd.kalibrasi_temperatur_4')
    .from(`${TABLE} as d`)
    .join('project_devices as pd', 'd.id', 'pd.device_id')
    .where('pd.admin_id', adminId);
}

export async function insert({ name, imei, sim_id, analog_1, analog_2, kalibrasi_1, kalibrasi_2, kalibrasi_temperatur_1, kalibrasi_temperatur_2, kalibrasi_temperatur_3, kalibrasi_temperatur_4 }: { name: string, imei: string, sim_id: string, analog_1: string, analog_2: string, kalibrasi_1: string, kalibrasi_2: string, kalibrasi_temperatur_1: string, kalibrasi_temperatur_2: string, kalibrasi_temperatur_3: string, kalibrasi_temperatur_4: string, }): Promise<{ id: number }[]> {
  return await db(TABLE).insert({ name, imei, sim_id, analog_1, analog_2, kalibrasi_1: kalibrasi_1.toString(), kalibrasi_2: kalibrasi_2.toString(), kalibrasi_temperatur_1: kalibrasi_temperatur_1.toString(), kalibrasi_temperatur_2: kalibrasi_temperatur_2.toString(), kalibrasi_temperatur_3: kalibrasi_temperatur_3.toString(), kalibrasi_temperatur_4: kalibrasi_temperatur_4.toString() }).returning('id');
}

export async function findById(id: number) {
  return await db(TABLE).where({ id }).first("id", "name", "imei", "sim_id", "analog_1", "analog_2", "kalibrasi_1", "kalibrasi_2", 'kalibrasi_temperatur_1', 'kalibrasi_temperatur_2', 'kalibrasi_temperatur_3', 'kalibrasi_temperatur_4');
}

export async function update(
  id: number,
  params: UpdateDeviceType
): Promise<boolean> {
  const {
    name, imei, sim_id, analog_1, analog_2, kalibrasi_1, kalibrasi_2, kalibrasi_temperatur_1, kalibrasi_temperatur_2, kalibrasi_temperatur_3, kalibrasi_temperatur_4
  } = params;

  try {
    await db(TABLE).where("id", id).update({
      name, imei, sim_id, analog_1, analog_2, kalibrasi_1: kalibrasi_1.toString(), kalibrasi_2: kalibrasi_2.toString(), kalibrasi_temperatur_1: kalibrasi_temperatur_1.toString(), kalibrasi_temperatur_2: kalibrasi_temperatur_2.toString(), kalibrasi_temperatur_3: kalibrasi_temperatur_3.toString(), kalibrasi_temperatur_4: kalibrasi_temperatur_4.toString()
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteOneDevice(
  id: number,
): Promise<boolean> {
  try {
    await db(TABLE).where("id", id).del()
    return true;
  } catch (error) {
    return false;
  }
}