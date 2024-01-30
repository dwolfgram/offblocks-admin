import { useFetchAccounts } from '@/api/queries/account'
import { Loading, Typography } from '@/common/components'
import { usePrintErrorMessage } from '@/common/hooks'

const MyPartner = () => {
  const onError = usePrintErrorMessage()

  const {
    isPending: accountsIsPending,
    isError: accountsIsError,
    error: accountsError,
    data,
  } = useFetchAccounts()

  console.log('accounts', data)

  if (accountsIsPending) {
    return <Loading />
  }

  if (accountsIsError) {
    onError(accountsError)
  }

  return (
    <div className="mx-auto">
      <Typography className="mb-2.5 text-6xl font-semibold" variant={'h1'}>
        {'Transaction History'}
      </Typography>
    </div>
  )
}

export default MyPartner
