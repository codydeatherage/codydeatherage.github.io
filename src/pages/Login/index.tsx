import { Box, Card, Typography } from '@mui/material'
import LoginForm from './LoginForm'

const Login = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%'
      }}
    >
      <Box sx={{ m: 'auto' }}>
        <Card
          sx={{
            display: 'flex',
            minWidth: 350,
            height: 'min(100vh, 400px)',
            textAlign: 'center',
            p: 2,
            backgroundColor: 'background.default',
          }}
        >
          <Box sx={{ mx: 'auto' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Sheltr
            </Typography>
            <Typography variant='h6' sx={{ mb: 3 }} >
              {'Please enter your name and email to begin.'}
            </Typography>
            <LoginForm />
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default Login
