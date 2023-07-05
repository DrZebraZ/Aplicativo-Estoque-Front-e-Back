import { FastifyReply, FastifyRequest } from "fastify";
import { databaseConnector } from "../main";
import { $ref, AddProdutoSchema, EditaProdutoSchema, deletaProdutoSchema } from "./produto.schema";
import { getDateTimeString } from "../entity/date-time";

async function produtos(server:any){
  server.post('/add',{schema:{body:$ref('AddProdutoSchema')}},addProduto);
  server.get('/getListaProdutos',listaProdutos);
  server.get('/getListaProdutosNegativo',listaProdutosNegativo);
  server.get('/getListaProdutosProduzidos',listaProdutosProduzidos);
  server.put('/editaProduto',{schema:{body:$ref('EditaProdutoSchema')}},editaProduto);
  server.delete('/deletaProduto/:id',deletaProduto);
  }

export default produtos

async function addProduto(request:FastifyRequest<{Body: AddProdutoSchema}>, reply:FastifyReply){
  try{
    const produto = request.body
    const CONN = await databaseConnector.getConnection()
    await CONN.execute(`insert into produto (referencia, descricao, estoque) values (?,?,?)`,
    [produto.referencia, produto.descricao, produto.estoque])
    CONN.commit()
    reply.code(201)
    reply.send("Criado com sucesso!")
  }catch(e){
    if (e.code == 'ER_DUP_ENTRY'){
      reply.send(`Referencia já utilizada`)
    }else{
      reply.send(`Erro inesperado: ${e}`)
    }
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
  }
}

async function listaProdutos(request:FastifyRequest, reply:FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    const result = await CONN.query(`select id, referencia, descricao, estoque from produto where deleted_at is null order by referencia asc`)
    reply.code(200)
    reply.send(result[0])
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }
}

async function listaProdutosNegativo(request: FastifyRequest, reply: FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    const result = await CONN.query(`select id, referencia, descricao, estoque from produto where deleted_at is null and estoque < 0 order by referencia asc`)
    reply.code(200)
    reply.send(result[0])
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }
}

async function listaProdutosProduzidos(request:FastifyRequest, reply:FastifyReply){
  try{
    const CONN = await databaseConnector.getConnection()
    const result = await CONN.query(`select p.id_produto, p2.referencia from producao p join produto p2 on p.id_produto = p2.id where p2.deleted_at is null and p.finalizado_at is not null group by p.id_produto`)
    reply.code(200)
    reply.send(result[0])
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }
}

async function editaProduto(request:FastifyRequest<{Body: EditaProdutoSchema}>, reply:FastifyReply){
  try{
    const produto = request.body
    const CONN = await databaseConnector.getConnection()
    await CONN.execute(`update produto set referencia = ?, descricao = ?, estoque = ? where id = ?`,
    [produto.referencia, produto.descricao, produto.estoque, produto.id])
    CONN.commit()
    reply.code(201)
    reply.send('Alterado!')
  }catch(e){
    if (e.code === 'ER_DUP_ENTRY'){
      reply.send(`Referencia já em uso`)
    }else{
      reply.send(`Erro inesperado: ${e}`)
    }
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
  }
}

async function deletaProduto(request:FastifyRequest, reply:FastifyReply){
  try{
    const produto :any = request.params
    const now = getDateTimeString()
    const CONN = await databaseConnector.getConnection()
    const possui:any = await CONN.query(`select * from produto join producao on produto.id = producao.id_produto where produto.id = ? and producao.finalizado_at is null;`,[produto.id])
    let quantia = 0
    let referencia = ""
    possui[0].forEach(function (value:any){
      quantia+=(value.quantia - value.quantia_finalizada)
      referencia = value.referencia
    })
    const nome:any = await CONN.query(`select referencia, estoque from produto where id = ?`,[produto.id])
    referencia = `${nome[0][0]['referencia']}-DELETADO-${now}`
    const estoque = nome[0][0]['estoque']
    if(quantia > 0){
      reply.code(400)
      reply.send(`voce possui ${quantia} deste produto em produção ainda`)
      return
    }
    if(estoque > 0){
      reply.code(400)
      reply.send(`voce possui ${estoque} deste produto no estoque ainda`)
      return
    }
    if(estoque < 0){
      reply.code(400)
      reply.send(`voce possui ${estoque}, zere o estoque primeiro`)
      return
    }
    await CONN.execute(`update produto set deleted_at = ?, referencia = ? where id = ?`,
    [now,referencia,produto.id])
    CONN.commit()
    reply.code(201)
    reply.send('Deletado!')
  }catch(e){
    databaseConnector.closeConn()
    console.log(e)
    reply.code(404)
    reply.send(`Erro inesperado: ${e}`)
  }
}