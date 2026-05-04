import db from "../db";

const TABLE = "admins";
const COMPANY = "companies";

export async function findByUsername(username: string) {
  return db(TABLE).select(`${TABLE}.*`, `${COMPANY}.logo as logo`)
    .leftJoin(COMPANY, `${TABLE}.company_id`, `${COMPANY}.id`)
    .where(`${TABLE}.username`, username)
    .first(`${TABLE}.id`, `${TABLE}.username`, "password", "role_id", `${COMPANY}.logo`);
}

export async function findByEmail(email: string) {
  return db(TABLE).select(`${TABLE}.*`, `${COMPANY}.logo as logo`)
    .leftJoin(COMPANY, `${TABLE}.company_id`, `${COMPANY}.id`)
    .where(`${TABLE}.email`, email)
    .first(`${TABLE}.id`, `${TABLE}.email`, "password", "role_id", `${COMPANY}.logo`);
}
