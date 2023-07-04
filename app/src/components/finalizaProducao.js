import React, { useEffect, useState } from 'react'
import serviceProduto from '../app/service/ProdutoService'
import producaoService from '../app/service/ProducaoService'
import costureiroService from '../app/service/CostureiroService'
function FinalizaProducao(props) {
  const {dados, clearProduto, alteraAlerta} = props
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState()
  const [quantidade, setQuantidade] = useState(0)
  const [costureiros, setCosturerios] = useState()
  const [selectedCostureiro, setSelectedCostureiro] = useState()

  async function buscaCostureiros(setReferencias){
    try{
      const response = await costureiroService.getListaCostureiros()
      setCosturerios(response.data)
    }catch(e){
      console.log(e)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const response = await producaoService.finaliza({
      "id_costureiro":selectedCostureiro,
      "id_produto":selectedId,
      "quantia":quantidade
    },alteraAlerta)
    clearProduto()
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }

  const handleSelect = (selectedOption) =>{
    setSelectedCostureiro(selectedOption)
  }

  const handleChange = (id, quantia) => {
    setSelectedId(id);
  };

  useEffect(()=>{
    if (!dados || !costureiros){
      buscaCostureiros()
      setLoading(true)
    }else{
      setLoading(false)
    }
  },[dados, costureiros])

  if (loading){
    return(
      <>
        LOADING...
      </>
    )
  }
  return (
    <>
    <form  onSubmit={handleFormSubmit}>
      <div className="row" style={{margin:"0px"}}>
        <div style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="referencia">Referência:</div>
        <select onChange={(event)=>handleChange(event.target.value)} style={{fontSize:'20px', padding:'0'}}>
          <option label={'SELECIONE PARA FINALIZAR'}></option>
          {dados.map((val)=>{
            return(
              <option 
                key={val.id_produto}
                value={val.id_produto}
                label={val.referencia}
                bgcolor="#EEEEEE" 
                className='row justify-content-between'
              />
              
              )
            })}
        </select>
        <div className="mt-2"  style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="estoque">
          Quantia:
        </div>
        <input
          style={{fontSize:'20px', padding:'0'}}
          type="number"
          id="estoque"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <div className='row m-2' style={{padding:"0px"}}>
          {costureiros.map((val)=>{
            return(
              <div className="col-4 col-md-6 form-check" onChange={(event)=>handleSelect(event.target.value)}>
                <input class="form-check-input" value={val.id} style={{backgroundColor:"black"}} type="radio" name="flexRadioDefault" id="flexRadioDefault"/>
                <label value={val.id}  class="form-check-label" for="flexRadioDefault1">
                  {val.nome}
                </label>
              </div>
              )
            })}
        </div>
        <button className="mt-2 mb-2"  style={{fontSize:'20px', padding:'0px'}} type="submit">Finalizar!</button>
      
      </div>
    </form>
    </>
  )
}

export default FinalizaProducao