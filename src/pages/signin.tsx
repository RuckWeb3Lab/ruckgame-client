// Mui
import {
  Button,
  Box,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
// Component
import GuestLayout from "@/components/layouts/GuestLayout"
// Type
import type { NextPageWithLayout } from '@/pages/_app'

const SigninPage: NextPageWithLayout = () => {
  return (
    <Grid container spacing={2} sx={{ py: 15 }}>
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', pb: 3 }}>
          Welcom to RepezenDogs!!
        </Typography>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: 200 }}>
          <Button variant="contained" sx={{ mx: 1 }} fullWidth>CONNECT WALLET</Button>
        </Box>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: 200 }}>
          <Button variant="contained" sx={{ mx: 1 }} fullWidth>CONNECT TWITTER</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

SigninPage.getLayout = function getLayout(page) {
  return (
    <GuestLayout>
      {page}
    </GuestLayout>
  )
}

export default SigninPage
