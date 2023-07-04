import Janela from '../components/janela'
import { useEffect, useState } from 'react'
import serviceProduto from '../app/service/ProdutoService'
import './produto.css'
import AddProduto from '../components/addProduto'
import EditProduto from '../components/editaProduto'
import DelProduto from '../components/delProduto'

function Produto() {
  const [referencia, setReferencia] = useState('Select')
  const [descricao, setDescricao] = useState('Descricao')
  const [estoque, setEstoque] = useState(0)
  const [id, setId] = useState('')
  const [dados, setDados] = useState('')
  const [paginaCRUD, setPaginaCRUD] = useState('ADICIONAR')
  const [layoutCRUD, setLayoutCRUD] = useState()
  const [isLoading, setLoading] = useState(true)
  const [alerta, setAlerta] = useState()

  async function buscaTabela(setDados){
    try{
      const response = await serviceProduto.getListaProdutos(alteraAlerta)
      setDados(response.data)
    }catch(e){
      console.log(e)
    }
  }
  function atualizar(){
    setLoading(true)
  }

  function clearProduto(){
    setDescricao('')
    setReferencia('')
    setEstoque('0')
    setId('')
    setLoading(true)
  }

  function changeDados(val){
    setReferencia(val.referencia)
    setDescricao(val.descricao)
    setEstoque(val.estoque)
    setId(val.id)
  }
  
  function alteraAlerta(tipo){
    console.log(tipo)
    setAlerta(tipo)
  }

  function alert(tipo){
    const delay = 8000
    const handleAction =() =>{
      alteraAlerta('')
    }
    const timer = setTimeout(handleAction, delay)
    if (tipo){
      return(
        <>
          <div style={{position:"absolute", backgroundColor:"red", fontSize:"20px", maxWidth:"400px", right:"10px", top:"10px"}} onClick={()=>setAlerta('')}>
            <>{tipo}</>
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
      setLayoutCRUD(<AddProduto 
        referencia={referencia} 
        descricao={descricao} 
        estoque={estoque}
        clearProduto={clearProduto}
        alteraAlerta={alteraAlerta}
        />)
    }else if(paginaCRUD === 'EDITAR'){
      setLayoutCRUD(<EditProduto
        id={id}
        referencia={referencia} 
        descricao={descricao} 
        estoque={estoque}
        clearProduto={atualizar}
        alteraAlerta={alteraAlerta}
      />)
    }else if(paginaCRUD === 'DELETAR'){
      setLayoutCRUD(<DelProduto
        id={id}
        referencia={referencia} 
        descricao={descricao} 
        estoque={estoque}
        clearProduto={clearProduto}
        alteraAlerta={alteraAlerta}
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
      <Janela>
        {alert(alerta)}
        <div className='row d-flex align-items-start' style={{fontSize:'20px'}}>
          <div className='col-6 col-md-4 m-1' style={{border:"2px solid black"}}>
            <div>
              <div className='row' style={{borderBottom:"2px solid black"}}>
                <div className={`col ${paginaCRUD === 'ADICIONAR' ? 'active' : ''}`} style={{textAlign:'center'}} onClick={()=>setPaginaCRUD('ADICIONAR')}>ADICIONAR</div>
                <div className={`col ${paginaCRUD === 'EDITAR' ? 'active' : ''}`} style={{textAlign:'center'}} onClick={()=>setPaginaCRUD('EDITAR')}>EDITAR</div>
                <div className={`col ${paginaCRUD === 'DELETAR' ? 'active' : ''}`} style={{textAlign:'center'}} onClick={()=>setPaginaCRUD('DELETAR')}>DELETAR</div>
              </div>
              <div style={{marginTop:"0%", padding:"0%"}}>
                {layoutCRUD}
              </div>
            </div>
          </div>
          <div className='col m-1'>
            <div className="row justify-content-between" style={{backgroundColor:"black", padding:"0px 10px"}}>
              <p className="col-4" style={{padding:"0px", margin:"0px"}}>Referência</p>
              <p className="col-7" style={{padding:"0px", margin:"0px"}}>Descrição</p>
              <p className="col-1" style={{padding:"0px", margin:"0px"}}>Estoque</p>
            </div>
            <div id="table-wrapper" className='row' style={{fontSize:'16px'}}>
              <div id="table-scroll" style={{border:"2px solid black"}}>
                <ul className='row justify-content-center' style={{padding:"0px", margin:'0px'}}>
                  {dados.map((val)=>{
                    return(
                      <li key={val.id} bgcolor="#EEEEEE" className='row justify-content-between' onClick={()=>changeDados(val)}>
                        <p className='col-4' style={{margin:'0px', padding:'1px 0px'}}>{val.referencia}</p>
                        <p className='col-7' style={{margin:'0px', padding:'1px 0px'}}>{val.descricao}</p>
                        <p className='col-1' style={{margin:'0px', padding:'1px 0px'}}>{val.estoque}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Janela>
  )

}
export default Produto
 