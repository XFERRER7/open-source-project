"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/lib/client.ts
var import_client = require("@prisma/client");
var client = new import_client.PrismaClient();

// src/routes/phraseRoute.ts
var import_zod = require("zod");
async function phraseRoute(app2) {
  app2.get("/phrase/get-all", async (request, reply) => {
    const phrases = await client.phrase.findMany();
    return phrases;
  });
  app2.get("/phrase/get-by-category/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const params = paramsSchema.parse(request.params);
    const phrases = await client.phrase.findMany({
      where: {
        categoryId: params.id
      }
    });
    return phrases;
  });
  app2.post("/phrase/create", async (request, reply) => {
    const bodySchema = import_zod.z.object({
      text: import_zod.z.string().nonempty(),
      categoryId: import_zod.z.string().uuid(),
      status: import_zod.z.custom((value) => {
        if (value === "approved" || value === "pending") {
          return value;
        } else {
          throw new Error("The field status must be approved or pending");
        }
      })
    });
    const body = bodySchema.parse(request.body);
    const phrase = await client.phrase.create({
      data: {
        text: body.text,
        categoryId: body.categoryId,
        status: body.status
      }
    });
    return phrase;
  });
  app2.delete("/phrase/delete/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const params = paramsSchema.parse(request.params);
    const phrase = await client.phrase.delete({
      where: {
        id: params.id
      }
    });
    return phrase;
  });
}

// src/routes/categoryRoute.ts
var import_zod2 = require("zod");
async function categoryRoute(app2) {
  app2.get("/category/get-all", async (request, reply) => {
    const categories = await client.category.findMany({
      include: {
        Phrases: false
      }
    });
    return categories;
  });
  app2.post("/category/create", async (request, reply) => {
    const bodySchema = import_zod2.z.object({
      name: import_zod2.z.string().nonempty()
    });
    const body = bodySchema.parse(request.body);
    const category = await client.category.create({
      data: {
        name: body.name
      }
    });
    return category;
  });
  app2.put("/category/update/:id", async (request, reply) => {
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const bodySchema = import_zod2.z.object({
      name: import_zod2.z.string().nonempty()
    });
    const params = paramsSchema.parse(request.params);
    const body = bodySchema.parse(request.body);
    const category = await client.category.update({
      where: {
        id: params.id
      },
      data: {
        name: body.name
      }
    });
    return category;
  });
  app2.delete("/category/delete/:id", async (request, reply) => {
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const params = paramsSchema.parse(request.params);
    const category = await client.category.delete({
      where: {
        id: params.id
      }
    });
    return category;
  });
}

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: true
});
app.register(categoryRoute);
app.register(phraseRoute);
app.listen({ port: 3333 }).then(() => {
  console.log("\u{1F680} HTTP server running on port http://localhost:3333");
});
