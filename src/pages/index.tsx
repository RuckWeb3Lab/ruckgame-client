import { useEffect, useContext } from 'react'
// Mui
import { Breadcrumbs, Box, Typography } from '@mui/material'
// Component
import DefaultLayout from '@/components/layout/DefaultLayout'
// Type
import type { NextPageWithLayout } from '@/pages/_app'
// Util
import { Web3AuthProviderContext } from '@/pages/_app'
import RepezenDoxxGameContract from '@/asyncs/repezenDoxxGameContract'

const HomePage: NextPageWithLayout = () => {
  const [provider, _] = useContext(Web3AuthProviderContext)

  useEffect(() => {
    if (!provider) return
    const ethersRpc = new RepezenDoxxGameContract(provider)
    //
  }, [provider])

  return <p>Coming soon...</p>
}

HomePage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      <Box sx={{ my: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Home</Typography>
        </Breadcrumbs>
      </Box>
      {page}
    </DefaultLayout>
  )
}

export default HomePage
