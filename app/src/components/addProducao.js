import React, { useEffect, useState } from 'react'
import serviceProduto from '../app/service/ProdutoService'
import producaoService from '../app/service/ProducaoService'
function AddProducao(props) {
  const {clearProduto, alteraAlerta} = props
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState()
  const [referencias,setReferencias] = useState()
  const [quantidade, setQuantidade] = useState(0)
  const [escolha, setEscolha] = useState()

  async function buscaReferencias(setReferencias){
    try{
      const response = await serviceProduto.getListaProdutos()
      setReferencias(response.data)
    }catch(e){
      console.log(e)
    }
  }

  async function addProducao(id, quantidade){
      const response = await producaoService.add({
        id_produto:selectedId,
        quantia:quantidade
      }, alteraAlerta)

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await addProducao(selectedId, quantidade)
    clearProduto()
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }

  const handleChange = (selectedOption) => {
    setSelectedId(selectedOption);
  };

  useEffect(() => {
    buscaReferencias(setReferencias)
  },[loading])

  useEffect(()=>{
    if (!referencias){
      setLoading(true)
      buscaReferencias(setReferencias)
    }else{
      setLoading(false)
    }
  },[referencias])

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
        <select 
          value={escolha}
          onChange={(event)=>handleChange(event.target.value)} 
          style={{fontSize:'20px', padding:'0'}}>
          <option label={'SELECIONE PARA ADICIONAR'}></option>
          {referencias.map((val)=>{
            return(
              <option 
                key={val.id}
                value={val.id}
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
        
        <button className="mt-2 mb-2"  style={{fontSize:'20px', padding:'0px'}} type="submit">Adicionar</button>
      
      </div>
    </form>
    </>
  )
}

export default AddProducao