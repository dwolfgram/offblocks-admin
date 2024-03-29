import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSignIn } from '@/common/auth'
import { usePrintMutationError } from '@/common/hooks'
import { Typography, Form } from '@/common/components'
import { Button } from '@/common/components/ui/button'
import { Input } from '@/common/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form'

import FormWrapper from '../components/FormWrapper'
import { useSignInValidation, type SignInFields } from '../hooks/validations'
import { AUTH_ROUTES } from '../../../app/routes/auth'

const SignIn = () => {
  const { t } = useTranslation()

  const { signIn, isPending } = useSignIn()

  const onError = usePrintMutationError()

  const form = useForm<SignInFields>({
    resolver: zodResolver(useSignInValidation()),
    defaultValues: {
      email: '',
      password: '',
    } satisfies SignInFields,
  })

  const onSubmit = useCallback(
    (values: SignInFields) => signIn(values, { onError }),
    [signIn, onError],
  )

  return (
    <FormWrapper title={t('auth:signIn.title')}>
      <Form form={form} onSubmit={onSubmit} id="auth-form">
        {{
          formFields: (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth:signIn.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth:signIn.password')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ),
          footer: (
            <>
              <Button form="auth-form" type="submit" disabled={isPending} loading={isPending} block>
                {t('auth:signIn.submit')}
              </Button>
              <Typography variant="regularText" className="mt-4">
                <Link to={AUTH_ROUTES.signUp.to}>{t('auth:signIn.noAccount')}</Link>
              </Typography>
            </>
          ),
        }}
      </Form>
    </FormWrapper>
  )
}

export default SignIn
