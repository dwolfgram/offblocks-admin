import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'use-debounce'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateUser, useFetchUserEmailAvailability } from '@/api'
import { usePrintMutationError } from '@/common/hooks'
import { Form, Typography } from '@/common/components'
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
import { useSignUpValidation, type SignUpFields } from '../hooks/validations'
import { Link } from 'react-router-dom'
import { AUTH_ROUTES } from '@/app/routes'
import { useSignIn } from '@/common/auth'

const DEBOUNCE_MS = 500

const SignUp = () => {
  const { t } = useTranslation()

  const onError = usePrintMutationError()

  const { mutateAsync, isPending: isSignUpPending, isSuccess } = useCreateUser()
  const { signIn, isPending: isSignInPending } = useSignIn()

  const form = useForm<SignUpFields>({
    resolver: zodResolver(useSignUpValidation()),
    defaultValues: {
      email: '',
      password: '',
    } satisfies SignUpFields,
  })

  const handleSuccess = useCallback(
    async (values: SignUpFields) => {
      await signIn(values, { onError })
    },
    [onError, signIn],
  )

  const handleSignUp = useCallback(
    async (values: SignUpFields) => {
      await mutateAsync(values, {
        onError,
      })
      await handleSuccess(values)
      form.reset()
    },
    [form, handleSuccess, mutateAsync, onError],
  )

  const onSubmit = useCallback((values: SignUpFields) => handleSignUp(values), [handleSignUp])

  const [emailValue] = useDebounce(form.watch('email'), DEBOUNCE_MS)

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue)

  return (
    <FormWrapper title={t('auth:signUp.title')}>
      <Form form={form} onSubmit={onSubmit} id="auth-form">
        {{
          formFields: (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth:signUp.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage>
                      {isUserEmailAvailable || isSuccess ? null : t('auth:signUp.emailTaken')}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth:signUp.password')}</FormLabel>
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
              <Button
                form="auth-form"
                type="submit"
                disabled={isSignUpPending || isSignInPending}
                loading={isSignUpPending || isSignInPending}
                block
              >
                {t('auth:signUp.submit')}
              </Button>
              <Typography variant="regularText" className="mt-4">
                <Link to={AUTH_ROUTES.signIn.to}>{t('auth:signIn.alreadyHaveAccount')}</Link>
              </Typography>
            </>
          ),
        }}
      </Form>
    </FormWrapper>
  )
}

export default SignUp
