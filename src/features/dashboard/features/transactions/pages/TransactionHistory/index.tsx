import { useFetchAccountTransactions } from '@/api'
import { useFetchAccounts } from '@/api/queries/account'
import { Loading, Typography } from '@/common/components'
import type { PaginationConfig } from '@/common/components/Table'
import Table from '@/common/components/Table'
import { usePrintErrorMessage } from '@/common/hooks'
import { Outlet } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { NumberParam, useQueryParam } from 'use-query-params'
import { transactionHistoryColumns } from './columns'

const INITIAL_PAGE = 1
const INITIAL_PAGE_INDEX = 0
const INITIAL_LIMIT = 20

const TransactionHistoryTable = () => {
  const onError = usePrintErrorMessage()

  const [page = INITIAL_PAGE, setPage] = useQueryParam('page', NumberParam)
  const [limit = INITIAL_LIMIT, setLimit] = useQueryParam('limit', NumberParam)
  const currentPageIndex = page ? page - 1 : INITIAL_PAGE_INDEX

  const {
    isPending: accountsIsPending,
    isError: accountsIsError,
    error: accountsError,
    data: accountsData,
  } = useFetchAccounts()

  const {
    isPending: transactionsIsPending,
    isError: transactionsIsError,
    error: transactionsError,
    data: transactionsData,
  } = useFetchAccountTransactions(accountsData?.accounts[0]?.id ?? '', {
    page: currentPageIndex,
    limit: limit ?? INITIAL_LIMIT,
  })

  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }: PaginationConfig) => {
      setLimit(pageSize)
      setPage(pageIndex + 1)
    },
    [setLimit, setPage],
  )

  const tableData = {
    rows: transactionsData?.transactions ?? [],
    pageCount: transactionsData?.numOfPages,
  }

  if (accountsIsPending || transactionsIsPending) {
    return <Loading />
  }

  if (transactionsIsError) {
    onError(transactionsError, 'TransactionHistoryError')
  }

  if (accountsIsError) {
    onError(accountsError, 'TransactionHistoryAccountsError')
  }

  return (
    <div className="mx-auto">
      <Typography className="font-semibold" variant={'h3'}>
        {'Transaction History'}
      </Typography>
      <Table
        columns={transactionHistoryColumns}
        data={tableData}
        handlePagination={handlePaginationChange}
        options={{ sort: true, pagination: true }}
        paginationConfig={{
          pageIndex: currentPageIndex,
          pageSize: limit ?? INITIAL_LIMIT,
        }}
      />
      <Outlet />
    </div>
  )
}

export default TransactionHistoryTable
