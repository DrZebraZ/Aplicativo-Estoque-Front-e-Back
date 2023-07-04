import React, { useEffect, useState } from 'react'
import Janela from '../components/janela'
import serviceProduto from '../app/service/ProdutoService'
function Home() { 

  const [dados, setDados] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [alerta, setAlerta] = useState()

  async function buscaTabela(){
    try{
      const response = await serviceProduto.getListaProdutosNegativo(alteraAlerta)
      setDados(response.data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    buscaTabela(setDados)
  },[isLoading])

  useEffect(()=>{
    if (!dados){
      setLoading(true)
      buscaTabela(setDados)
    }else{
      setLoading(false)
    }
  },[dados])

  function alteraAlerta(tipo){
    console.log(tipo)
    setAlerta(tipo)
  }

  function alert(tipo, message){
    const delay = 8000
    const handleAction =() =>{
      alteraAlerta('')
    }
    const timer = setTimeout(handleAction, delay)
    if (tipo){
      return(
        <>
          <div style={{position:"absolute", backgroundColor:"red", fontSize:`14px`, maxWidth:"400px", right:"10px", top:"10px"}} onClick={()=>setAlerta('')}>
            <>{tipo}</>
            <p className="mb-0">{message}</p>
          </div>
        </>
      )
    }else{
      clearTimeout(timer)
      return(<></>)
    }
  }

  if (isLoading) {
    buscaTabela()
    return (<>
      <Janela>
        LOADING...
      </Janela>
    </>)
  }
  return (
    <>
      <Janela>
      {alert(alerta)}
        <div className='col m-1'>
          <div className="row justify-content-between" style={{backgroundColor:"black", padding:"0px 10px"}}>
            <p className="col-5" style={{padding:"0px", margin:"0px"}}>Referência</p>
            <p className="col-6" style={{padding:"0px", margin:"0px"}}>Descrição</p>
            <p className="col-1" style={{padding:"0px", margin:"0px"}}>Estoque</p>
          </div>
          <div id="table-wrapper" className='row' style={{fontSize:'16px'}}>
            <div id="table-scroll" style={{border:"2px solid black"}}>
              <ul className='row justify-content-center' style={{padding:"0px", margin:'0px'}}>
                {dados.map((val)=>{
                  return(
                    <li key={val.id} bgcolor="#EEEEEE" className='row justify-content-between'>
                      <p className='col-5' style={{margin:'0px', padding:'1px 0px'}}>{val.referencia}</p>
                      <p className='col-6' style={{margin:'0px', padding:'1px 0px'}}>{val.descricao}</p>
                      <p className='col-1' style={{margin:'0px', padding:'1px 0px'}}>{val.estoque}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        AQUI NÃO TEM NADA
      </Janela>
    </>
  )

}
export default Home