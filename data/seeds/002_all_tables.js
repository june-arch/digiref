/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Reset order matters for foreign keys
  await knex('device_element_histories').del();
  await knex('site_positions').del();
  await knex('device_elements').del();
  await knex('device_parsers').del();
  await knex('history_alerts').del();
  await knex('project_devices').del();
  await knex('devices').del();
  await knex('projects').del();
  await knex('companies').del();
  await knex('admins').del();
  await knex('roles').del();
  await knex('chiller_types').del();

  // ── 1. Roles ──────────────────────────────────────────────
  await knex('roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'tenant' },
  ]);

  // ── 2. Chiller Types ──────────────────────────────────────
  await knex('chiller_types').insert([
    { id: 1, name: '2022 Air Blast Freezer' },
    { id: 2, name: '2022 Chiller Bawang' },
    { id: 3, name: '2022 Reefer Container' },
  ]);

  // ── 3. Companies ──────────────────────────────────────────
  await knex('companies').insert([
    { id: 1, name: 'PT DigiRef Indonesia', identity: 'digiref-identity-001', logo: null, alamat: 'Jl. Raya DigiRef No. 1, Jakarta', contact_person: 'Admin DigiRef', no_hp: '628123456789', village_id: 13794, postcode_id: 13794, email: 'admin@digiref.com' },
    { id: 2, name: 'PT Cold Storage Maju', identity: 'coldstorage-identity-001', logo: null, alamat: 'Jl. Industri No. 5, Bali', contact_person: 'Budi Santoso', no_hp: '628987654321', village_id: 14231, postcode_id: 80352, email: 'budi@coldstorage.co.id' },
  ]);

  // ── 4. Admins ─────────────────────────────────────────────
  // Passwords are bcrypt hashes of: admin123
  // bcrypt cost factor 10, generated with node `bcrypt.hashSync('admin123', 10)`
  const now = new Date().toISOString();

  await knex('admins').insert([
    {
      id: 1,
      name: 'Administrator',
      email: 'admin@digiref.com',
      username: 'admin',
      password: '$2b$10$GTXytPttQV31UhW4LTTeBeedoZ6RUFJmN7lpzM0DSISUqdvkQuzJO', // admin123
      company_id: 1,
      role_id: 1,
      created_at: now,
      updated_at: now,
    },
    {
      id: 2,
      name: 'Budi Santoso',
      email: 'budi@coldstorage.co.id',
      username: 'budi',
      password: '$2b$10$GTXytPttQV31UhW4LTTeBeedoZ6RUFJmN7lpzM0DSISUqdvkQuzJO', // admin123
      company_id: 2,
      role_id: 2,
      created_at: now,
      updated_at: now,
    },
    {
      id: 3,
      name: 'Siti Rahayu',
      email: 'siti@coldstorage.co.id',
      username: 'siti',
      password: '$2b$10$GTXytPttQV31UhW4LTTeBeedoZ6RUFJmN7lpzM0DSISUqdvkQuzJO', // admin123
      company_id: 2,
      role_id: 2,
      created_at: now,
      updated_at: now,
    },
  ]);

  // ── 5. Projects ───────────────────────────────────────────
  await knex('projects').insert([
    { id: 1, name: 'Project Jakarta Utara' },
    { id: 2, name: 'Project Surabaya' },
  ]);

  // ── 6. Devices ───────────────────────────────────────────
  await knex('devices').insert([
    { id: 1, name: 'Device ABF-001', imei: '357815090123456', sim_id: '6281234567001' },
    { id: 2, name: 'Device CHIL-002', imei: '357815090234567', sim_id: '6281234567002' },
    { id: 3, name: 'Device REF-003',  imei: '357815090345678', sim_id: '6281234567003' },
  ]);

  // ── 7. Project Devices ────────────────────────────────────
  await knex('project_devices').insert([
    {
      id: 1,
      name: 'Cold Storage ABF-01',
      pic: 'Joko Wijaya',
      phone: '628121234567',
      address: 'Jl. Industri Raya No. 10, Bali',
      device_id: 1,
      project_id: 1,
      company_id: 2,
      chiller_type_id: 1,
      admin_id: 2,
      province_id: 1,
      regency_id: 16,
      district_id: 8,
      village_id: 13794,
      gps_latitude: null,
      gps_longitude: null,
      gambar_site: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: 2,
      name: 'Chiller Bawang Site-A',
      pic: 'Ahmad Hidayat',
      phone: '628189876543',
      address: 'Jl. Paseh No. 5, Badung, Bali',
      device_id: 2,
      project_id: 2,
      company_id: 2,
      chiller_type_id: 2,
      admin_id: 2,
      province_id: 1,
      regency_id: 16,
      district_id: 2848,
      village_id: 14231,
      gps_latitude: null,
      gps_longitude: null,
      gambar_site: null,
      created_at: now,
      updated_at: now,
    },
    {
      id: 3,
      name: 'Reefer Container C-03',
      pic: 'Dewi Lestari',
      phone: '628155667788',
      address: 'Jl. Dermaga Belawan, Medan, Sumatera Utara',
      device_id: 3,
      project_id: 1,
      company_id: 2,
      chiller_type_id: 3,
      admin_id: 3,
      province_id: 34,
      regency_id: 452,
      district_id: 3516,
      village_id: 626,
      gps_latitude: null,
      gps_longitude: null,
      gambar_site: null,
      created_at: now,
      updated_at: now,
    },
  ]);

  // ── 8. Device Parsers ─────────────────────────────────────
  // Each device gets a parser with sample JSON buffer data
  await knex('device_parsers').insert([
    {
      id: 1,
      imei: '357815090123456',
      buffer: { temp: -18, humidity: 65, alarm: false },
      created_at: now,
      updated_at: now,
    },
    {
      id: 2,
      imei: '357815090234567',
      buffer: { temp: -22, humidity: 70, alarm: false },
      created_at: now,
      updated_at: now,
    },
    {
      id: 3,
      imei: '357815090345678',
      buffer: { temp: -25, humidity: 60, alarm: true },
      created_at: now,
      updated_at: now,
    },
  ]);

  // ── 9. Device Elements ────────────────────────────────────
  // Telemetry readings per device — multiple timestamps for history
  const baseTime = new Date('2026-05-03T00:00:00Z');

  const deviceElements = [];
  const elementIds = [1, 2, 3, 4, 5, 6];

  // 2 elements per device (6 total)
  const elementData = [
    { id: 1, device_id: 1, ts_offset: 0,   temp: -18, temp2: -19, temp3: -17, temp4: -20, lon: '106.8294', lat: '-6.1234', alt: 10, angle: 0, ignition: 1, analog: 1, analog2: 0 },
    { id: 2, device_id: 1, ts_offset: 300, temp: -18, temp2: -19, temp3: -17, temp4: -20, lon: '106.8295', lat: '-6.1235', alt: 10, angle: 0, ignition: 1, analog: 1, analog2: 0 },
    { id: 3, device_id: 2, ts_offset: 0,   temp: -22, temp2: -23, temp3: -21, temp4: -24, lon: '112.7520', lat: '-7.2520', alt: 5,  angle: 45, ignition: 0, analog: 1, analog2: 1 },
    { id: 4, device_id: 2, ts_offset: 300, temp: -22, temp2: -23, temp3: -21, temp4: -24, lon: '112.7521', lat: '-7.2521', alt: 5,  angle: 45, ignition: 0, analog: 1, analog2: 1 },
    { id: 5, device_id: 3, ts_offset: 0,   temp: -25, temp2: -26, temp3: -24, temp4: -27, lon: '98.6820',  lat: '3.5880',  alt: 20, angle: 90, ignition: 1, analog: 2, analog2: 2 },
    { id: 6, device_id: 3, ts_offset: 300, temp: -25, temp2: -26, temp3: -24, temp4: -27, lon: '98.6821',  lat: '3.5881',  alt: 20, angle: 90, ignition: 1, analog: 2, analog2: 2 },
  ];

  for (const el of elementData) {
    const ts = new Date(baseTime.getTime() + el.ts_offset * 1000);
    deviceElements.push({
      id: el.id,
      device_id: el.device_id,
      timestamp: ts.toISOString(),
      longitude: el.lon,
      latitude: el.lat,
      altitude: el.alt,
      angle: el.angle,
      temperatur: el.temp,
      ignition: el.ignition,
      analog_input: el.analog,
      analog_input2: el.analog2,
      temperature_2: el.temp2,
      temperature_3: el.temp3,
      temperature_4: el.temp4,
      din_1: 0, din_2: 0, din_3: 0,
      dout_1: 0, dout_2: 0, dout_3: 0,
      sleep_mode: 0,
      gnss_status: 1,
      ext_voltage: 12,
      battery_voltage: 85,
      gsm_signal: 4,
      created_at: now,
      updated_at: now,
    });
  }

  await knex('device_elements').insert(deviceElements);

  // ── 10. Device Element Histories ───────────────────────────
  // Links each device_element to its parser
  // element 1,2 → parser 1 (device 1)
  // element 3,4 → parser 2 (device 2)
  // element 5,6 → parser 3 (device 3)
  await knex('device_element_histories').insert([
    { id: 1, device_parser_id: 1, device_element_id: 1, created_at: now, updated_at: now },
    { id: 2, device_parser_id: 1, device_element_id: 2, created_at: now, updated_at: now },
    { id: 3, device_parser_id: 2, device_element_id: 3, created_at: now, updated_at: now },
    { id: 4, device_parser_id: 2, device_element_id: 4, created_at: now, updated_at: now },
    { id: 5, device_parser_id: 3, device_element_id: 5, created_at: now, updated_at: now },
    { id: 6, device_parser_id: 3, device_element_id: 6, created_at: now, updated_at: now },
  ]);
};
