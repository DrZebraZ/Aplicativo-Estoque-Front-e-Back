import React, { useEffect, useState } from 'react'
function BuscaProdutos(props) {
  const { buscaPorProduto, produtos } = props
  const [idProduto, setIdProduto] = useState()
  const [isLoading, setLoading] = useState(true)
  
  const handleChange = (id) => {
    console.log(id)
    setIdProduto(id);
  };
  
  useEffect(()=>{
    console.log(idProduto)
    console.log(produtos)
    buscaPorProduto(idProduto)
  },[idProduto])

  useEffect(()=>{
    if(produtos){
      setLoading(false)
    }else{
      setLoading(true)
    }
  },[produtos])

  if(isLoading){
    return(
      <>
        LOADING...
      </>
    )
  }else{
  return (
    <>
    <div className="row" style={{margin:"0px"}}>
      <div style={{fontSize:'20px', padding:'0', color:"#563554"}} htmlFor="referencia">Referência:</div>
      <select onChange={(event)=>handleChange(event.target.value)} style={{fontSize:'20px', padding:'0'}}>
        <option label={'SELECIONE PARA BUSCAR'}></option>
        {produtos.map((val)=>{
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
      </div>
    </>
  )}
}

export default BuscaProdutos