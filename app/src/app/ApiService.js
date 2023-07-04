import axios from 'axios'
import env from "react-dotenv"

const LOCALHOST = env.LOCALHOST

const httpClient = axios.create({
  baseURL: `http://${LOCALHOST}:3001`
})

class ApiService {

  constructor(apiurl) {
    this.apiurl = apiurl
  }

  async post(url, objeto, alteraAlerta) {
    const requestUrl = `${this.apiurl}${url}`
    await httpClient.post(requestUrl, objeto).then(response => {
      if(response.data){
        alteraAlerta(`${response.data}`)
      }
      return response
    }).catch(err => {
      console.log(err)
      if(err.response.data.message){
        alteraAlerta(err.response.data.message)
      }else if (err.response.data){
        alteraAlerta(err.response.data)
      }else{
        alteraAlerta(`${err}`)
      }
    })
  }

  async put(url, objeto, alteraAlerta) {
    const requestUrl = `${this.apiurl}${url}`
    await httpClient.put(requestUrl, objeto).then(response => {
      if(response.data){
        alteraAlerta(`${response.data}`)
      }
      return response
    }).catch(err => {
      console.log(err)
      if(err.response.data.message){
        alteraAlerta(err.response.data.message)
      }else if (err.response.data){
        alteraAlerta(err.response.data)
      }else{
        alteraAlerta(`${err}`)
      }
    })
  }

  async delete(url, alteraAlerta){
    const requestUrl = `${this.apiurl}${url}`
    await httpClient.delete(requestUrl).then(response => {
      if(response.data){
        alteraAlerta(`${response.data}`)
      }
      return response
    }).catch(err => {
      console.log(err)
      if(err.response.data.message){
        alteraAlerta(err.response.data.message)
      }else if (err.response.data){
        alteraAlerta(err.response.data)
      }else{
        alteraAlerta(`${err}`)
      }
    })
  }
    

  async get(url, alteraAlerta){
    const requestUrl = `${this.apiurl}${url}`
    return httpClient.get(requestUrl).then(response => {
      return response
    }).catch(err => {
      console.log(err)
      if(err.response.data.message){
        alteraAlerta(err.response.data.message)
      }else if (err.response.data){
        alteraAlerta(err.response.data)
      }else{
        alteraAlerta(`${err}`)
      }
    })
  }
}
export default ApiService
