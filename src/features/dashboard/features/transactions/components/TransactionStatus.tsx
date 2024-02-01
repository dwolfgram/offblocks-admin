import { Typography } from '@/common/components'
import { cn } from '@/common/styleUtils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/common/components/ui/tooltip'

interface TransactionStatusProps {
  status: string
  confirmationDate?: string | undefined | null
}

const TransactionStatus = ({ status, confirmationDate }: TransactionStatusProps) => {
  const className =
    status === 'pending'
      ? 'text-yellow-800 bg-yellow-100 dark:text-yellow-200'
      : 'text-green-800 bg-green-100 dark:text-green-200'
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger>
        <div className="m-auto flex w-full max-w-[350px] flex-col gap-6">
          <Typography
            className={cn(
              'w-fit cursor-text rounded-md px-2.5 py-1.5 text-sm font-medium capitalize dark:bg-opacity-10',
              className,
            )}
          >
            {status}
          </Typography>
        </div>
      </TooltipTrigger>
      {confirmationDate && <TooltipContent>{confirmationDate}</TooltipContent>}
    </Tooltip>
  )
}

export default TransactionStatus
