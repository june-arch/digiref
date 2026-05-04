import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  latest,
  latestById,
  weeklyAverage,
  dailyAverage,
} from "../../repositories/deviceElementRepository";
import { parse } from "json2csv";
import {
  BeaconDailySchema,
  BeaconDownloadSchema,
  BeaconIndexSchema,
  BeaconShowSchema,
  BeaconWeeklySchema,
} from "../../documentation/monitoring/beaconApi";
import authMiddleware from "../../middlewares/authMiddleware";

const DEFAULT_LIMIT = 30;
const DEFAULT_PAGE = 1;

const index = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const data = await latest();
  _reply.send(data);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      deviceId: number;
    };
    Querystring: {
      page?: number;
      limit?: number;
      start?: string;
      end?: string;
    };
  }>,
  _reply: FastifyReply
) => {
  const { deviceId } = _request.params;
  const { page, limit, start, end } = _request.query;
  const data = await latestById(deviceId, false, {
    page: page && page > 0 ? page : DEFAULT_PAGE,
    limit: limit && limit > 0 && limit < 100 ? limit : DEFAULT_LIMIT,
    start: start ?? "",
    end: end ?? "",
  });
  _reply.send(data);
};

const download = async (
  _request: FastifyRequest<{
    Params: {
      deviceId: number;
    };
    Querystring: {
      start?: string;
      end?: string;
    };
  }>,
  _reply: FastifyReply
) => {
  const { deviceId } = _request.params;
  const { start, end } = _request.query;

  
  //@ts-ignore
  const data = await latestById(deviceId, true, {
    page: 1,
    limit: 999999999,
    start: start ?? "",
    end: end ?? "",
  });
  if(!(data && data.length > 0)) {
    _reply.statusCode = 404;
    return _reply.send('data tidak ada');
  }
  const csvString = parse(data ?? []);
  _reply.headers({
    "Content-disposition": "attachment; filename=download.csv",
    "Content-type": "text/csv",
  });
  return _reply.send(csvString);
};

const weekly = async (
  _request: FastifyRequest<{
    Params: {
      deviceId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { deviceId } = _request.params;
  const data = await weeklyAverage(deviceId);
  _reply.send(data);
};

const daily = async (
  _request: FastifyRequest<{
    Params: {
      deviceId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { deviceId } = _request.params;
  const data = await dailyAverage(deviceId);
  _reply.send(data);
};

export default async function userController(fastify: FastifyInstance) {
  // GET /api/v1/beacons
  fastify.get("/", {
    handler: index,
    preHandler: [authMiddleware],
    schema: BeaconIndexSchema,
  });

  // GET /api/v1/beacons/{id}
  fastify.get("/:deviceId", {
    handler: show,
    preHandler: [authMiddleware],
    schema: BeaconShowSchema,
  });

  fastify.get("/download/:deviceId", {
    handler: download,
    preHandler: [authMiddleware],
    schema: BeaconDownloadSchema,
  });

  fastify.get("/weekly/:deviceId", {
    handler: weekly,
    preHandler: [authMiddleware],
    schema: BeaconWeeklySchema,
  });
  fastify.get("/daily/:deviceId", {
    handler: daily,
    preHandler: [authMiddleware],
    schema: BeaconDailySchema,
  });
}
