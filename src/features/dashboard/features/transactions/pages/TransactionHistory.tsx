import { useFetchAccountTransactions } from '@/api'
import { useFetchAccounts } from '@/api/queries/account'
import { Loading, Typography } from '@/common/components'
import Table from '@/common/components/Table'
import { usePrintErrorMessage } from '@/common/hooks'
import type { ColumnDef } from '@tanstack/react-table'
import TransactionStatus from '../components/TransactionStatus'
import { Button } from '@/common/components/ui/button'
import { Maximize2Icon } from 'lucide-react'

const MyPartner = () => {
  const onError = usePrintErrorMessage()

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
  } = useFetchAccountTransactions(accountsData?.accounts[0]?.id ?? '')

  if (accountsIsPending || transactionsIsPending) {
    return <Loading />
  }

  if (transactionsIsError) {
    onError(transactionsError)
  }

  if (accountsIsError) {
    onError(accountsError)
  }

  const transactions = transactionsData?.transactions ?? []
  type Transactions = (typeof transactions)[number]

  console.log(transactions)

  const columns: ColumnDef<Transactions>[] = [
    {
      accessorKey: 'id',
      header: 'Tx ID',
    },
    {
      accessorKey: 'amount',
      header: 'amount',
      cell: ({ row }) => {
        const tx = row.original
        return (
          <span>
            {tx.currency_symbol}
            {tx.amount}
          </span>
        )
      },
    },
    {
      accessorKey: 'date_created',
      header: 'date',
      cell: ({ row }) => {
        const tx = row.original
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        }).format(new Date(tx.date_created))
        return <span>{formattedDate}</span>
      },
    },
    {
      accessorKey: 'status',
      header: 'status',
      cell: ({ row }) => {
        const tx = row.original
        const formattedDate = tx.date_confirmed
          ? new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: false,
            }).format(new Date(tx.date_confirmed))
          : undefined
        return <TransactionStatus status={tx.status} confirmationDate={formattedDate} />
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const tx = row.original
        return (
          <div className="flex justify-end">
            <Button onClick={() => console.log(`${tx.id}-yo`)} size={'sm'} variant={'outline'}>
              <Maximize2Icon size={14} />
            </Button>
          </div>
        )
      },
      enableSorting: false,
    },
  ]

  const tableData = {
    rows: transactions,
    pageCount: 3,
  }

  return (
    <div className="mx-auto">
      <Typography className="font-semibold" variant={'h3'}>
        {'Transaction History'}
      </Typography>
      <Table
        columns={columns}
        data={tableData}
        handlePagination={(paginationConfig) =>
          console.log('pagination config changed', paginationConfig)
        }
        options={{ sort: true, pagination: true }}
      />
    </div>
  )
}

export default MyPartner
