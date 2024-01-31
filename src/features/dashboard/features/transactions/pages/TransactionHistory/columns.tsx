import type { TransactionsResponse } from '@/api'
import type { ColumnDef } from '@tanstack/react-table'
import TransactionStatus from '../../components/TransactionStatus'
import { Button } from '@/common/components/ui/button'
import { Maximize2Icon } from 'lucide-react'

const formatDate = (dateOrString: Date | string) => {
  const dateToConvert = typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(new Date(dateToConvert))
}

export const transactionHistoryColumns: ColumnDef<TransactionsResponse['transactions'][number]>[] =
  [
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
        return <span>{formatDate(tx.date_created)}</span>
      },
    },
    {
      accessorKey: 'status',
      header: 'status',
      cell: ({ row }) => {
        const tx = row.original
        return (
          <TransactionStatus
            status={tx.status}
            confirmationDate={tx.date_confirmed && formatDate(tx.date_confirmed)}
          />
        )
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
