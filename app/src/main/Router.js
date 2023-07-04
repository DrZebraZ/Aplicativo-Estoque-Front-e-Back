import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Produto from '../views/Produto'
import Costureiro from '../views/Costureiro'
import Producao from '../views/Producao'
import Dados from '../views/Dados'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/produto" element={<Produto />} />
      <Route path="/costureiro" element={<Costureiro />} />
      <Route path="/producao" element={<Producao />} />
      <Route path="/dados" element={<Dados />} />
    </Routes>
  )
}

