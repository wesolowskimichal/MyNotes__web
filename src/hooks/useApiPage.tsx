import api from '@/services/Api'
import { __PAGE } from '@types'
import { useEffect, useState } from 'react'

function useApiPage<T>(apiUrl: string) {
  const [url, setUrl] = useState<string | null>(apiUrl)
  const [pageData, setPageData] = useState<T[]>([])
  const [pageLoading, setPageLoading] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)

  const isFinished = () => url === null

  const fetchNextPage = () => {
    const fetchData = async () => {
      setPageLoading(true)
      const apiResponse = await api.get(url!)
      if (apiResponse.status !== 200) {
        setPageError('Could not load the resource')
        setPageLoading(false)
        return
      }
      setPageLoading(false)
      const page: __PAGE<T> = apiResponse.data
      setPageData(prev => [...prev, ...page.data])
      setUrl(page.page_info.links.next)
    }

    if (url) {
      fetchData()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true)
      const apiResponse = await api.get(apiUrl)
      if (apiResponse.status !== 200) {
        setPageError('Could not load the resource')
        setPageLoading(false)
        return
      }
      setPageLoading(false)
      const page: __PAGE<T> = apiResponse.data
      setPageData(page.data)
      setUrl(page.page_info.links.next)
    }

    fetchData()
  }, [])

  return { pageData, pageError, pageLoading, isFinished, fetchNextPage }
}

export default useApiPage
