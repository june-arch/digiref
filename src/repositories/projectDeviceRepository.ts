import db from "../db";
import { CreateGambarProjectType, CreateGambarUploadProjectType, CreateProjectType, DeleteGambarProjectType } from "../dto/projectDeviceDto";
import { Chiller } from "../services/ChillerService";

const TABLE = "project_devices";
const ADMINS = "admins";
const DEVICES = "devices";
const CHILLER_TYPES = "chiller_types";
const COMPANIES = "companies";
const VILLAGES = "villages";
const DISTRICTS = "districts";
const REGENCIES = "regencies";
const PROVINCES = "provinces";
const SITE_POSITIONS = "site_positions";

const QUERY = `SELECT 
    ${TABLE}.id,
    ${TABLE}.name,
    ${TABLE}.pic,
    ${TABLE}.phone,
    ${TABLE}.address,
    ${TABLE}.gambar_site,
    ${TABLE}.device_id,
    ${DEVICES}.name as device_name,
    ${DEVICES}.analog_1 as device_analog_1,
    ${DEVICES}.analog_2 as device_analog_2,
    ${DEVICES}.kalibrasi_1 as device_kalibrasi_1,
    ${DEVICES}.kalibrasi_2 as device_kalibrasi_2,
    ${DEVICES}.kalibrasi_temperatur_1 as device_kalibrasi_temperatur_1,
    ${DEVICES}.kalibrasi_temperatur_2 as device_kalibrasi_temperatur_2,
    ${DEVICES}.kalibrasi_temperatur_3 as device_kalibrasi_temperatur_3,
    ${DEVICES}.kalibrasi_temperatur_4 as device_kalibrasi_temperatur_4,
    ${TABLE}.chiller_type_id,
    ${CHILLER_TYPES}.name as chiller_type,
    ${TABLE}.admin_id,
    ${ADMINS}.role_id as admin_role,
    ${PROVINCES}.id as provincial_id,
    ${PROVINCES}.name as province_name,
    ${REGENCIES}.id as regency_id,
    ${REGENCIES}.name as regency_name,
    ${DISTRICTS}.id as district_id,
    ${DISTRICTS}.name as district_name,
    ${VILLAGES}.id as village_id,
    ${VILLAGES}.name as village_name,
    ${VILLAGES}.postcode as postcode,
    ${COMPANIES}.email as email,
    ${COMPANIES}.name as tenant_name,
    ${ADMINS}.username as tenant_username


  FROM ${TABLE}
  LEFT JOIN ${ADMINS} ON ${ADMINS}.id = ${TABLE}.admin_id
  LEFT JOIN ${COMPANIES} ON ${COMPANIES}.id = ${ADMINS}.company_id
  LEFT JOIN ${DEVICES} ON ${DEVICES}.id = ${TABLE}.device_id
  LEFT JOIN ${CHILLER_TYPES} ON ${CHILLER_TYPES}.id = ${TABLE}.chiller_type_id
  LEFT JOIN ${VILLAGES} ON ${VILLAGES}.id = ${TABLE}.village_id
  LEFT JOIN ${DISTRICTS} ON ${DISTRICTS}.id = ${VILLAGES}.district_id
  LEFT JOIN ${REGENCIES} ON ${REGENCIES}.id = ${DISTRICTS}.regency_id
  LEFT JOIN ${PROVINCES} ON ${PROVINCES}.id = ${REGENCIES}.province_id
  
  `.replace(/[\n\t\r]/g, " ");
export async function insert(
  params: CreateProjectType
): Promise<{ id: number }[]> {
  const {
    name,
    pic,
    phone,
    address,
    device_id,
    tenant_id,
    chiller_type_id,
    village_id,
    postcode_id,
  } = params;
  return db(TABLE)
    .insert({
      name,
      pic,
      phone,
      address,
      device_id,
      admin_id: tenant_id,
      chiller_type_id,
      village_id,
      postcode_id,
    })
    .returning("id");
}

export async function update(
  id: number,
  params: CreateProjectType
): Promise<void> {
  const {
    name,
    pic,
    phone,
    address,
    device_id,
    tenant_id,
    chiller_type_id,
    village_id,
    postcode_id,
  } = params;
  return db(TABLE).where("id", id).update({
    name,
    pic,
    phone,
    address,
    device_id,
    admin_id: tenant_id,
    chiller_type_id,
    village_id,
    postcode_id,
  });
}

export async function updateAssignAdmin(
  id: number,
  id_admin: number
): Promise<void> {
  return db(TABLE).where("id", id).update({admin_id: id_admin});
}

export async function findAllForCron() {
  let result = await db.raw(QUERY);
  const rows = result?.rows ?? [];
  return await addDeviceElements(rows);
}

export async function findAll(role: number, admin: number) {
  let result = await db.raw(QUERY + `${admin ? ' WHERE admins.id = ' + admin + ' AND admins.role_id = ' + role : ''}`);
  const rows = result?.rows ?? [];
  return await addDeviceElements(rows);
}

export async function findById(id: number, admin: number, role:number) {
  let result = await db.raw(QUERY + `WHERE ${TABLE}.id = ${id} ${admin ? `AND ${ADMINS}.id = ${admin} AND ${ADMINS}.role_id = ${role}` : ''}`);
  const rows = result?.rows ?? [];
  return await addDeviceElements(rows);
}

export async function findByIdRaw(id: number) {
  let result: any[] = await db(TABLE).select(`${TABLE}.*`)
  .where(`${TABLE}.id`, id);
  return result.shift();
}

export async function findProvince() {
  const result = await db
    .select("project_devices.province_id", "provinces.name as province")
    .from("project_devices")
    .join("provinces", "provinces.id", "project_devices.province_id")
    .groupBy("project_devices.province_id", "provinces.name");

  return result;
}

export async function insertGambar(
  params: CreateGambarProjectType
): Promise<{ id: number }[]> {
  const {
    id,
   position_site
  } = params;

  const findAllById = await db('site_positions').where('project_device_id', id);

  if(findAllById && findAllById.length > 0) {
    const ids = findAllById.map(id => id.id);
    await db('site_positions').whereIn('id', ids).del();
  }

  const doc = position_site.map((site: any) => {
    return {
      project_device_id: id,
      ...site
    }
  })

  return db('site_positions')
    .insert(doc)
    .returning("id");
}

export async function updateGambar(
  params: CreateGambarProjectType
): Promise<boolean> {
  const {
    id,
   position_site
  } = params;

  try {
    await db.transaction(async (trx) =>{
      for(let site of position_site) {
        const {id:site_id, ...doc} = site;
        await trx('site_positions').where("id", site_id).update({
          project_device_id: id,
          ...doc
        });
      }
    })
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteGambar(
  params: DeleteGambarProjectType
): Promise<boolean> {
  const {
   position_site
  } = params;

  const ids = position_site.map(id => id.id);

  return await db('site_positions').whereIn('id', ids).del();
}

export async function deleteProjectDevice(id: number): Promise<boolean> {
  try {
    await db(TABLE).where("id", id).del();
    return true;
  } catch {
    return false;
  }
}

export async function insertGambarUpload(
  params: CreateGambarUploadProjectType,
  filename: string
): Promise<{ id: number }[]> {
  const {
    id,
  } = params;
  return db(TABLE)
    .where("id", id)
    .update({
      gambar_site: filename,
    })
    .returning("id");
}

export async function findPositionSiteByProjectDeviceId(id: number) {
  let result = await db(SITE_POSITIONS).where("project_device_id", id);
  return result;
}


const addDeviceElements = async (rows: Record<any, any>[]) => {
  const deviceIds = rows.map((r: any) => r.device_id);
  const latestData = await db
    .select(
      {
        concatId: db.raw(`MAX(CONCAT(timestamp, '_', id))`),
      }
    )
    .from("device_elements")
    .groupBy("device_id")
    .whereIn("device_id", deviceIds);
  const deviceElementIds = latestData?.map((r: any) => {
    const [_, id] = r.concatId?.split("_");
    return Number(id);
  });

  const result = await db
    .select(
      "device_id",
      "timestamp",
      "latitude",
      "longitude",
      "altitude",
      "angle",
      "temperatur",
      "temperature_2",
      "temperature_3",
      "temperature_4",
      "ignition",
      "analog_input",
      "analog_input2"
    )
    .from("device_elements")
    .whereIn("id", deviceElementIds);
  const devices: Record<string, any> = {};
  result?.forEach((r: any) => {
    devices[r.device_id] = r;
  });
  return rows.map((r: any) => {
    let d: any = {};
    if (r.device_id in devices) {
      d = devices[r.device_id];
    }
    const analog_1 = d?.analog_input ? Number(d?.analog_input) : 0;
    const analog_2 = d?.analog_input2 ? Number(d?.analog_input2) : 0;
    const kalibrasi_1 = r?.kalibrasi_1 ? Number(r?.kalibrasi_1) : 0;
    const kalibrasi_2 = r?.kalibrasi_2 ? Number(r?.kalibrasi_2) : 0;
    const label_analog_1 = r?.analog_1 ?? 'analog_1';
    const label_analog_2 = r?.analog_2 ?? 'analog_2';

    //temperatur sensor
    let temperatur = 1000.01;
    const kalibrasi_temperatur_1 = r.kalibrasi_temperatur_1 ? Number(r.kalibrasi_temperatur_1) : 0;
    let temperatur_2 = 1000.01;
    const kalibrasi_temperatur_2 = r.kalibrasi_temperatur_2 ? Number(r.kalibrasi_temperatur_2) : 0; 
    let temperatur_3 = 1000.01;
    const kalibrasi_temperatur_3 = r.kalibrasi_temperatur_3 ? Number(r.kalibrasi_temperatur_3) : 0; 
    let temperatur_4 = 1000.01;
    const kalibrasi_temperatur_4 = r.kalibrasi_temperatur_4 ? Number(r.kalibrasi_temperatur_4) : 0;
    if(d?.temperatur) {
      temperatur = kalibrasi_temperatur_1 + (d?.temperatur / 10);
    }
    if(d?.temperature_2) {
      temperatur_2 = kalibrasi_temperatur_2 + (d?.temperature_2 / 10);
    }
    if(d?.temperature_3) {
      console.log(';masuk')
      temperatur_3 = kalibrasi_temperatur_3 + (d?.temperature_3 / 10);
    }
    if(d?.temperature_4) {
      temperatur_4 = kalibrasi_temperatur_4 + (d?.temperature_4 / 10);
    }

    const chiller = Chiller.instance(
      r.chiller_type,
      d.timestamp,
      d.ignition,
      temperatur
    )
    // if (d.device_id === 8) {
    //   console.log(
    //     r.chiller_type,
    //     d.timestamp,
    //     d.ignition,
    //     temperature,
    //     chiller.color,
    //     chiller.alert
    //   )
    // }
    delete d.temperatur;
    delete d.temperature_2;
    delete d.temperature_3;
    delete d.temperature_4;
    delete d.analog_input;
    delete d.analog_input2;
    delete r.device_analog_1;
    delete r.device_analog_2;
    delete r.device_kalibrasi_1;
    delete r.device_kalibrasi_2;
    
    return {
      ...r,
      ...d,
      temperatur,
      analog_1: {
        label: label_analog_1 ?? '',
        value: kalibrasi_1 ? Number(kalibrasi_1) + analog_1 : analog_1,
      },
      analog_2: {
        label: label_analog_2 ?? '',
        value: kalibrasi_2 ? Number(kalibrasi_2) + analog_2 : analog_2,
      },
      chiller: {
        ...d,
        temperatur,
        temperatur_2,
        temperatur_3,
        temperatur_4,
        alert: chiller.alert,
        color: chiller.color,
      }
    };
  });
};

