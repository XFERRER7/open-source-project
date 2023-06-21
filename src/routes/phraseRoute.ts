import { FastifyInstance } from "fastify";
import { client } from "../lib/client";
import { z } from 'zod'


export async function phraseRoute(app: FastifyInstance) {

  app.get('/phrase/get-all', async (request, reply) => {

    const phrases = await client.phrase.findMany()

    return phrases

  })

  app.get('/phrase/get-by-category/:id', async (request, reply) => {

   const paramsSchema = z.object({
      id: z.string().uuid()
   })

   const params = paramsSchema.parse(request.params)

    const phrases = await client.phrase.findMany({
      where: {
        categoryId: params.id
      }
    })

    return phrases

  })

  app.post('/phrase/create', async (request, reply) => {

    const bodySchema = z.object({
      text: z.string().nonempty(),
      categoryId: z.string().uuid(),
      status: z.custom((value) => {
        if (value === "approved" || value === "pending") {
          return value;
        } else {
          throw new Error("The field status must be approved or pending");
        }
      })
    })

    const body = bodySchema.parse(request.body)

    const phrase = await client.phrase.create({
      data: {
        text: body.text,
        categoryId: body.categoryId,
        status: body.status
      }
    })

    return phrase

  })

  app.delete('/phrase/delete/:id', async (request, reply) => {
      
      const paramsSchema = z.object({
        id: z.string().uuid()
      })
  
      const params = paramsSchema.parse(request.params)
  
      const phrase = await client.phrase.delete({
        where: {
          id: params.id
        }
      })
  
      return phrase
  
  })
}