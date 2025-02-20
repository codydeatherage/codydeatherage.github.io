import { Autocomplete, AutocompleteProps as MuiProps, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

interface AutoCompleteProps<T> extends Omit<MuiProps<T, boolean | undefined, boolean | undefined, boolean | undefined>, "renderInput" | "options"> {
  queryOptions: {
    queryKey: [string],
    queryFn: () => Promise<any>
  }
  label?: string
}

const AutoComplete = <T extends object>(props: AutoCompleteProps<T>) => {
  const { queryOptions, ...rest } = props
  const { data: options } = useQuery(queryOptions)

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option: any) => option?.title ?? ''}
      isOptionEqualToValue={(option: any, value: any) => option?.title === value?.title}
      {...rest}
      value={rest?.value || null}
      options={options ?? []}
      renderInput={(params) => <TextField {...params} label={props?.label ?? ""} />}
    />
  )
}

export default AutoComplete