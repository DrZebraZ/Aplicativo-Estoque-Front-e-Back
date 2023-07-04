import Janela from '../components/janela'
import { useEffect, useState } from 'react'
import costureiroService from '../app/service/CostureiroService'
import dadosService from '../app/service/DadosService'
import BuscaCostureiro from '../components/buscaCostureiro'
import BuscaProdutos from '../components/buscaProdutos'
import produtoService from '../app/service/ProdutoService'

function Dados() {
  const [producao, setProducao] = useState()
  const [costureiros, setCostureiros] = useState()
  const [resultados, setResultados] = useState()
  const [loading, setLoading] = useState(true)
  const [alerta, setAlerta] = useState()
  const [paginaCRUD, setPaginaCRUD] = useState(null)
  const [layoutCRUD, setLayoutCRUD] = useState(null)
  const [produtos, setProdutos] = useState()
  const [params, setParams] = useState('')

  async function buscaCostureiros(){
    console.log('buscaCostureiros')
    const response = await costureiroService.getListaCostureiros(alteraAlerta)
    setCostureiros(response.data)
  }

  async function buscaProducao(){
    console.log('buscaProducao')
    const response = await dadosService.getProduzidos(params, alteraAlerta)
    setProducao(response.data)
  }

  async function buscaProtudos(){
    console.log('buscaProtudos')
    const response = await produtoService.getListaProdutos(alteraAlerta)
    setProdutos(response.data)
  }

  async function buscaResultados(){
    console.log('buscaResultados')
    const response = await dadosService.getResultados(params, alteraAlerta)
    setResultados(response.data)
  }

  function buscaPorCostureiro(idCostureiro){
    setParams(`costureiro_id=${idCostureiro}`)
  }

  function buscaPorProduto(idProduto){
    setParams(`produto_id=${idProduto}`)
  }

  function alteraAlerta(tipo){
    console.log(tipo)
    setAlerta(tipo)
  }

  useEffect(()=>{
    buscaResultados()
    buscaProducao()
  }, [params])

  useEffect(()=>{
    buscaCostureiros()
    buscaProducao()
    buscaResultados()
    buscaProtudos()
  }, [loading])

  useEffect(()=>{
    if (!producao || !costureiros || !resultados){
      setLoading(true)
    }else{
      setLoading(false)
    }
  },[producao, costureiros, resultados])

  useEffect(()=>{
    if(loading==true){
      setLayoutCRUD(<>LOADING...</>)
    }
    if(paginaCRUD === null){
      setPaginaCRUD('COSTUREIROS')
    }
    if(paginaCRUD === 'COSTUREIROS'){
      setLayoutCRUD(<BuscaCostureiro 
        costureiros={costureiros}
        buscaPorCostureiro={buscaPorCostureiro}
      />)
    }else if(paginaCRUD === 'REFERENCIA'){
      setLayoutCRUD(<BuscaProdutos
        produtos={produtos}
        buscaPorProduto={buscaPorProduto}
      />)
    
    }
  },[paginaCRUD, loading])

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

  if(loading){
    return(
      <>
        <Janela>
          LOADING...
        </Janela>
      </>
    )
  }else{
  return (
    <>
      <Janela>
        {alert(alerta)}
        <div className='row' style={{fontSize:'20px'}}>
          <div className='col-6 col-md-4 m-1' style={{border:"2px solid black"}}>
            <div className='row' style={{borderBottom:"2px solid black"}}>
              <div className={`col ${paginaCRUD === 'COSTUREIROS' ? 'active' : ''}`} style={{textAlign:'center'}} onClick={()=>setPaginaCRUD('COSTUREIROS')}>COSTUREIROS</div>
              <div className={`col ${paginaCRUD === 'REFERENCIA' ? 'active' : ''}`} style={{textAlign:'center'}} onClick={()=>setPaginaCRUD('REFERENCIA')}>REFERENCIA</div>
            </div>
            <div style={{marginTop:"0%", padding:"0%"}}>
              {layoutCRUD}
            </div>
          </div>
          <div className='col m-1' style={{margin:"0px", margin:"10px"}}>
            <div className="row justify-content-between" style={{backgroundColor:"black", paddingLeft:'10px', paddingRight:'30px'}}>
              <p className="col-2" style={{padding:"0px", margin:"0px"}}>Data</p>
              <p className="col-5" style={{padding:"0px", margin:"0px"}}>Quantia</p>
              <p className="col-5" style={{padding:"0px", margin:"0px"}}>Costureiro</p>
            </div>
            <div id="table-wrapper" className='row' style={{fontSize:'16px', maxHeight:"500px"}}>
              <div id="table-scroll-dados" style={{border:"2px solid black"}}>
                <ul className='row justify-content-center' style={{padding:"0px", margin:'0px'}}>
                  {resultados.map((val)=>{
                    return(
                      <li key={`${val.dia}-${val.costureiro}`} bgcolor="#EEEEEE" className='row justify-content-between' style={{margin:'0px'}}>
                        <p className='col-2' style={{margin:'0px', padding:'1px 0px'}}>{val.dia}</p>
                        <p className='col-5' style={{margin:'0px', padding:'1px 0px'}}>{val.producao_diaria}</p>
                        <p className='col-5' style={{margin:'0px', padding:'1px 0px'}}>{val.costureiro}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='col m-1'  style={{padding:"0px"}}>
          <div className="row justify-content-between" style={{backgroundColor:"black", paddingLeft:"10px", paddingRight:"30px"}}>
            <p className="col-3" style={{padding:"0px", margin:"0px"}}>Data Finalizado</p>
            <p className="col-5" style={{padding:"0px", margin:"0px"}}>Referência</p>
            <p className="col-2" style={{padding:"0px", margin:"0px"}}>Quantia</p>
            <p className="col-2" style={{padding:"0px", margin:"0px"}}>Costureiro</p>
          </div>
          <div id="table-wrapper" className='row' style={{fontSize:'16px'}}>
            <div id="table-scroll" style={{border:"2px solid black"}}>
              <ul className='row justify-content-center' style={{padding:"0px", margin:'0px'}}>
                {producao.map((val)=>{
                  return(
                    <li key={`${val.dia}-${val.referencia}-${val.costureiro}`} bgcolor="#EEEEEE" className='row justify-content-between'>
                      <p className='col-3' style={{margin:'0px', padding:'1px 0px'}}>{val.dia}</p>
                      <p className='col-5' style={{margin:'0px', padding:'1px 0px'}}>{val.referencia}</p>
                      <p className='col-2' style={{margin:'0px', padding:'1px 0px'}}>{val.producao_diaria}</p>
                      <p className='col-2' style={{margin:'0px', padding:'1px 0px'}}>{val.costureiro}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </Janela>
    </>
  )
}}
export default Dados
 