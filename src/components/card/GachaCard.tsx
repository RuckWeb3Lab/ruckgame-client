// Mui
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

type Props = {
  imageSrc: string
  title: string
  price: string
  handlerGacha: any
}

const GachaCard = ({ imageSrc, title, price, handlerGacha }: Props) => {
  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardMedia component="img" sx={{ width: 151 }} image={imageSrc} alt="Paella dish" />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Box>
              <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                {title}
              </Typography>
            </Box>
            <Box sx={{ py: 1 }}>
              <Typography component="div" variant="body1">
                Price: {price}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ px: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RocketLaunchIcon />}
              onClick={() => handlerGacha(title, imageSrc, price)}
            >
              Gacha
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default GachaCard
