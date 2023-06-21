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

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
}).then(() => {
  console.log(`🚀 HTTP server running on port ${process.env.PORT ? Number(process.env.PORT) : 5000}`)
})