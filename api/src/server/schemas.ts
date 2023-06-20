import { costureiroSchema } from "../routes/costureiro.schema"
import { producaoSchema } from "../routes/producao.schema"
import { produtoSchema } from "../routes/produto.schema"


export async function setSchemas(server:any){
  for (let schema of [
    ...produtoSchema,
    ...producaoSchema,
    ...costureiroSchema
  ]
  ){
    await server.addSchema(schema)
  }
}