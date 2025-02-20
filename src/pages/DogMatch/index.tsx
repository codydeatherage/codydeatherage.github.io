import { Button, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useFavorites } from '../../context/FavoritesProvider'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/queryKeys'
import { dogsService } from '../../services/dogs/dogs.service'
import { InfoLabel } from '../../components/DogInfo'
import { useNavigate } from 'react-router'

const DogMatch = () => {
  const navigate = useNavigate()
  const { favorites } = useFavorites()

  const { data: match, isLoading: matchLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_MATCH, JSON.stringify(favorites)],
    queryFn: () => dogsService.getMatch(favorites),
    enabled: !!favorites?.length,
    staleTime: Infinity
  })

  const { data: matchedInfo = [], isLoading: infoLoading } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_DOGS, JSON.stringify([match])],
    queryFn: () => dogsService.fetchDogs([match!]),
    enabled: !!match,
    staleTime: Infinity
  })

  const loading = matchLoading || infoLoading

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%'
      }}
    >
      <Stack sx={{ m: 'auto', height: '50%', width: '50%', minWidth: 500, minHeight: 500, justifyContent: 'center', alignItems: 'center' }}>


        {loading && !matchedInfo?.length ?
          <>
            <Typography variant='h3' sx={{ mb: 1 }}>{'Generating a match...'}</Typography>
            <CircularProgress />
          </>
          :
          (favorites?.length ?
            <>
              <Paper sx={{ m: 'auto', p: 4, textAlign: 'center' }}>
                <Stack>
                  <Typography variant='h4' sx={{ mb: 1 }}>{'You have been matched with:'}</Typography>
                  <Typography variant='h3' >{matchedInfo[0].name}</Typography>
                  <Stack direction={'row'} sx={{ gap: 2, justifyContent: 'space-between' }}>
                    <InfoLabel label={'Breed'} value={matchedInfo[0].breed} />
                    <InfoLabel label={'Age'} value={matchedInfo[0].age.toString()} />
                    <InfoLabel label={'Zip Code'} value={matchedInfo[0].zip_code.toString()} />
                  </Stack>
                  <img
                    style={{
                      maxHeight: 300,
                      maxWidth: 300,
                      margin: 'auto'
                    }}
                    src={matchedInfo[0].img}
                    alt=""
                  />
                  <Button
                    onClick={handleBackClick}
                    sx={{ width: '60%', m: 'auto', mt: 1 }}
                    variant='contained'
                  >
                    {'Back to Search'}
                  </Button>
                </Stack>
              </Paper>
            </>
            :
            <>
              <Box sx={{ m: 'auto', p: 4, textAlign: 'center' }}>
                <Typography variant='h3' sx={{ mb: 2, color: 'white' }}>
                  {"You haven't selected any favorites yet"}
                </Typography>
                <Button
                  onClick={handleBackClick}
                  sx={{ width: '60%' }}
                  variant='contained'
                >
                  {'Back to Search'}
                </Button>
              </Box>
            </>
          )
        }
      </Stack>
    </Box>
  )
}

export default DogMatch