import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Dog } from '../services/dogs/dogs.model'
import { IconButton, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { useFavorites } from '../context/FavoritesProvider'
import { useMemo } from 'react'

interface DogInfoProps {
  info: Dog
  hideFavorite?: boolean
}

interface InfoLabelProps {
  label: string
  value: string
}

export const InfoLabel = ({ label, value }: InfoLabelProps) => (
  <Stack
    direction={'row'}
    sx={{
      alignItems: 'center',
      gap: 1
    }}
  >
    <Typography
      sx={{ fontWeight: 'bold' }}
      variant='h6'
    >
      {label + ":"}
    </Typography>
    <Typography
      sx={{ mt: 0.5 }}
      variant='body1'
    >
      {value}
    </Typography>
  </Stack>
)

const DogInfo = ({ info, hideFavorite = false }: DogInfoProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  const favorited = useMemo(() => favorites.includes(info.id), [favorites])

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFavorite(info.id)
    } else {
      addFavorite(info.id)
    }
  }

  return (
    <Paper
      key={info.id}
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          height: 200,
          width: 150,
          img: {
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            objectPosition: 'center center'
          }
        }}
      >
        <img src={info.img} alt="" />

      </Box>
      <Box sx={{ p: 2, position: 'relative', width: 'calc(100% - 150px)' }}>
        <InfoLabel label={'Name'} value={info.name} />
        <InfoLabel label={'Age'} value={info.age.toString()} />
        <InfoLabel label={'Breed'} value={info.breed} />
        <InfoLabel label={'Zip Code'} value={info.zip_code} />
        <IconButton

          color='warning'
          size='small'
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            '& .MuiSvgIcon-root': {
              height: 40,
              width: 40,
            },
            ':hover': {
              '& .MuiSvgIcon-root': {
                color: 'warning.dark'
              }
            }
          }}
        >
          {
            hideFavorite ? <></> :
              favorited ?
                <StarIcon />
                :
                <StarBorderIcon />
          }
        </IconButton>
      </Box>

    </Paper>
  )
}

export default DogInfo