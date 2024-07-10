import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

interface FailedRequestQueueItem {
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

let isRefreshing = false
let failedQueue: FailedRequestQueueItem[] = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return axios(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem(REFRESH_TOKEN)
      if (!refreshToken) {
        return Promise.reject(error)
      }

      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/token/refresh`, { token: refreshToken })
          .then(({ data }) => {
            localStorage.setItem(ACCESS_TOKEN, data.accessToken)
            api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
            }
            processQueue(null, data.accessToken)
            resolve(axios(originalRequest))
          })
          .catch(err => {
            processQueue(err, null)
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(error)
  }
)

export default api
