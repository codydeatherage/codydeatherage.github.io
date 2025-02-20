import { useState } from 'react'
import { DogsSearchFilters, DogsSortModel } from '../../services/dogs/dogs.model'
import { dogsService } from '../../services/dogs/dogs.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/queryKeys'
import DogSearchResults from './DogSearchResults'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { CircularProgress, Typography } from '@mui/material'
import SearchFiltersForm from './SearchFiltersForm'
import NoResults from './NoResults'
import SearchPagination from './SearchPagination'
import SearchSorting from './SearchSorting'

export interface Pagination {
  page?: number
  pageSize?: number
}

const initialFilters: DogsSearchFilters = {
  sort: {
    field: 'breed',
    direction: 'asc'
  },
  from: 0,
  size: 25
}

const DogSearch = () => {
  const [filters, setFilters] = useState<DogsSearchFilters>(initialFilters)
  const [paging, setPaging] = useState(false)
  const queryClient = useQueryClient()

  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_DOGS, JSON.stringify(filters)],
    queryFn: () => dogsService.searchDogs(filters),
    staleTime: Infinity
  })

  const { data: dogs = [], isLoading: dogsLoading } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_DOGS, JSON.stringify(searchResults?.resultIds)],
    queryFn: () => dogsService.fetchDogs(searchResults?.resultIds!),
    enabled: !!searchResults?.resultIds?.length,
    staleTime: Infinity
  })

  const handleFormSubmit = (form: DogsSearchFilters) => {
    if (!form) return

    setFilters(form)
  }

  const handlePaginationChange = (model: Pagination) => {
    const newFilters = {
      ...filters,
      ...(model.page && { from: model.page - 1 }),
      ...(model.pageSize && { size: model.pageSize }),
    }

    setPaging(true)

    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.SEARCH_DOGS, JSON.stringify(newFilters)],
      queryFn: () => dogsService.searchDogs(newFilters),
      staleTime: 1000
    })
      .then(() => {
        setPaging(false)
        setFilters(newFilters)
      })
  }

  const handleSortChange = (model: DogsSortModel) => {
    setFilters(prev => ({ ...prev, sort: model }))
  }

  const paginationProps = {
    numResults: searchResults?.total ?? 0,
    page: filters.from ? filters.from + 1 : 1,
    pageSize: filters.size,
    onPaginationChange: handlePaginationChange
  }

  const loading = dogsLoading || searchLoading || paging

  return (
    <Stack sx={{ width: '100%', m: 'auto', p: 2, gap: 1 }}>
      <SearchFiltersForm onSubmit={handleFormSubmit} />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography>{`Total results: ${searchResults?.total ?? ''}`}</Typography>
        <div>
          <SearchPagination
            showPageSize
            {...paginationProps}
          />
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          gap: 1
        }}
      >
        <SearchSorting
          field={filters.sort?.field ?? 'breed'}
          direction={filters.sort?.direction ?? 'asc'}
          onSortChange={handleSortChange}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          m: 'auto',
          minHeight: '90vh'
        }}
      >
        {
          loading ?
            <CircularProgress sx={{ m: 'auto' }} />
            :
            <DogSearchResults dogs={dogs} />
        }
        {searchResults?.total === 0 && <NoResults />}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SearchPagination {...paginationProps} />
      </Box>
    </Stack>
  )
}

export default DogSearch