import React from 'react'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import 'bootswatch/dist/superhero/bootstrap.css'
class App extends React.Component {
  
  render() {
    return (
      <div style={{padding:"0px", border:"0px", margin:"0px", width:"100%", height:"100%"}}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
      </div>
    )
  }
}
export default App
