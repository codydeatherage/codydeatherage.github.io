import { Dialog, DialogContent, Typography, Stack, IconButton, Button } from '@mui/material'
import { useFavorites } from '../context/FavoritesProvider'
import { QUERY_KEYS } from '../constants/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { dogsService } from '../services/dogs/dogs.service'
import DogSearchResults from '../pages/DogSearch/DogSearchResults'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import NoResults from '../pages/DogSearch/NoResults'

interface FavoritesDialogProps {
  open: boolean
}

const FavoritesDialog = ({ open }: FavoritesDialogProps) => {
  const { favorites, hideFavorites } = useFavorites()
  const navigate = useNavigate()

  const { data: dogs = [] } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_DOGS, JSON.stringify(favorites)],
    queryFn: () => dogsService.fetchDogs(favorites),
    enabled: !!favorites?.length,
    staleTime: Infinity
  })

  const handleGenerateClick = () => {
    if (favorites?.length) {
      navigate('/match')
      hideFavorites()
    }
  }

  return (
    <Dialog open={open} maxWidth={'lg'} onClose={hideFavorites}>
      <Stack direction={'row'} sx={{ backgroundColor: 'info.light', justifyContent: 'space-between' }}>
        <Typography variant='h4' sx={{ ml: 3, mt: 2, color: 'white' }}>{'My Favorites'}</Typography>
        <Button
          onClick={handleGenerateClick}
          color='success'
          variant='contained'
          disabled={!favorites?.length}
          sx={{ mt: 2 }}
        >
          {'Generate Match'}
        </Button>
        <IconButton onClick={hideFavorites}>
          <CloseIcon fontSize={'large'} sx={{ color: 'red' }} />
        </IconButton>
      </Stack>
      <DialogContent sx={{ minWidth: 500, width: '100%', maxHeight: 800, ...(dogs?.length && { overflowY: 'scroll' }) }}>
        {

          dogs?.length ?
            <DogSearchResults dogs={dogs} />
            :
            <NoResults />

        }
      </DialogContent>
    </Dialog>
  )
}

export default FavoritesDialog