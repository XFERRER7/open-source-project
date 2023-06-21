import fastify from "fastify"
import cors from '@fastify/cors'
import { phraseRoute } from './routes/phraseRoute'
import { categoryRoute } from "./routes/categoryRoute"

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(categoryRoute)
app.register(phraseRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running on port http://localhost:3333')
})