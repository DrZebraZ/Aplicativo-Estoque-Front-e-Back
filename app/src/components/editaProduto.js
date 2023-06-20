import React, { useEffect, useState } from 'react'
import ProdutoService from '../app/service/ProdutoService'
function EditProduto(props) {
  const {referencia, descricao, estoque, id, clearProduto, alteraAlerta} = props
  const [addRef, setReferencia] = useState('')
  const [addDesc, setDescricao] = useState('')
  const [addEstq, setEstoque] = useState('')

  async function editProduto(){
    const response = await ProdutoService.editaProduto({
      "referencia":addRef,
      "descricao":addDesc,
      "estoque":addEstq,
      "id":id
    }, alteraAlerta)
    clearProduto()
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    editProduto()
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }

  useEffect(() => {
    setReferencia(referencia)
    setDescricao(descricao)
    setEstoque(estoque)
  }, [referencia, descricao, estoque, id, clearProduto])


  return (
    <>
      <div style={{marginRight:"0px", padding:"0px"}}>
        <form  onSubmit={handleFormSubmit}>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="referencia">Referência:</label>
            <input
              style={{fontSize:'20px', padding:'0'}}
              type="text"
              id="referencia"
              value={addRef}
              onChange={(e) => setReferencia(e.target.value)}
            />
          </div>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="descricao">Descrição:</label>
            <input
              style={{fontSize:'20px', padding:'0'}}
              type="text"
              id="descricao"
              value={addDesc}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="estoque">Estoque:</label>
            <input
              style={{fontSize:'20px', padding:'0'}}
              type="number"
              id="estoque"
              value={addEstq}
              onChange={(e) => setEstoque(e.target.value)}
            />
          </div>
          <div className='row m-2'>
            <button style={{fontSize:'20px', padding:'0'}} type="submit">Editar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProduto