import Box from '@mui/material/Box'
import MuiPagination from '@mui/material/Pagination'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Pagination } from './'
import { useMemo } from 'react'

interface SearchPaginationProps {
  numResults: number
  page: number | undefined
  pageSize: number | undefined
  showPageSize?: boolean,
  onPaginationChange: (model: Pagination) => void
}

const options = [25, 50, 100]

const SearchPagination = ({
  numResults,
  page,
  pageSize = 25,
  showPageSize = false,
  onPaginationChange
}: SearchPaginationProps) => {

  console.log('Search Pagination', { page, pageSize })

  const pageCount = useMemo(() => numResults ? Math.ceil(numResults / pageSize) : 1, [numResults])

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    onPaginationChange({
      pageSize: e.target.value as number,
      page: 1
    })
  }

  const handlePageChange = (page: number) => {
    onPaginationChange({ pageSize, page })
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {
          showPageSize && (
            <>
              <InputLabel >{'Results Per Page:'}</InputLabel>
              <FormControl sx={{ width: 80, ml: 1 }}>
                <Select
                  size={'small'}
                  labelId={'results-per-page'}
                  value={pageSize}
                  onChange={handleSelectChange}
                >
                  {options.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )
        }
        <MuiPagination
          size={'large'}
          page={page}
          count={pageCount}
          shape={'rounded'}
          onChange={(_, page) => handlePageChange(page)}
        />
      </Box>
    </>
  )
}

export default SearchPagination