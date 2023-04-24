import { FastifyInstance } from 'fastify';
import produto from '../routes/produto';
import healthCheck from '../routes/healthcheck';
import producao from '../routes/producao';
import produzido from '../routes/produzido';
import costureiro from '../routes/costureiro';
export async function setRoutes(server:FastifyInstance){
  healthCheck(server)
  server.register(produto, { prefix: '/produto'});
  server.register(producao, {prefix: '/producao'});
  server.register(produzido, {prefix: '/produzido'});
  server.register(costureiro, {prefix: '/costureiro'});
}