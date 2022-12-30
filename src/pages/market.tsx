import React, { useState, useContext, useCallback } from 'react'
import { Web3AuthProviderContext } from '@/pages/_app'
import { useRepDogs } from '@/globals/hooks/contracts'
// Mui
import {
  Breadcrumbs,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import DefaultLayout from '@/components/layout/DefaultLayout'
import PurchaseDialog from '@/components/dialog/PurchaseDialog'
import ActionAlert from '@/components/alert/ActionAlert'
// Type
import type { NextPageWithLayout } from '@/pages/_app'
// Util
import { babyMint } from '@/asyncs/writeContract'
import RPC from '@/globals/ethersRPC'
import { ethers } from 'ethers'
import IRepDog from '@/assets/abis/IRepDog.json'

const MarketPage: NextPageWithLayout = () => {
  const [provider, setProvider] = useContext(Web3AuthProviderContext)
  const [tab, setTab] = useState(0)
  const [actionAlert, setActionAlert] = useState<boolean>(false)
  const [actionAlertOptions, setActionAlertOptions] = useState<any>({
    severity: 'error',
    title: '',
    message: '',
  })
  const [purchaseDialog, setPurchaseDialog] = useState(false)
  const [purchaseEgg, setPurchaseEgg] = useState({
    title: '',
    uri: '',
    price: '',
  })
  const repDogsContract = useRepDogs()

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const handlerPurchaseEgg = useCallback(() => {
    ;(async () => {
      try {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account = await provider.send('eth_requestAccounts', [])
        console.log('account: ', account)
        const signer = provider.getSigner()
        console.log('signer: ', signer)

        const daiContract = new ethers.Contract(
          '0xf3c199c136C05ea69E4A82dCEF6dC14990d0BFDc',
          IRepDog,
          provider
        )

        const daiWithSigner = daiContract.connect(signer)

        const tx = await daiWithSigner.babyMint()

        console.log('tx: ', tx)
        /*
        const account = await getAccounts()
        if (account) {
          console.log("account: ", account)
        }
        const response = await babyMint(repDogsContract)
        await response.wait()
        console.log("response: ", response)
        */
      } catch (error: any) {
        console.error('== Error!! ==')
        console.error(error)
        setActionAlertOptions({
          severity: 'error',
          title: 'Warning',
          message: error.error.message,
        })
        setActionAlert(true)
      }

      setPurchaseDialog(false)
    })()
  }, [])

  const handlerOpenPurchaseDialog = (title: string, uri: string, price: string) => {
    setPurchaseEgg({
      title,
      uri,
      price,
    })
    setPurchaseDialog(true)
  }

  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet')
      return
    }
    const rpc = new RPC(provider)
    return await rpc.getAccounts()
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
                      <Button
                        onClick={() =>
                          handlerOpenPurchaseDialog(
                            'Rare Egg',
                            'https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-82d3887a-9b96-47c6-bb6f-998a172b5ba0.gif',
                            '0.01 ETH'
                          )
                        }
                      >
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
                      <Button
                        onClick={() =>
                          handlerOpenPurchaseDialog(
                            'Common Egg',
                            'https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-3e35ebd3-cf88-430b-8aba-456bf0226dde.gif',
                            'Free'
                          )
                        }
                      >
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
              <Grid xs={12} md={6}>
                Coming soon...
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      <PurchaseDialog
        open={purchaseDialog}
        setOpen={setPurchaseDialog}
        options={purchaseEgg}
        handlerPurchaseEgg={handlerPurchaseEgg}
      />

      <ActionAlert open={actionAlert} setOpen={setActionAlert} options={actionAlertOptions} />
    </>
  )
}

MarketPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      <Box sx={{ my: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
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
