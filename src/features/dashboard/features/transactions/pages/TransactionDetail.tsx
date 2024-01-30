import { Typography } from '@/common/components'

// import { useTransactionDetailParams } from '@/app/routes/dashboard'
// import { usePrintErrorMessage } from '@/common/hooks'

const TransactionDetail = () => {
  // const txId = useTransactionDetailParams()
  // const onError = usePrintErrorMessage()

  // const { data, isPending, isError, error } = useFetchBook(txId)

  // if (isPending) {
  //   return <Loading />
  // }

  // if (isError) {
  //   onError(error, 'TxDetailToast')
  // }

  // const { book } = data ?? {}
  // console.log('book:', book)

  return (
    <>
      <Typography className="mb-2.5 text-6xl font-semibold" variant={'h1'}>
        {'Transaction Detail'}
      </Typography>
    </>
  )
}

export default TransactionDetail
