import { serve } from '@hono/node-server'
import { allRoutes } from './routes/routes'
import "dotenv/config"




serve(allRoutes,(info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
