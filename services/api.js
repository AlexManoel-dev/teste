import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://10.1.10.11:8080'
})

export default instance