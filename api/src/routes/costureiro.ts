import { FastifyReply, FastifyRequest } from "fastify";
import { databaseConnector } from "../main";
import { formatDateToString, getDateTimeString } from "../entity/date-time";
import { $ref, AddCostureiroSchema, DelCostureiroSchema } from "./costureiro.schema";

async function costureiro(server:any){
  server.post('/addCostureiro',{schema:{body:$ref('AddCostureiroSchema')}},addCostureiro)
  server.delete('/delCostureiro/:id',delCostureiro)
  server.get('/listarCostureiro',listaCostureiro)
  }

export default costureiro


async function addCostureiro(request:FastifyRequest<{Body:AddCostureiroSchema}>, reply:FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    await CONN.execute(`insert into costureiros (nome) values (?)`,[request.body.nome])
    CONN.commit()
    reply.code(201)
    reply.send('Adicionado!')
  }catch(e){
    if (e.code == 'ER_DUP_ENTRY'){
      reply.send(`Nome ja em uso`)
    }else{
      reply.send(`Erro inesperado: ${e}`)
    }
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404) 
  }
}

async function delCostureiro(request:FastifyRequest, reply:FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    const id : any = request.params
    console.log(id)
    const now = getDateTimeString()
    const result:any = await CONN.query(`select nome from costureiros where id = ?`,[id.id])
    const nome = result[0][0]['nome']
    const newNome = `${nome}-DELETED-${now}`
    await CONN.execute(`update costureiros set nome = ?, deleted_at = ? where id = ?`,[newNome,now, id.id])
    CONN.commit()
    reply.code(200)
    reply.send('REMOVIDO!')
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }

}

async function listaCostureiro(request:FastifyRequest, reply:FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    const now = getDateTimeString()
    const result = await CONN.execute(`select id, nome from costureiros where deleted_at is null order by nome asc`)
    CONN.commit()
    reply.code(200)
    reply.send(result[0])
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }

}