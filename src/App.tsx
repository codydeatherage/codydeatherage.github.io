import { useState } from 'react'
import { Box, Card, Paper, Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Paper
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        maxWidth: '100%'
      }}
    >
      <Box sx={{ m: 'auto' }}>
        <Card
          sx={{
            minWidth: 350,
            height: 'min(100vh, 500px)',
            textAlign: 'center',
            p: 2,
            background: 'linear-gradient(0, rgb(60, 146, 207) 0%, #ffeb3b 100%)'
            // background: 'linear-gradient(0,rgb(60, 146, 207) 0%,rgba(37, 130, 173, 0.38) 90%)'
          }}
        >
          <Typography >
            werwer
          </Typography>
        </Card>
      </Box>
    </Paper>
  )
}

export default App
