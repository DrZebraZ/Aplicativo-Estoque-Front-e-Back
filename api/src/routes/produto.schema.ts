import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const id = {
  id: z.bigint({required_error: "Precisa informar o ID"})
}

const referencia = {
  referencia: z.string({required_error: "Precisa informar uma referencia"}).min(2, {message: 'minimo 2 caracteres'})
  }

const descricao = {
  descricao: z.string(),
}

const estoque = {
  estoque: z.bigint()
}

const deleted_at = {
  deleted_at: z.date()
}

const deletaProdutoSchema = z.object({
  ...id
})
export type deletaProdutoSchema = z.infer<typeof deletaProdutoSchema>

const AddProdutoSchema = z.object({
  ...referencia,
  ...descricao,
  ...estoque
})
export type AddProdutoSchema = z.infer<typeof AddProdutoSchema>

const EditaProdutoSchema = z.object({
  ...referencia,
  ...descricao,
  ...id,
  ...estoque
})
export type EditaProdutoSchema = z.infer<typeof EditaProdutoSchema>

const models = {
  AddProdutoSchema,
  EditaProdutoSchema,
  deletaProdutoSchema
}

const options = {
  $id: "produtoSchema"
};

export const { schemas: produtoSchema, $ref } = buildJsonSchemas(models, options);

