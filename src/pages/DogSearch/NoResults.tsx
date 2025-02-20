import { Box, Typography } from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

const NoResults = () => {
  return (
    <Box
      sx={{
        m: '4rem auto',
        textAlign: 'center',
        width: 400,
        height: 140,
        opacity: 0.7
      }}
    >
      <SentimentDissatisfiedIcon
        sx={{
          fontSize: 60,
          color: 'background.default'
        }}
      />
      <Typography
        variant='h6'
        color='white'>
        {"Sorry, we couldn't find any matches for your search"}
      </Typography>
    </Box>
  )
}

export default NoResults