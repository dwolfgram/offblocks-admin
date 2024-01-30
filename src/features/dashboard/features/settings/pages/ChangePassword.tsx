import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, Typography } from '@/common/components'
import { Button } from '@/common/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form'
import { Input } from '@/common/components/ui/input'
import { Separator } from '@/common/components/ui/separator'

import { useChangePasswordValidation, type ChangePasswordFields } from '../hooks/validations'

const ChangePassword = () => {
  const { t } = useTranslation()

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(useChangePasswordValidation()),
    defaultValues: {
      password: '',
    } satisfies ChangePasswordFields,
  })

  const onSubmit = useCallback(() => toast.success(t('profile:changePassword.success')), [t])

  return (
    <>
      <Typography variant="h4">{t('profile:changePassword.title')}</Typography>

      <Separator className="my-4" />

      <Form form={form} onSubmit={onSubmit} id="change-password-form">
        {{
          formFields: (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile:changePassword.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
          footer: (
            <Button
              form="change-password-form"
              type="submit"
              disabled={false}
              loading={false}
              className="w-full md:w-auto"
            >
              {t('global:save')}
            </Button>
          ),
        }}
      </Form>
    </>
  )
}

export default ChangePassword
