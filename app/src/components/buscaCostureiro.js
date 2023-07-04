import React, { useEffect, useState } from 'react'
import ProdutoService from '../app/service/ProdutoService'
import costureiroService from '../app/service/CostureiroService'
function BuscaCostureiro(props) {
  const { alteraAlerta, buscaPorCostureiro, costureiros } = props
  const [costureiro, setCostureiro] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
    buscaPorCostureiro(costureiro)
  },costureiro)
  
  const handleSelect = (selectedOption) =>{
    console.log('ALTERA')
    setCostureiro(selectedOption)
  }

  useEffect(()=>{
    setLoading(false)
  },[costureiros])

  if(isLoading){

    return(
      <>
      LOADING...
      </>
    )
  }
  return (
    <>
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
    </>
  )
}

export default BuscaCostureiro