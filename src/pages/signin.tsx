import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { SERVICE_NAME } from '@/globals/constants'
import { Web3AuthContext, Web3AuthProviderContext } from '@/pages/_app'
// Mui
import { Button, Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import GuestLayout from '@/components/layout/GuestLayout'
// Type
import type { NextPageWithLayout } from '@/pages/_app'

const SigninPage: NextPageWithLayout = () => {
  const [web3auth, _] = useContext(Web3AuthContext)
  const [web3AuthProvider, setWeb3AuthProvider] = useContext(Web3AuthProviderContext)

  const router = useRouter()

  const handlerSingIn = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
      return
    }
    const connections = await web3auth.connect()
    setWeb3AuthProvider(connections)
  }

  const handlerSingOut = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
      return
    }
    await web3auth.logout()
    setWeb3AuthProvider(null)
  }

  useEffect(() => {
    if (web3AuthProvider) {
      router.push('/home')
    }
  }, [web3AuthProvider, router])

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
