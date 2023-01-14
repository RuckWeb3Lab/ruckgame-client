import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { SERVICE_NAME } from '@/globals/constants'
import { Web3AuthContext, EthersProviderContext, WalletContext } from '@/pages/_app'
import { ethers } from 'ethers'
// Mui
import { Button, Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import GuestLayout from '@/components/layout/GuestLayout'
// Type
import type { NextPageWithLayout } from '@/pages/_app'

const SigninPage: NextPageWithLayout = () => {
  const [wallet, setWallet] = useContext(WalletContext)
  const [web3Auth, setWeb3Auth] = useContext(Web3AuthContext)
  const [ethersProvider, setEthersProvider] = useContext(EthersProviderContext)

  const router = useRouter()

  const handlerSingIn = async () => {
    const connections = await web3Auth.connect()
    setWeb3Auth(connections)

    router.push('/home')

    // const provider = new ethers.providers.Web3Provider(web3auth.provider)
    // console.log(provider)
    // setEthersProvider(provider)
  }

  useEffect(() => {
    if (web3Auth && web3Auth.status === 'connected') {
      router.push('/home')
    }
  }, [web3Auth, router])

  return (
    <Grid container spacing={2} sx={{ py: 15 }}>
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
        <Typography
          component="div"
          variant="h6"
          sx={{ fontWeight: 'bold', pb: 3, textAlign: 'center' }}
        >
          Welcom to {SERVICE_NAME}!!
          <br />
          Prototype Game
        </Typography>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: 200 }}>
          <Button variant="contained" sx={{ mx: 1 }} fullWidth onClick={() => handlerSingIn()}>
            CONNECT WALLET
          </Button>
        </Box>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: 200 }}>
          <Button
            variant="outlined"
            color="warning"
            sx={{ mx: 1 }}
            fullWidth
            onClick={() => router.push('/')}
          >
            RETURN
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

SigninPage.getLayout = function getLayout(page) {
  return <GuestLayout>{page}</GuestLayout>
}

export default SigninPage
