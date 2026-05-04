/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex('chiller_types').insert([
    {
      id: 1,
      name: '2022 Air Blast Freezer',
    },
    {
      id: 2,
      name: '2022 Chiller Bawang',
    },
    {
      id: 3,
      name: '2022 Reefer Container',
    },
  ]);
  
};
