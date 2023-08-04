import axios from 'axios'
import { BASE_URL } from './config'

export const taskApi = axios.create(
    {
        baseURL : BASE_URL 
    }
)