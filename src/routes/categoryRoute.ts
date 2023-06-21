import { FastifyInstance } from "fastify";
import { client } from "../lib/client";
import { z } from "zod";


export async function categoryRoute(app: FastifyInstance) {

  app.get('/category/get-all', async (request, reply) => {

    const categories = await client.category.findMany({
      include: {
        Phrases: false
      }
    })

    return categories

  })

  app.post('/category/create', async (request, reply) => {

    const bodySchema = z.object({
      name: z.string().nonempty(),
    })

    const body = bodySchema.parse(request.body)

    const category = await client.category.create({
      data: {
        name: body.name,
      }
    })

    return category

  })

  app.put('/category/update/:id', async (request, reply) => {

    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    
    const bodySchema = z.object({
      name: z.string().nonempty(),
    })

    const params = paramsSchema.parse(request.params)
    const body = bodySchema.parse(request.body)

    
    const category = await client.category.update({
      where: {
        id: params.id
      },
      data: {
        name: body.name,
      }
    })
    
    return category

  })

  app.delete('/category/delete/:id', async (request, reply) => {

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const params = paramsSchema.parse(request.params)

    const category = await client.category.delete({
      where: {
        id: params.id
      }
    })

    return category

  })

}