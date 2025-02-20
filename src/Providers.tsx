import { ThemeProvider } from '@emotion/react'
import { theme } from '../theme'
import { CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FavoritesProvider from './context/FavoritesProvider.tsx'

const queryClient = new QueryClient()

const Providers = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <CssBaseline />
          <Outlet />
        </FavoritesProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers