import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface PaginationOptions {
  initialPage: number
  initialLimit: number
}

interface PaginationResult {
  currentPage: number
  currentLimit: number
  onChangePage: (value: number) => void
  onChangeLimit: (value: number) => void
}

const usePagination = (options: PaginationOptions): PaginationResult => {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const pageQs = queryParams.get('page')
  const limitQs = queryParams.get('limit')

  const initialPageFromUrl = pageQs ? Number.parseInt(pageQs) - 1 : options.initialPage
  const initialLimitFromUrl = limitQs ? Number.parseInt(limitQs) : options.initialLimit

  const [currentPage, setCurrentPage] = useState(initialPageFromUrl)
  const [currentLimit, setCurrentLimit] = useState(initialLimitFromUrl)

  const updateUrl = useCallback(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('page', String(currentPage + 1))
    newSearchParams.set('limit', String(currentLimit))
    navigate({ search: newSearchParams.toString() })
  }, [currentLimit, currentPage, navigate])

  const onChangePage = (value: number) => {
    setCurrentPage(value)
  }

  const onChangeLimit = (value: number) => {
    setCurrentLimit(value)
  }

  useEffect(() => {
    updateUrl()
  }, [currentPage, currentLimit, updateUrl])

  return {
    currentPage,
    currentLimit,
    onChangePage,
    onChangeLimit,
  }
}

export default usePagination
