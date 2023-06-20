import ApiService from '../ApiService'

class CostureiroService extends ApiService {
  constructor() {
    super('/costureiro')
  }

  add(credenciais, alteraAlerta) {
    return this.post('/addCostureiro', credenciais, alteraAlerta)
  }

  getListaCostureiros(alteraAlerta) {
    try{
      return this.get('/listarCostureiro',alteraAlerta)
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
console.log('INSTANCIANDO COSTUREIRO SERVICE')
const costureiroService = new CostureiroService()

export default costureiroService