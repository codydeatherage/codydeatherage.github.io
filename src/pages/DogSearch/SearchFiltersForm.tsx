import { Autocomplete, Box, Button, InputLabel, Paper, Slider, Stack, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { DogsSearchFilters } from '../../services/dogs/dogs.model'
import { QUERY_KEYS } from '../../constants/queryKeys'
import { dogsService } from '../../services/dogs/dogs.service'
import { useQuery } from '@tanstack/react-query'
import { useFavorites } from '../../context/FavoritesProvider'
import { DeleteOutline } from '@mui/icons-material'

interface SearchFiltersFormProps {
  onSubmit: (form: DogsSearchFilters) => void
}

interface FilterForm {
  breeds?: string[]
  age: {
    min: number,
    max: number
  }
  zipCodes: string[]
}

enum AGE_RANGE {
  MIN = 0,
  MAX = 25
}

const SearchFiltersForm = ({ onSubmit }: SearchFiltersFormProps) => {
  const { favorites, showFavorites, clearFavorites } = useFavorites()

  const { control, handleSubmit } = useForm<FilterForm>({
    defaultValues: {
      breeds: [],
      age: {
        min: AGE_RANGE.MIN,
        max: AGE_RANGE.MAX
      }
    },
    mode: 'onTouched'
  })

  const { data: breedOptions = [] } = useQuery({
    queryKey: [QUERY_KEYS.DOG_BREEDS],
    queryFn: dogsService.getDogBreeds,
    staleTime: Infinity
  })

  const submitFilters = (data: FilterForm) => {
    const { breeds, age } = data

    //prevent insignificant values from being added to filter
    const form: DogsSearchFilters = {
      ...(breeds?.length && { breeds }),
      ...(age.min !== AGE_RANGE.MIN && { ageMin: age.min }),
      ...(age.max !== AGE_RANGE.MAX && { ageMax: age.max })
    }

    onSubmit(form ?? undefined)
  }

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(submitFilters)}>
        <Controller
          name="breeds"
          control={control}
          render={({ field }) => (
            <Autocomplete
              disablePortal
              multiple
              options={breedOptions}
              renderInput={(params) => <TextField
                {...params}
                label={"Breed(s)"}
                slotProps={{
                  inputLabel: {
                    sx: { fontSize: 18 }
                  }
                }}
              />
              }
              {...field}
              onChange={(_, selectedOptions) => {
                field.onChange(selectedOptions)
              }}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Box sx={{ display: 'flex', my: 2, alignItems: 'center' }}>
              <InputLabel sx={{ fontSize: 18, width: 150 }}>{'Age Range: '}</InputLabel>
              <Slider
                sx={{
                  width: 'max(25%, 400px)',
                  '& .MuiSlider-valueLabel': {
                    top: 27,
                    background: 'transparent'
                  },
                  '& .MuiSlider-thumb': {
                    height: 28,
                    width: 28,
                  }
                }}
                {...field}
                value={
                  [
                    field.value?.min ?? AGE_RANGE.MIN,
                    field.value?.max ?? AGE_RANGE.MAX
                  ]
                }
                onChange={(_, value) => {
                  const min = (value as number[])[0]
                  const max = (value as number[])[1]
                  field.onChange({ min, max });
                }}
                valueLabelDisplay="on"
                max={AGE_RANGE.MAX}
                step={1}
              />
            </Box>
          )}
        />
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>

          <Button variant='contained' color='info' type='submit'>
            {'Filter'}
          </Button>
          <Button
            variant='contained'
            color='success'
            size='large'
            onClick={showFavorites}
          >
            {`View Favorites (${favorites.length})`}
          </Button>
        </Stack>
        <Box sx={{ width: '100%', textAlign: 'right', mt: 1 }}>
          <Button
            startIcon={<DeleteOutline />}
            variant='contained'
            color='error'
            size='large'
            onClick={clearFavorites}
          >
            {`Clear Favorites`}
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default SearchFiltersForm