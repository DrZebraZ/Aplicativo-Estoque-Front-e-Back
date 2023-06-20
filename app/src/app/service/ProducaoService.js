import ApiService from '../ApiService'

class ProducaoService extends ApiService {
  constructor() {
    super('/producao')
  }

  add(credenciais, alteraAlerta) {
    return this.post('/add', credenciais, alteraAlerta)
  }


  finaliza(credenciais, alteraAlerta) {
    return this.post('/finaliza', credenciais, alteraAlerta)
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
const producaoService = new ProducaoService()

export default producaoService