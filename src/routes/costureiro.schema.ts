import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const id_costureiro = {
  id_costureiro: z.number({required_error:"Precisa informar um costureiro(a)"}),
}

const nome = {
  nome: z.string({required_error:"Precisa informar um nome"}).min(3,{message: 'minimo 3 caracteres'})
}

const AddCostureiroSchema = z.object({
  ...nome,
})
export type AddCostureiroSchema = z.infer<typeof AddCostureiroSchema>

const DelCostureiroSchema = z.object({
  ...id_costureiro,
})
export type DelCostureiroSchema = z.infer<typeof DelCostureiroSchema>


const models = {
  AddCostureiroSchema,
  DelCostureiroSchema
}

const options = {
  $id: "costureiroSchema"
};

export const { schemas: costureiroSchema, $ref } = buildJsonSchemas(models, options);

