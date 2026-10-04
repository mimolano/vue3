import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.dailymotion.com',
  timeout: 8000,
})
