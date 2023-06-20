import Janela from '../components/janela'
import { useEffect, useState } from 'react'
import costureiroService from '../app/service/CostureiroService'
import './produto.css'
import CostureiroComp from '../components/costureiro'

function Costureiro() {
  const [nome, setNome] = useState('Name')
  const [id, setId] = useState('')
  const [dados, setDados] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [alerta, setAlerta] = useState()
  const [layoutCRUD, setLayoutCRUD] = useState(<CostureiroComp/>)
  const [tamanhoFonte, setTamanhoFonte] = useState(10)

  async function buscaTabela(setDados){
    try{
      const response = await costureiroService.getListaCostureiros()
      setDados(response.data)
    }catch(e){
      console.log(e)
    }
  }

  function clearProduto(){
    setNome('')
    setId('')
    setLoading(true)
  }

  function changeDados(val){
    setNome(val.nome)
    setId(val.id)
  }
  
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
          <div style={{position:"absolute", backgroundColor:"red", fontSize:`${tamanhoFonte+4}px`, maxWidth:"400px", right:"10px", top:"10px"}} onClick={()=>setAlerta('')}>
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

  useEffect(() => {
    buscaTabela(setDados)
  },[isLoading])

  useEffect(()=>{
    setLayoutCRUD(<CostureiroComp 
      nome={nome} 
      id={id} 
      clearProduto={clearProduto}
      alteraAlerta={alteraAlerta}
      />)
  },[nome, id, isLoading])

  useEffect(()=>{
    if (!dados){
      setLoading(true)
      buscaTabela(setDados)
    }else{
      setLoading(false)
    }
  },[dados])
  if (isLoading){
    return(
      <>
      <Janela>
        LOADING...
      </Janela>
      </>
    )
  }
  return (
    <>
      <Janela>
        {alert(alerta)}
        <div className='row' style={{fontSize:'20px'}}>
          <div className='col-6 col-md-4 m-1' style={{margin:"0px",  padding:"0px", border:"2px solid black"}}>
            {layoutCRUD}
          </div>
          <div className='col m-1' id='titulos'>
            <div className="row justify-content-between" style={{backgroundColor:"black", padding:"0px 10px"}}>
              <p className="col-6" style={{padding:"0px", margin:"0px"}}>ID</p>
              <p className="col-6" style={{padding:"0px", margin:"0px"}}>NOME</p>
            </div>
            <div id="table-wrapper" className='row' style={{fontSize:`${tamanhoFonte}px`}}>
              <div id="table-scroll" style={{border:"2px solid black"}}>
                <ul className='row justify-content-center' style={{padding:"0px", margin:'0px'}}>
                  {dados.map((val)=>{
                    return(
                      <li key={val.id} bgcolor="#EEEEEE" className='row justify-content-between' onClick={()=>changeDados(val)}>
                        <p className='col-6' style={{margin:'0px', padding:'1px 0px'}}>{val.id}</p>
                        <p className='col-6' style={{margin:'0px', padding:'1px 0px'}}>{val.nome}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Janela>
    </>
  )
}
export default Costureiro
 