import ApiService from '../ApiService'

class ProdutoService extends ApiService {
  constructor() {
    super('/produto')
  }

  add(credenciais, alteraAlerta) {
    return this.post('/add', credenciais, alteraAlerta)
  }

  getListaProdutos(alteraAlerta) {
    try{
      return this.get('/getListaProdutos',alteraAlerta)
    }catch(e){
      console.log(e)
    }
    
  }
  getListaProdutosNegativo(alteraAlerta) {
    try{
      return this.get('/getListaProdutosNegativo',alteraAlerta)
    }catch(e){
      console.log(e)
    }
    
  }

  getListaProdutosProduzidos(alteraAlerta) {
    try{
      return this.get('/getListaProdutosProduzidos',alteraAlerta)
    }catch(e){
      console.log(e)
    }
    
  }

  editaProduto(credenciais, alteraAlerta){
    try{
      return this.put('/editaProduto', credenciais, alteraAlerta)
    }catch(e){
      console.log(e)
    }
    
  }

  deletaProduto(credenciais, alteraAlerta){
    try{
      return this.delete(`/deletaProduto/${credenciais}`,alteraAlerta)
    }catch(e){
      console.log(e)
    }
  }

}
console.log('INSTANCIANDO PRODUTO SERVICE')
const produtoService = new ProdutoService()

export default produtoService