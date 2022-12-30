import type { NextPageWithLayout } from '@/pages/_app'
import { Breadcrumbs, Box, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import DefaultLayout from '@/components/layout/DefaultLayout'

const MintPage: NextPageWithLayout = () => {
  return <p>Coming soon...</p>
}

MintPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      <Box sx={{ my: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Mint</Typography>
        </Breadcrumbs>
      </Box>
      {page}
    </DefaultLayout>
  )
}

export default MintPage
