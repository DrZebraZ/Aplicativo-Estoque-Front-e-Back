import React, { useState } from 'react'
import NavBar from '../components/navbar'
function Janela(props) {

  return(
    <div className="justify-content-center align-items-center" style={{padding:"0px", margin:"0px"}}>
      <NavBar/>
      <div className="container-fluid" style={{borderRadius: 10, backgroundColor: "#4C9BE8", padding: "12px 2%", marginTop: "2%", transition: ".5s linear"}}>
        {props.children}
      </div>
    </div>
  )
}
export default Janela