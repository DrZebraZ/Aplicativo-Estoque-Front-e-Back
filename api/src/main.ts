import 'dotenv/config'
import server from './server/server'
import { setRoutes } from './server/routers'
import { setSchemas } from './server/schemas'
import DatabaseConnector from './data/database-connector'
import cors from '@fastify/cors'

export const databaseConnector = new DatabaseConnector()
export const localhost = process.env.LOCALHOST
console.log()
async function main(){
  try{
    console.log(localhost)
    await server.register(cors, {
      origin: '*',
    })
    await setRoutes(server)
    await setSchemas(server)
    const port = 3001
    const host = '0.0.0.0'
    await server.listen({ port: port, host: host})
    console.info(`server ready at http://${host}:${port}`)
  }catch(e){
    console.warn(`${e}`, "Server Disconnected")
    process.exit(1)
  }
}
main()
