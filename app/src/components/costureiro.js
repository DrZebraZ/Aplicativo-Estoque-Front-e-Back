import React, { useEffect, useState } from 'react'
import CostureiroService from '../app/service/CostureiroService'
function CostureiroComp(props) {
  const {id, nome, clearProduto, alteraAlerta} = props
  const [addNome, setNome] = useState('')
  const [addId, setId] = useState('')

  async function costureiroAdd(nome){
    const response = await CostureiroService.add({
      "nome":nome
    }, alteraAlerta)
    clearProduto()
  }

  const handleFormADD = async (e) => {
    e.preventDefault()
    const response = await costureiroAdd(addNome)
    clearProduto()
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }
  const handleFormDEL = async (e) => {
    e.preventDefault()
    const response = await CostureiroService.deletaCostureiro(addId, alteraAlerta)
    clearProduto()
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  }

  useEffect(() => {
    setNome(nome)
    setId(id)
  }, [id, nome])


  return (
    <>
      <div style={{padding:"0px"}}>
        <form  onSubmit={handleFormADD}>
          <div className='row m-2'>
            <label style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="descricao">Nome:</label>
            <input
              style={{fontSize:'20px', padding:'0'}}
              type="text"
              id="nome"
              value={addNome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className='row m-2'>
            <button style={{fontSize:'20px', padding:'0'}} type="submit">Adicionar</button>
          </div>
        </form>
        <form  onSubmit={handleFormDEL}>
          <div className='row m-2'>
            <button style={{fontSize:'20px', padding:'0'}} type="submit">DELETAR!</button>
          </div>
          </form>
      </div>
    </>
  )
}

export default CostureiroComp