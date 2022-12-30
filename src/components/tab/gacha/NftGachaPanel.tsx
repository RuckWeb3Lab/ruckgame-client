// Mui
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import GachaCard from '@/components/card/GachaCard'

type Props = {
  handlerGacha: any
}

const NftGachaTabPanel = ({ handlerGacha }: Props) => {
  return (
    <>
      <Box sx={{ py: 3, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <GachaCard
              imageSrc="https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-82d3887a-9b96-47c6-bb6f-998a172b5ba0.gif"
              title="Free Egg"
              price="Free"
              handlerGacha={handlerGacha}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default NftGachaTabPanel
