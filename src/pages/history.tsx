import type { NextPageWithLayout } from '@/pages/_app'
import { Breadcrumbs, Box, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const HistoryPage: NextPageWithLayout = () => {
  return <p>Coming soon...</p>
}

HistoryPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      <Box sx={{ my: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">History</Typography>
        </Breadcrumbs>
      </Box>
      {page}
    </DefaultLayout>
  )
}
export default HistoryPage
