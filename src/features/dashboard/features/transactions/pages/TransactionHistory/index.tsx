import { useFetchAccountTransactions } from '@/api'
import { useFetchAccounts } from '@/api/queries/account'
import { Loading, Typography } from '@/common/components'
import type { PaginationConfig } from '@/common/components/Table'
import Table from '@/common/components/Table'
import { usePrintErrorMessage } from '@/common/hooks'

import usePagination from '@/common/hooks/usePagination'
import { transactionHistoryColumns } from './columns'

const INITIAL_PAGE_INDEX = 0
const INITIAL_LIMIT = 20

const TransactionHistoryTable = () => {
  const onError = usePrintErrorMessage()
  const { currentPage, currentLimit, onChangePage, onChangeLimit } = usePagination({
    initialPage: INITIAL_PAGE_INDEX,
    initialLimit: INITIAL_LIMIT,
  })

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
    page: currentPage,
    limit: currentLimit,
  })

  const handlePaginationChange = ({ pageIndex, pageSize }: PaginationConfig) => {
    onChangePage(pageIndex)
    onChangeLimit(pageSize)
  }

  const tableData = {
    rows: transactionsData?.transactions ?? [],
    pageCount: transactionsData?.numOfPages,
  }

  if (accountsIsPending || transactionsIsPending) {
    return <Loading />
  }

  if (transactionsIsError) {
    onError(transactionsError)
  }

  if (accountsIsError) {
    onError(accountsError)
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
          pageIndex: currentPage,
          pageSize: currentLimit,
        }}
      />
    </div>
  )
}

export default TransactionHistoryTable
