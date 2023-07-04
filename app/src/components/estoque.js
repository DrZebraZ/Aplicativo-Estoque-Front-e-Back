import React, { useEffect, useState } from 'react'
import ProdutoService from '../app/service/ProdutoService'
function Estoque(props) {
  const {id, referencia, estoque, descricao, clearProduto, alteraAlerta} = props
  const [selectedReferencia, setReferencia] = useState()
  const [selectedEstoque, setEstoque] = useState()
  const [addRemEstoque, setAddRemEstoque] = useState(0)
  
  async function editProduto(estoqueNovo){
    const response = await ProdutoService.editaProduto({
      "referencia":referencia,
      "descricao":descricao,
      "estoque":estoqueNovo,
      "id":id
    }, alteraAlerta)
    clearProduto()
  }

  useEffect(() => {
    setReferencia(referencia)
    setEstoque(estoque)
    setAddRemEstoque(0)
  }, [referencia, estoque, id, descricao])

  const handleAdicionar = async () => {
    let novoEstoque = Number(estoque) + Number(addRemEstoque)
    editProduto(novoEstoque)
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }  

  const handleRemover = async () => {
    let novoEstoque = Number(estoque) - Number(addRemEstoque)
    editProduto(novoEstoque)
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }  
  

  return (
    <>
      <div style={{marginRight:"0px", padding:"0px"}}>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="referencia">Referência:</label>
            <input
              style={{fontSize:'20px', padding:'0', color:"#989889"}}
              type="text"
              id="referencia"
              defaultValue={selectedReferencia}
              disabled
            />
          </div>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="estoque">Estoque:</label>
            <input
              style={{fontSize:'20px', padding:'0', color:"#989889"}}
              type="number"
              id="estoque"
              defaultValue={selectedEstoque}
              disabled
            />
          </div>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="estoque">Adicionar/Remover:</label>
            <input
              style={{fontSize:'20px', padding:'0'}}
              type="number"
              id="AddRem"
              value={addRemEstoque}
              onChange={(e) => setAddRemEstoque(e.target.value)}
            />
            <label style={{fontSize:'12px', padding:'0', color:"#563554"}} htmlFor="estoque">NAO COLOCAR SINAL</label>
          </div>
          <div className='row m-2'>
            <button style={{fontSize:'20px', padding:'0'}} onClick={()=>{handleAdicionar()}} > ADICIONAR (+)</button>
          </div>
          <div className='row m-2'>
            <button style={{fontSize:'20px', padding:'0'}} onClick={()=>{handleRemover()}} > REMOVER (-)</button>
          </div>
      </div>
    </>
  )
}


export default Estoque