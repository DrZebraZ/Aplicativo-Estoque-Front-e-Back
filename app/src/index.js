import React from 'react'
import ReactDOM from 'react-dom'
import App from './main/App'
import env from "react-dotenv"

process.env.REACT_APP_SERVER_HOST = env.LOCALHOST

ReactDOM.render(<App />, document.getElementById('root'))
