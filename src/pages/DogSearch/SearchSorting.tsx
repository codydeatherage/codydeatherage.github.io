import { useMemo } from 'react'
import { DogsSortField, DogsSortModel } from '../../services/dogs/dogs.model'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

interface SearchSortingProps extends DogsSortModel {
  onSortChange: (model: DogsSortModel) => void
}

const fields = ['breed', 'age', 'name']

const SearchSorting = ({ field, direction, onSortChange }: SearchSortingProps) => {

  const directionIcon = useMemo(() => {
    if (direction === 'asc') {
      return <ArrowUpwardIcon />
    }

    return <ArrowDownwardIcon />
  }, [direction])

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    onSortChange({ field: e.target.value as DogsSortField, direction })
  }

  const handleDirectionChange = () => {
    let newModel = { field, direction }

    if (direction === 'asc') {
      newModel.direction = 'desc'
    } else {
      newModel.direction = 'asc'
    }
    onSortChange(newModel)
  }

  return (
    <>
      <InputLabel >{'Sort By:'}</InputLabel>
      <FormControl sx={{ width: 100, ml: 1 }}>
        <Select
          size={'small'}
          value={field}
          onChange={handleSelectChange}
        >
          {fields.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        color='inherit'
        sx={{
          height: '100%',
          p: 0.8
        }}
        variant='outlined'
        endIcon={directionIcon}
        onClick={handleDirectionChange}
      >
        {direction.toUpperCase()}

      </Button>
    </>
  )
}

export default SearchSorting