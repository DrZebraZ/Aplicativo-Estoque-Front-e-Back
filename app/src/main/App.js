import React from 'react'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import 'bootswatch/dist/superhero/bootstrap.css'
class App extends React.Component {
  
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <Router />
          </div>
        </BrowserRouter>
      </>
    )
  }
}
export default App
