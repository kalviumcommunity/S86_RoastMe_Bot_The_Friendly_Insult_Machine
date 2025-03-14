import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS
app.use('*', cors())

// Root route
app.get('/', (c) => {
  return c.text('Hello Cloudflare from ASAP!')
})

// /ping route
app.get('/ping', (c) => {
  return c.json({ message: 'Pong' })
})

export default app
