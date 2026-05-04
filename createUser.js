require('dotenv').config();
const bcrypt = require('bcrypt')

const setPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

const start = async (username, password, roleId) => {
  const db = require('knex')({
    client: 'pg',
    connection: process.env.DB_URL
  });

  const hasPassowrd = await setPassword(password)
  return db('admins')
    .insert({
      username,
      password: hasPassowrd,
      role_id: roleId
    });
}

const [ , , username, password, roleId ] = process.argv

if (username && password) {
  start(username, password, roleId).then((data) => {
    console.log(data)
  })
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    process.exit()
  })
}
