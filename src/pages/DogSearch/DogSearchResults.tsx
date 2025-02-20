import Box from '@mui/material/Box'
import { Dog } from '../../services/dogs/dogs.model'
import DogInfo from '../../components/DogInfo'

interface DogSearchResultsProps {
  dogs: Dog[]
}

const DogSearchResults = ({ dogs }: DogSearchResultsProps) => {

  if (!dogs?.length) {
    return <></>
  }

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'hidden',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gridAutoFlow: 'row',
        columnGap: '1rem',
        rowGap: '1rem'
      }}
    >
      {dogs?.map((dog) => (
        <DogInfo info={dog} />
      ))}
    </Box>
  )
}

export default DogSearchResults