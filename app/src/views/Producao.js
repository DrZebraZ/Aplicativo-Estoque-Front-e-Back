import Janela from '../components/janela'
import { useEffect, useState } from 'react'
import './produto.css'
import AddProducao from '../components/addProducao'
import producaoService from '../app/service/ProducaoService'
import FinalizaProducao from '../components/finalizaProducao'

function Producao() {
  const [referencia, setReferencia] = useState('Select')
  const [finalizados, setFinalizados] = useState('')
  const [quantia, setQuantia] = useState(0)
  const [id, setId] = useState('')
  const [dados, setDados] = useState('')
  const [isLoading, setLoading] = useState()
  const [alerta, setAlerta] = useState()
  const [layoutCRUD, setLayoutCRUD] = useState(<AddProducao/>)
  const [paginaCRUD, setPaginaCRUD] = useState('ADICIONAR')

  async function buscaTabela(setDados){
    try{
      const response = await producaoService.listaProducao(alteraAlerta)
      setDados(response.data)
    }catch(e){
      console.log(e)
    }
  }

  function clearProduto(){
    setReferencia('')
    setFinalizados('')
    setQuantia('')
    setLoading(true)
  }

  function changeDados(val){
    setReferencia(val.referencia)
    setQuantia(val.quantia)
    setFinalizados(val.finalizados)
    setId(val.id)
  }
  
  function alteraAlerta(tipo){
    console.log(tipo)
    setAlerta(tipo)
  }

  function alert(tipo, message){
    const delay = 15000
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

  useEffect(() => {
    buscaTabela(setDados)
  },[isLoading])

  useEffect(()=>{
    if(paginaCRUD === 'ADICIONAR'){
      setLayoutCRUD(<AddProducao 
        clearProduto={clearProduto}
        alteraAlerta={alteraAlerta}
        referencia={referencia}
        />)
      }else if(paginaCRUD === 'FINALIZAR'){
      setLayoutCRUD(<FinalizaProducao
        clearProduto={clearProduto}
        alteraAlerta={alteraAlerta}
        dados={dados}
      />)
    }
  },[paginaCRUD, referencia, isLoading])

  useEffect(()=>{
    if (!dados){
      setLoading(true)
      buscaTabela(setDados)
    }else{
      setLoading(false)
    }
  },[dados])
  if (isLoading || !dados){
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
          <div className='col-6 col-md-4 m-1' style={{border:"2px solid black"}}>
            <div className='row' style={{borderBottom:"2px solid black"}}>
              <div className={`col ${paginaCRUD === 'ADICIONAR' ? 'active' : ''}`} style={{textAlign:'center'}} onClick={()=>setPaginaCRUD('ADICIONAR')}>ADICIONAR</div>
              <div className={`col ${paginaCRUD === 'FINALIZAR' ? 'active' : ''}`} style={{textAlign:'center'}} onClick={()=>setPaginaCRUD('FINALIZAR')}>FINALIZAR</div>
            </div>
            <div style={{marginTop:"0%", padding:"0%"}}>{layoutCRUD}</div>
          </div>
          <div className='col m-1'>
            <div className="row justify-content-between" style={{backgroundColor:"black", padding:"0px 10px"}}>
              <p className="col-6" style={{padding:"0px", margin:"0px"}}>Referência</p>
              <p className="col-2" style={{padding:"0px", margin:"0px"}}>Quantia</p>
              <p className="col-2" style={{padding:"0px", margin:"0px"}}>Finalizados</p>
            </div>
            <div id="table-wrapper" className='row'>
              <div id="table-scroll" style={{border:"2px solid black"}}>
                <ul className='row justify-content-center' style={{padding:"0px", margin:'0px'}}>
                  {dados.map((val)=>{
                    return(
                      <li key={val.id} bgcolor="#EEEEEE" className='row justify-content-between' onClick={()=>changeDados(val)}>
                        <p className='col-6' style={{margin:'0px', padding:'1px 0px'}}>{val.referencia}</p>
                        <p className='col-2' style={{margin:'0px', padding:'1px 0px'}}>{val.quantidade}</p>
                        <p className='col-2' style={{margin:'0px', padding:'1px 0px'}}>{val.finalizados}</p>
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
export default Producao
 