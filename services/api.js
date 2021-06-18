import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://10.1.10.11:3000'
})

export default instance