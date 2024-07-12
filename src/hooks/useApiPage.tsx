import api from '@/services/Api'
import { __PAGE } from '@types'
import { useCallback, useEffect, useState } from 'react'

// Define an interface that extends the required id property
interface WithId {
  id: string
}

function useApiPage<T extends WithId>(apiUrl: string) {
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
  }, [apiUrl])

  const removeFromData = useCallback(
    (element: T) => {
      setPageData(prev => prev.filter(obj => obj !== element))
    },
    [setPageData]
  )

  const removeFromDataById = useCallback(
    (id: string) => {
      setPageData(prev => prev.filter(obj => obj.id !== id))
    },
    [setPageData]
  )

  return { pageData, pageError, pageLoading, isFinished, fetchNextPage, removeFromData, removeFromDataById }
}

export default useApiPage
