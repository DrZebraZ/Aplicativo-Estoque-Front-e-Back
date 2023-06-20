import { FastifyReply, FastifyRequest } from "fastify";
import { databaseConnector } from "../main";
import { getDateTimeString } from "../entity/date-time";
import { $ref, AddProducaoSchema, FinalizaProducaoSchema } from './producao.schema';

async function producao(server:any){
  server.post('/add',{schema:{body:$ref('AddProducaoSchema')}},addProducao);
  server.post('/finaliza',{schema:{body:$ref('FinalizaProducaoSchema')}},finalizaProducao);
  server.get('/listaProducao',listaProducao)
  }

export default producao

async function addProducao(request:FastifyRequest<{Body: AddProducaoSchema}>, reply:FastifyReply){
  try{
    const producao = request.body
    if (producao.quantia <= 0 || producao.quantia == null){
      reply.code(400)
      reply.send("Favor informe uma quantia!")
      return
    }
    const now = getDateTimeString()
    const CONN = await databaseConnector.getConnection()
    await CONN.execute(`insert into producao (id_produto, quantia, adicionado_at) values (? , ? , ? )`,
    [producao.id_produto, producao.quantia, now])
    CONN.commit()
    reply.code(201)
    reply.send('Adicionado com sucesso!')
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }
}

async function finalizaProducao(request:FastifyRequest<{Body: FinalizaProducaoSchema}>, reply:FastifyReply){
  try{
    const producao = request.body
    const CONN = await databaseConnector.getConnection()
    const result:any = await CONN.query(`select id, id_produto, quantia, quantia_finalizada, adicionado_at, finalizado_at from producao where id_produto = ? and finalizado_at is null order by adicionado_at ASC;`,[producao.id_produto])
    let quantidade = Number(producao.quantia)
    result[0].forEach(function (value:any){
      if (quantidade>0){
        let falta = value.quantia - value.quantia_finalizada
        let adicionado = 0
        if (quantidade >= falta){
          adicionado = falta
          quantidade -= falta
          const now = getDateTimeString()
          insereNaProduzido(value.id, producao.id_costureiro, adicionado)
          insereNaProducao(value.id, value.quantia, now)
          insereNoEstoque(producao.id_produto ,adicionado)
        }else{
          adicionado = quantidade
          insereNaProduzido(value.id, producao.id_costureiro, adicionado)
          insereNaProducao(value.id, value.quantia_finalizada+adicionado)
          insereNoEstoque(producao.id_produto ,adicionado)
          quantidade = 0
        }
      }
    })
    reply.code(201)
      if(quantidade>0){
        reply.send(`Sobrou ${quantidade} fora de produção`)
        return
      }
    reply.send(`Finalizado!`)
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }
}

async function insereNaProduzido(id:bigint, id_costureiro:number, quantia:number){
  try{
    const dia = getDateTimeString()
    const CONN = await databaseConnector.getConnection()
    await CONN.execute(`insert into produzido (id_producao, id_costureiro, quantia, dia) values (?,?,?,?)`,
    [id, id_costureiro, quantia, dia])
    CONN.commit()
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
  }
}
async function insereNaProducao(id_producao:bigint, quantia:number, finalizado_at:String | null = null){
  try{
    const CONN = await databaseConnector.getConnection()
    await CONN.execute(`update producao set quantia_finalizada = ?, finalizado_at = ? where id = ?`,
    [quantia, finalizado_at, id_producao])
    CONN.commit()
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
  }
}
async function insereNoEstoque(id_produto:bigint, quantia:number){
  try{
    const CONN = await databaseConnector.getConnection()
    const result:any = await CONN.query(`select estoque from produto where id = ?`,[id_produto])
    let novoestoque:any = Number(result[0][0].estoque) + quantia
    await CONN.execute(`update produto set estoque = ? where id = ?`,[novoestoque, id_produto])
    CONN.commit()
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
  }
 
}

async function listaProducao(request:FastifyRequest, reply:FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    const result:any = await CONN.query('select id_produto, sum(quantia) as quantidade, sum(quantia_finalizada) as finalizados, referencia from producao join produto on id_produto = produto.id where finalizado_at is null group by id_produto ')
    //const result:any = await CONN.query('select id_produto, quantia as quantidade, quantia_finalizada as finalizados, referencia from producao join produto on id_produto = produto.id where finalizado_at is null ')
    reply.code(200)
    reply.send(result[0])
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }

}