// Mui
import { Breadcrumbs, Box, Typography } from '@mui/material'
// Component
import DefaultLayout from '@/components/layouts/DefaultLayout'
// Type
import type { NextPageWithLayout } from '@/pages/_app'

const HomePage: NextPageWithLayout = () => {
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
