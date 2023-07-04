import React, { useEffect, useState } from 'react'
function BuscaProdutos(props) {
  const { alteraAlerta} = props
  const [dados, setDados] = useState()
  const [isLoading, setLoading] = useState(true)
  
  console.log('BUSCAPRODUTOS')
  
  if(isLoading){
    return(
      <>
        LOADING...
      </>
    )
  }else{
  return (
    <>
      BOTOEEEEES
    </>
  )}
}

export default BuscaProdutos