import 'dotenv/config'
import server from './server/server'
import { setRoutes } from './server/routers'
import { setSchemas } from './server/schemas'
import DatabaseConnector from './data/database-connector'
export const databaseConnector = new DatabaseConnector()
import {networkInterfaces} from 'os'
const nets:any = networkInterfaces()
const results:any = Object.create(null)

export const localhost = process.env.LOCALHOST?.replace(/\s/g, '')

async function main(){
  try{
    await setRoutes(server)
    await setSchemas(server)
    const port = (process.env.PORT || 3000)
    const host = (process.env.HOST || "0.0.0.0")
    await server.listen({ port: port, host: host})
    console.info(`server ready at http://${localhost}:${port}`)
  }catch(e){
    console.warn(`${e}`, "Server Disconnected")
    process.exit(1)
  }
}
main()
