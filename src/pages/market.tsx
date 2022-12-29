import React, { useState } from "react"
// Mui
import {
  Breadcrumbs,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Slide,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import DefaultLayout from "@/components/layouts/DefaultLayout"
// Type
import type { NextPageWithLayout } from '@/pages/_app'
import type { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MarketPage: NextPageWithLayout = () => {
  const [tab, setTab] = useState(0);
  const [purchaseDialog, setPurchaseDialog] = useState(false);
  const [purchaseDialogTitle, setPurchaseDialogTitle] = useState('');
  const [purchaseEgg, setPurchaseEgg] = useState({
    title: '',
    uri: '',
    price: ''
  })

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handlerPurchaseEgg = () => {
    setPurchaseDialog(false)
  };

  const handlerOpenPurchaseDialog = (title: string, uri: string, price: string) => {
    setPurchaseEgg({
      title,
      uri,
      price
    })
    setPurchaseDialog(true)
  }

  return (
    <>
      <Tabs value={tab} onChange={handleChangeTab} aria-label="market tab">
        <Tab id="tab-0" aria-controls="tabpanel-0" label="Egg" />
        <Tab id="tab-1" aria-controls="tabpanel-1" label="Items" />
      </Tabs>

      {tab === 0 && (
        <>
          <Box sx={{ py: 3, flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-82d3887a-9b96-47c6-bb6f-998a172b5ba0.gif"
                    alt="Paella dish"
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Box>
                        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                          Rare Egg
                        </Typography>
                      </Box>
                      <Box sx={{ py: 1 }}>
                        <Typography component="div" variant="body1">
                          Price: 0.01 ETH
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ px: 2 }}>
                      <Button onClick={() => handlerOpenPurchaseDialog('Rare Egg', 'https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-82d3887a-9b96-47c6-bb6f-998a172b5ba0.gif', '0.01 ETH')}>
                        Purchase
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid xs={12} md={4}>
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-3e35ebd3-cf88-430b-8aba-456bf0226dde.gif"
                    alt="Paella dish"
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Box>
                        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                          Common Egg
                        </Typography>
                      </Box>
                      <Box sx={{ py: 1 }}>
                        <Typography component="div" variant="body1">
                          Price: Free
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ px: 2 }}>
                      <Button onClick={() => handlerOpenPurchaseDialog('Common Egg', 'https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-3e35ebd3-cf88-430b-8aba-456bf0226dde.gif', 'Free')}>
                        Purchase
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {tab === 1 && (
        <>
          <Box sx={{ py: 3, flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>Coming soon...</Grid>
            </Grid>
          </Box>
        </>
      )}

      <Dialog
        open={purchaseDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setPurchaseDialog(false)}
      >
        <DialogTitle>{purchaseEgg.title}</DialogTitle>
        <DialogContent>
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={purchaseEgg.uri}
              alt="Paella dish"
            />
          </Card>
          <Typography component="div" variant="body1" sx={{ pt: 2 }}>
            Price: {purchaseEgg.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlerPurchaseEgg()}>Purchase</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

MarketPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      <Box sx={{ my: 3 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Market</Typography>
        </Breadcrumbs>
      </Box>
      {page}
    </DefaultLayout>
  )
}

export default MarketPage
