import { OutlinedTextFieldProps } from '@mui/material'
import ErrorIcon from '@mui/icons-material/HighlightOffSharp'
import SuccessIcon from '@mui/icons-material/TaskAltOutlined';
import MuiTextField from '@mui/material/TextField'

interface TextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  errormsg?: string
}

const TextField = (props: TextFieldProps) => {
  const { errormsg } = props

  const success = props?.value ? <SuccessIcon color='success' /> : <></>
  const endAdornment = errormsg ? <ErrorIcon color='error' /> : success

  return (
    <MuiTextField
      variant='outlined'
      error={!!errormsg}
      helperText={errormsg}
      slotProps={{
        input: {
          endAdornment
        }
      }}
      {...props}
    />
  )
}

export default TextField