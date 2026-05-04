import db from "../db";
import { BeaconSearchType } from "../dto/beaconDto";
import { formater } from "../services/dateService";


const TABLE = "device_elements";

export async function latest() {
  const result = await db.raw(
    ` SELECT device_id, MAX(concat(timestamp, '_', id)) concat_id  FROM ${TABLE} GROUP BY device_id`
  );
  const ids = result?.rows.map((r: any) => {
    const [_, id] = r.concat_id?.split("_");
    return Number(id);
  });

  const rows = await db
    .select("*")
    .from(TABLE)
    .join("devices", "devices.id", "device_elements.device_id")
    .whereIn("device_elements.id", ids);
  return getFormatData(rows);
}

export async function latestById(
  deviceId: number,
  dateForma: boolean,
  { start, end }: BeaconSearchType
) {
  const rows = await db
    .select("*")
    .from(TABLE)
    .join("devices", "devices.id", "device_elements.device_id")
    .where((builder) => {
      builder.where("device_id", deviceId);
      if (start && end) {
        builder.whereBetween("timestamp", [start, end]);
      }
    })
    .orderBy('device_elements.timestamp', 'desc');
  // .limit(limit)
  // .offset((page - 1) * limit)
  return getFormatData(rows, dateForma);
}

export async function weeklyAverage(deviceId: number) {
  // Formater https://blog.quest.com/exploring-postgres-date-formats-and-their-different-functions/
  const result = await db.raw(
    ` SELECT to_char(timestamp, 'D') day_week, 
        MAX(concat(timestamp, '_', id)), 
        AVG(temperatur) as avg_temperatur
  FROM ${TABLE}
  WHERE device_id = ? AND 
    timestamp BETWEEN
    NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
    AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
  GROUP BY day_week;
  `,
    [deviceId]
  );

  const values: { index: number; value: number }[] = [];
  for (let index = 0; index < 7; index++) {
    values.push({
      index,
      value: 0,
    });
  }

  result?.rows.forEach((r: any) => {
    const { day_week, avg_temperatur } = r;
    const D = day_week - 1;
    values[D].value = Number(avg_temperatur) / 10;
  });

  return values;
}

export async function dailyAverage(deviceId: number) {
  // Formater https://blog.quest.com/exploring-postgres-date-formats-and-their-different-functions/
  const result = await db.raw(
    `SELECT to_char(timestamp, 'DD/MM') as date, 
        MAX(concat(timestamp, '_', id)), 
        AVG(temperatur) as avg_temperatur
  FROM ${TABLE}
  WHERE device_id = ? AND 
    timestamp  > now() - interval '30 day'
    GROUP BY date
  `,
    [deviceId]
  );

  return result?.rows.map((r: any) => {
    const { date, avg_temperatur } = r;
    return {
      index: date,
      value: Number(avg_temperatur) / 10,
    };
  });
}

const getFormatData = (rows: Record<string, number>[], dateFormat?: boolean) => {
  return rows?.map((e: any) => {
    //analog sensor
    const analog_1 = e?.analog_input ? Number(e?.analog_input) : 0;
    const analog_2 = e?.analog_input2 ? Number(e?.analog_input2) : 0;
    const kalibrasi_1 = e?.kalibrasi_1 ? Number(e?.kalibrasi_1) : 0;
    const kalibrasi_2 = e?.kalibrasi_2 ? Number(e?.kalibrasi_2) : 0;
    const label_analog_1 = e?.analog_1 ?? 'analog_1';
    const label_analog_2 = e?.analog_2 ?? 'analog_2';
    //temperatur sensor
    let temperatur = 1000;
    const kalibrasi_temperatur_1 = e.kalibrasi_temperatur_1 ? Number(e.kalibrasi_temperatur_1) : 0;
    let temperatur_2 = 1000;
    const kalibrasi_temperatur_2 = e.kalibrasi_temperatur_2 ? Number(e.kalibrasi_temperatur_2) : 0; 
    let temperatur_3 = 1000;
    const kalibrasi_temperatur_3 = e.kalibrasi_temperatur_3 ? Number(e.kalibrasi_temperatur_3) : 0; 
    let temperatur_4 = 1000;
    const kalibrasi_temperatur_4 = e.kalibrasi_temperatur_4 ? Number(e.kalibrasi_temperatur_4) : 0;
    if(e?.temperatur) {
      temperatur = kalibrasi_temperatur_1 + (e?.temperatur / 10);
    }
    if(e?.temperature_2) {
      temperatur_2 = kalibrasi_temperatur_2 + (e?.temperature_2 / 10);
    }
    if(e?.temperature_3) {
      temperatur_3 = kalibrasi_temperatur_3 + (e?.temperature_3 / 10);
    }
    if(e?.temperature_4) {
      temperatur_4 = kalibrasi_temperatur_4 + (e?.temperature_4 / 10);
    }
    return {
      device_id: e?.device_id,
      device_name: e?.name,
      timestamp: dateFormat ? formater(e?.timestamp) : e?.timestamp,
      longitude: e?.longitude,
      latitude: e?.latitude,
      altitude: e?.altitude,
      angle: e?.angle,
      analog_1: {
        label: label_analog_1 ?? '',
        value: kalibrasi_1 ? Number(kalibrasi_1) + analog_1 : analog_1,
      },
      analog_2: {
        label: label_analog_2 ?? '',
        value: kalibrasi_2 ? Number(kalibrasi_2) + analog_2 : analog_2,
      },
      temperatur,
      temperatur_2,
      temperatur_3,
      temperatur_4,
      ignition: e?.ignition,
      analogInput: Number(e?.analog_input)
    };
  });
};
