import React, { useEffect, useState } from 'react'
function BuscaCostureiro(props) {
  const { buscaPorCostureiro, costureiros } = props
  const [isLoading, setLoading] = useState(true)
  
  const handleSelect = (selectedOption) =>{
    console.log('ALTERA')
    buscaPorCostureiro(selectedOption)
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
              <div className="col-4 col-md-4 form-check" style={{overflow:'hidden', minWidth:"100px"}} key={val.id} onChange={(event)=>handleSelect(event.target.value)}>
                <input className="form-check-input" value={val.id} style={{backgroundColor:"black"}} type="radio" name="flexRadioDefault" id="flexRadioDefault"/>
                <label value={val.id}  className="form-check-label" htmlFor="flexRadioDefault1" style={{overflow:'hidden'}}>
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