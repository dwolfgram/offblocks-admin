import { useFetchTransaction } from '@/api'
import { Loading, Typography } from '@/common/components'
import { Modal, ModalContent, ModalHeader } from '@/common/components/ui/modal'
import { CheckIcon, HourglassIcon } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { DASHBOARD_ROUTES, useTransactionDetailParams } from '@/app/routes/dashboard'
import { usePrintErrorMessage } from '@/common/hooks'
import { Separator } from '@/common/components/ui/separator'
import TransactionStatus from '../components/TransactionStatus'
import { cn } from '@/common/styleUtils'
import { formatDate } from './TransactionHistory/columns'
import SeparatedDataRows from '@/common/components/SeparatedDataRows'

const TransactionDetail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { txId, accountId } = useTransactionDetailParams()
  const onError = usePrintErrorMessage()

  const { data, isPending, isError, error } = useFetchTransaction(accountId, txId)
  const tx = data?.transaction
  const isConfirmed = tx?.status === 'confirmed'

  if (isError) {
    onError(error, 'TxDetailToast')
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Short term fix: refreshing while modal is open leads to unwanted behavior due to qs
      navigate({
        pathname: DASHBOARD_ROUTES.transactionHistory.to,
        search: searchParams.toString(),
      })
    }
  }

  return (
    <div className="inset-0 z-10 flex items-center justify-center overflow-y-auto">
      <Modal open={true} onOpenChange={handleOpenChange}>
        <ModalContent className="px-12">
          {isPending ? (
            <Loading />
          ) : (
            <>
              <ModalHeader className="flex items-center justify-center">
                <div
                  className={cn(
                    'mb-2 flex items-center justify-center self-center rounded-full bg-opacity-15 p-3',
                    isConfirmed ? 'bg-green-400' : 'bg-yellow-200 bg-opacity-40',
                  )}
                >
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full bg-opacity-80',
                      isConfirmed
                        ? 'bg-green-500 dark:bg-green-400'
                        : 'bg-yellow-500 dark:bg-yellow-200',
                    )}
                  >
                    {isConfirmed ? (
                      <CheckIcon size={30} className="text-background" />
                    ) : (
                      <HourglassIcon size={24} className="text-background" />
                    )}
                  </div>
                </div>
                <Typography variant={'mutedText'}>
                  {isConfirmed ? 'Transaction Confirmed' : 'Transaction Pending'}
                </Typography>
                <Typography variant={'h2'}>
                  {tx?.currency_symbol}
                  {tx?.amount} {tx?.currency}
                </Typography>
              </ModalHeader>
              <Separator className="my-6" />
              <SeparatedDataRows
                rows={[
                  [
                    'Status',
                    <TransactionStatus key={`${tx?.id}-status`} status={tx?.status ?? ''} />,
                  ],
                  ['Account Number', tx?.account?.id],
                  ['Card', `${tx?.card?.brand} ${tx?.card?.last_4}`],
                  ['Merchant', tx?.merchant_details.name],
                  ['Category', tx?.merchant_details.category_name],
                  ['Transaction Date', formatDate(tx?.date_created ?? '')],
                  ['Confirmation Date', tx?.date_confirmed ? formatDate(tx.date_confirmed) : '-'],
                ]}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TransactionDetail
