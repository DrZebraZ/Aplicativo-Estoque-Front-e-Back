import React, { useEffect, useState } from 'react'
import ProdutoService from '../app/service/ProdutoService'
function DelProduto(props) {
  const {referencia, descricao, estoque, id, clearProduto, alteraAlerta} = props
  const [addRef, setReferencia] = useState('')
  const [addDesc, setDescricao] = useState('')
  const [addEstq, setEstoque] = useState('')
  const [delID, setId] = useState('')

  async function delProduto(){
    await ProdutoService.deletaProduto(delID, alteraAlerta)
    clearProduto()
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await delProduto()
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }

  useEffect(() => {
    setReferencia(referencia)
    setDescricao(descricao)
    setEstoque(estoque)
    setId(id)
  }, [referencia, descricao, estoque, id])


  return (
    <>
      <div style={{marginRight:"0px", padding:"0px"}}>
        <form  onSubmit={handleFormSubmit}>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0' , color:"#563554"}} htmlFor="referencia">Referência:</label>
            <input
              style={{fontSize:'20px', padding:'0', color:"#989889"}}
              type="text"
              id="referencia"
              defaultValue={addRef}
              disabled
            />
          </div>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0' , color:"#563554"}} htmlFor="descricao">Descrição:</label>
            <textarea
              style={{fontSize:'20px', padding:'0', color:"#989889"}}
              type="text"
              id="descricao"
              defaultValue={addDesc}
              disabled
            />
          </div>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0' , color:"#563554"}} htmlFor="estoque">Estoque:</label>
            <input
              style={{fontSize:'20px', padding:'0', color:"#989889"}}
              type="text"
              id="estoque"
              defaultValue={addEstq}
              disabled
            />
          </div>
          <div className='row m-2'>
            <button style={{fontSize:'20px', padding:'0'}} type="submit">Deletar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default DelProduto