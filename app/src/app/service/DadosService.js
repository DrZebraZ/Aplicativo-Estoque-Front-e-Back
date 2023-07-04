import ApiService from '../ApiService'

class DadosService extends ApiService {
  constructor() {
    super('/produzido')
  }

  getProduzidos(credenciais, alteraAlerta) {
    return this.get(`/listaProduzido?${credenciais}`, alteraAlerta)
  }


  getResultados(credenciais, alteraAlerta) {
    return this.get(`/listaProduzidoJunto?${credenciais}`, alteraAlerta)
  }


  listaProducao(alteraAlerta) {
    try{
      return this.get('/listaProducao',alteraAlerta)
    }catch(e){
      console.log(e)
    }
    
  }

  deletaCostureiro(credenciais, alteraAlerta){
    try{
      return this.delete(`/delCostureiro/${credenciais}`,alteraAlerta)
    }catch(e){
      console.log(e)
    }
  }

}
console.log('INSTANCIANDO PRODUCAO SERVICE')
const dadosService = new DadosService()

export default dadosService