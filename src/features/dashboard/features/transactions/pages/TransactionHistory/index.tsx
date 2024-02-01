import { useFetchAccountTransactions } from '@/api'
import { useFetchAccounts } from '@/api/queries/account'
import { Loading, Typography } from '@/common/components'
import type { PaginationConfig } from '@/common/components/Table'
import Table from '@/common/components/Table'
import { usePrintErrorMessage } from '@/common/hooks'

import { transactionHistoryColumns } from './columns'
import { useCallback } from 'react'
import { NumberParam, useQueryParam } from 'use-query-params'

const INITIAL_PAGE_INDEX = 0
const INITIAL_LIMIT = 20

const TransactionHistoryTable = () => {
  const onError = usePrintErrorMessage()

  const [page = INITIAL_PAGE_INDEX, setPage] = useQueryParam('page', NumberParam)
  const [limit = INITIAL_LIMIT, setLimit] = useQueryParam('limit', NumberParam)

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
    page: page ?? INITIAL_PAGE_INDEX,
    limit: limit ?? INITIAL_LIMIT,
  })

  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }: PaginationConfig) => {
      setPage(pageIndex)
      setLimit(pageSize)
    },
    [setPage, setLimit],
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
          pageIndex: page ?? INITIAL_PAGE_INDEX,
          pageSize: limit ?? INITIAL_LIMIT,
        }}
      />
    </div>
  )
}

export default TransactionHistoryTable
