import db from "../db";
import { CreateTenant, UpdateTenant } from "../dto/tenantDto";
import { setPassword } from "../services/authService";
import {ResultKnex, Tenant} from "../interfaces"
import _ from "lodash";

const TABLE = "admins";
const COMPANY = "companies";
const VILLAGES = "villages";
const DISTRICTS = "districts";
const REGENCIES = "regencies";
const PROVINCES = "provinces";

export async function insert(
  params: CreateTenant,
  fileName: string
): Promise<ResultKnex<{ id: number }[]>> {
  const {
    username,
    password,
    role_id,
    alamat,
    email,
    no_hp,
    name,
    postcode_id,
    contact_person,
    village_id
  } = params;
  try{
    let result: {id:number}[] = [];
    await db.transaction(async (trx) => {
      // Save the company data
      const [company] = await trx(COMPANY).insert({name, alamat, email, contact_person, village_id, postcode_id, no_hp, logo: fileName }).returning('id');

     // Save the admin data with the company ID
     result = await trx(TABLE)
     .insert({ username, name, email, password: await setPassword(password), role_id, company_id: company.id })
     .returning("id");
    })

    return {data: result, success: true, message: "sukses simpan tenant", code: 201}
  }catch (err: any){
    return { success: false, message: err.message, code: 500 };
  }
}

export async function update(
  id: number,
  company_id: number,
  params: UpdateTenant,
  filename: string
): Promise<ResultKnex<{ id: number }[]>> {
  let {
    username,
    password,
    role_id,
    alamat,
    email,
    no_hp,
    name,
    postcode_id,
    contact_person,
    village_id
  } = params;
  if(password) password = await setPassword(password);
  delete params.id;

  try{
    let result: {id:number}[] = [];
    await db.transaction(async (trx) => {
      const company: any = {};
      const tempCompany: any = {name, alamat, email, contact_person, village_id, postcode_id, no_hp, logo: filename };
      for (const key in tempCompany) {
        const value = tempCompany[key]
        console.log(value);
        console.log(key);
        if (value) {
          company[key] = value
        }
      }
      // update the company data
      if(!_.isEmpty(company)) await trx(COMPANY).where("id", company_id).update({...company}).returning('id');

      const tempTenant: any = { username, password, role_id};
      const tenant: any = {};
      for (const key in tempTenant) {
        const value = tempTenant[key]
        if (value) {
          tenant[key] = value
        }
      }
      // update the admin data with the company ID
      if(!_.isEmpty(tenant)) await trx(TABLE).where("id", id).update({...tenant}).returning("id");
      
    })

    return {data: result, success: true, message: "sukses update tenant", code: 201}
  }catch (err: any){
    return { success: false, message: err.message, code: 500 };
  }  
}

export async function updatePassword(
  id: number,
  password: string,
): Promise<ResultKnex<{ id: number }[]>> {
  if(password) password = await setPassword(password);

  try{
    let result: {id:number}[] = [];
    await db(TABLE).where("id", id).update({password}).returning('id');

    return {data: result, success: true, message: "sukses update password", code: 201}
  }catch (err: any){
    return { success: false, message: err.message, code: 500 };
  }  
}

export async function deleteAdmin(id: number, id_company: number): Promise<ResultKnex<{ id: number }[]>> {
  try{
    db.transaction(async (trx) => {
      await trx(TABLE)
      .where("id", id)
      .where("company_id", id_company)
      .delete()
      .returning('id');
      await trx(COMPANY).where("id", id_company).delete();
    })

    return {data: [{id}], success: true, message: "sukses hapus tenant", code: 200}
  }catch (err: any){
    return { success: false, message: err.message, code: 500 };
  }  
}

const SELECT_TENANT = [
  `${TABLE}.*`,
  `${COMPANY}.name as name`,
  `${COMPANY}.email as email`,
  `${COMPANY}.alamat as alamat`,
  `${COMPANY}.contact_person as contact_person`,
  `${COMPANY}.logo as logo`,
  `${COMPANY}.no_hp as no_hp`,
  `${REGENCIES}.province_id`,
  `${PROVINCES}.name as province_name`,
  `${DISTRICTS}.regency_id`,
  `${REGENCIES}.name as regency_name`,
  `${VILLAGES}.district_id`,
  `${DISTRICTS}.name as district_name`,
  `${COMPANY}.village_id`,
  `${VILLAGES}.name as village_name`,
  `${VILLAGES}.postcode as postcode`
];

export async function findAll() {
  let result = await db(TABLE).select(SELECT_TENANT)
  .join(COMPANY, `${TABLE}.company_id`, `${COMPANY}.id`)
  .join(VILLAGES, `${VILLAGES}.id`, `${COMPANY}.village_id`)
  .join(DISTRICTS, `${DISTRICTS}.id`, `${VILLAGES}.district_id`)
  .join(REGENCIES, `${REGENCIES}.id`, `${DISTRICTS}.regency_id`)
  .join(PROVINCES, `${PROVINCES}.id`, `${REGENCIES}.province_id`)
  .whereNot(`${TABLE}.id`, 1).orderBy('created_at', 'desc')

  if(result && result.length > 0) {
    return result.map((item: any) => {
      item.logo = item.logo ? item.logo : '';
      return item;
    })
  }else{
    return result
  }
}

export async function findById(id: number) {
    let result: Tenant[] = await db(TABLE).select(SELECT_TENANT)
    .join(COMPANY, `${TABLE}.company_id`, `${COMPANY}.id`)
    .join(VILLAGES, `${VILLAGES}.id`, `${COMPANY}.village_id`)
    .join(DISTRICTS, `${DISTRICTS}.id`, `${VILLAGES}.district_id`)
    .join(REGENCIES, `${REGENCIES}.id`, `${DISTRICTS}.regency_id`)
    .join(PROVINCES, `${PROVINCES}.id`, `${REGENCIES}.province_id`)
    .where(`${TABLE}.id`, id);
    if(result && result.length > 0) {
      return result.map((item: any) => {
        item.logo = item.logo ? item.logo : '';
        return item;
      }).shift();
    }else{
      return result.shift();
    }
}

