import { FastifyReply, FastifyRequest } from "fastify";
import { databaseConnector } from "../main";
import { formatDateToString, getDateTimeString } from "../entity/date-time";
import { $ref, AddCostureiroSchema, DelCostureiroSchema } from "./costureiro.schema";

async function costureiro(server:any){
  server.post('/addCostureiro',{schema:{body:$ref('AddCostureiroSchema')}},addCostureiro)
  server.delete('/delCostureiro',{schema:{body:$ref('DelCostureiroSchema')}},delCostureiro)
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
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }

}

async function delCostureiro(request:FastifyRequest<{Body:DelCostureiroSchema}>, reply:FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    const now = getDateTimeString()
    const result:any = await CONN.query(`select nome from costureiros where id = ?`,[request.body.id_costureiro])
    const nome = result[0][0]['nome']
    const newNome = `${nome}-DELETED-${now}`
    await CONN.execute(`update costureiros set nome = ?, deleted_at = ? where id = ?`,[newNome,now, request.body.id_costureiro])
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