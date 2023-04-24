import { FastifyReply, FastifyRequest } from "fastify";
import { databaseConnector } from "../main";
import { formatDateToString } from "../entity/date-time";

async function produzido(server:any){
  server.get('/listaProduzido',listaProduzido)
  server.get('/listaProduzidoJunto',listaProduzidoJunto)
  }

export default produzido


async function listaProduzido(request:FastifyRequest|any, reply:FastifyReply){
  let addToQueryCostureiro = ''
  if(request.query.costureiro_id > 0){
    addToQueryCostureiro = `and c.id = ${request.query.costureiro_id}`
  }
  let addToQueryProduto = ''
  if(request.query.produto_id > 0){
    addToQueryProduto = `and p3.id = ${request.query.produto_id}`
  }
  try{
    const CONN = await databaseConnector.getConnection()
    const result:any = await CONN.query(`
      select DATE(p.dia)as dia, sum(p.quantia) as producao_diaria, 
      p3.referencia, p3.id as produto_id, c.nome as costureiro, 
      c.id as costureiro_id 
      from produzido p join producao p2 on p2.id = p.id_producao 
      join produto p3 on p2.id_produto = p3.id 
      join costureiros c on p.id_costureiro = c.id
      WHERE p.dia >= DATE_SUB(NOW(), INTERVAL 2 MONTH)
      `+
      addToQueryCostureiro
      +
      addToQueryProduto
      +`
      group by DATE(p.dia), p3.referencia, c.id, p3.id 
      order by dia desc, c.id, p3.referencia asc
    `)
      result[0].forEach(function (value:any){
      value.dia = formatDateToString(value.dia)
    })
    reply.code(200)
    reply.send(result[0])
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }

}

async function listaProduzidoJunto(request:FastifyRequest|any, reply:FastifyReply){
  let addToQueryCostureiro = ''
  if(request.query.costureiro_id > 0){
    addToQueryCostureiro = `and c.id = ${request.query.costureiro_id}`
  }
  try{
    const CONN = await databaseConnector.getConnection()
    const result:any = await CONN.query(`
      select DATE(p.dia)as dia, sum(p.quantia) as producao_diaria, 
      c.nome as costureiro, 
      c.id as costureiro_id 
      from produzido p  
      join costureiros c on p.id_costureiro = c.id
      WHERE p.dia >= DATE_SUB(NOW(), INTERVAL 2 MONTH)
      `+
      addToQueryCostureiro
      +`
      group by DATE(p.dia), c.id
      order by dia desc, c.id asc
    `)
      result[0].forEach(function (value:any){
      value.dia = formatDateToString(value.dia)
    })
    reply.code(200)
    reply.send(result[0])
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }

}