import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Produto from '../views/Produto'
import Costureiro from '../views/Costureiro'
import Producao from '../views/Producao'

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/produto" element={<Produto />} />
        <Route path="/costureiro" element={<Costureiro />} />
        <Route path="/producao" element={<Producao />} />
        {/* <Route path="/orientacao" element={<Orientacao/>} />
        <Route path="/orientacaoprofessor" element={<OrientacaoProfessor/>} />
        
        
        <Route path="/tcc" element={<Tcc />} /> */}
      </Routes>
    </>
  )
}

