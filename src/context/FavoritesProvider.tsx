import React, { createContext, useContext, useEffect, useState } from 'react'
import FavoritesDialog from '../components/FavoritesDialog'

interface FavoritesProviderProps {
  children: React.ReactNode
}

interface FavoritesContextValue {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  clearFavorites: () => void
  showFavorites: () => void
  hideFavorites: () => void
}

const FavoritesContext = createContext({} as FavoritesContextValue)

export const useFavorites = () => {
  const context = useContext(FavoritesContext)

  if (!context?.favorites) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }

  return context
}

const savedFavorites = sessionStorage.getItem('favorites')
const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : []

const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>(initialFavorites)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (id: string) => {
    if (!id?.length) return
    setFavorites(prev => [...prev, id])
  }

  const removeFavorite = (id: string) => {
    if (!id?.length) return
    setFavorites(prev => prev.filter((p) => p !== id))
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const showFavorites = () => {
    setOpen(true)
  }

  const hideFavorites = () => {
    setOpen(false)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        showFavorites,
        hideFavorites
      }}
    >
      <FavoritesDialog open={open} />
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider