import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '../../components/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { authService } from '../../services/auth/auth.service'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  name: string
  email: string
}

const LoginForm = () => {
  const navigate = useNavigate()
  const { control, formState, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      name: '',
      email: ''
    },
    mode: 'onTouched'
  })

  const onSubmit: SubmitHandler<LoginForm> = async (form) => {
    try {
      const res = await authService.login(form)
      if (res === 'OK') {
        navigate('/')
      }
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack sx={{ gap: 4 }}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Name must contain only letters or numbers'
              },
            }}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                errormsg={formState?.errors?.name?.message}
                label={'Name'}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Email must be a valid email address'
              }
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                required
                errormsg={formState?.errors?.email?.message}
                label={'Email'}
                {...field}
              />
            )}
          />
          <Button variant='contained' sx={{ backgroundColor: 'info.dark', mb: 2 }} type='submit'>
            Login
          </Button>
        </Stack >
      </form>
    </>
  )
}

export default LoginForm