import indexController from "./controllers/indexController";
import beaconController from "./controllers/monitoring/beaconController";
import projectController from "./controllers/monitoring/projectController";
import companyController from "./controllers/monitoring/companyController";
import regencyController from "./controllers/regencyController";
import districtController from "./controllers/disctricController";
import postcodeController from "./controllers/postcodeController";
import villageController from "./controllers/villageController";
import projectDeviceController from "./controllers/monitoring/projectDeviceController";
import provinceController from "./controllers/provinceController";
import deviceController from "./controllers/monitoring/deviceController";
import { default as monitoringAuthController } from "./controllers/monitoring/authController";
import chillerTypeController from "./controllers/monitoring/chillerTypeController";
import tenantController from "./controllers/monitoring/tenantController";

export default async function router(fastify: any) {
  fastify.register(provinceController, { prefix: "/api/v1/province" });
  fastify.register(regencyController, { prefix: "/api/v1/regency" });
  fastify.register(districtController, { prefix: "/api/v1/district" });
  fastify.register(postcodeController, { prefix: "/api/v1/postcode" });
  fastify.register(villageController, { prefix: "/api/v1/village" });

  // monitoring api
  fastify.register(beaconController, { prefix: "/api/v1/monitoring/beacons" });
  fastify.register(companyController, { prefix: "/api/v1/monitoring/company" });
  fastify.register(deviceController, { prefix: "/api/v1/monitoring/device" });
  fastify.register(projectController, { prefix: "/api/v1/monitoring/project" });
  fastify.register(chillerTypeController, { prefix: "/api/v1/monitoring/chiller-type" });
  fastify.register(projectDeviceController, { prefix: "/api/v1/monitoring/project-device" });
  fastify.register(monitoringAuthController, { prefix: "/api/v1/monitoring/auth" });
  fastify.register(tenantController, { prefix: "/api/v1/monitoring/tenant" });
  fastify.register(indexController, { prefix: "/" });
}
