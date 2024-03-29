import { useRouter } from 'next/router'
import { SERVICE_NAME } from '@/globals/constants'
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import GuestLayout from '@/components/layout/GuestLayout'


import type { NextPageWithLayout } from '@/pages/_app'

const IndexPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <>
      <Box sx={{ pt: 20, pb: 10, flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid xs={12}>
            <Box sx={{ pt: 6, pb: 25, textAlign: 'center' }}>
              <Typography
                variant="h4"
                component="h4"
                sx={{ mb: 2, fontSize: '3.5rem', fontWeight: 'bold' }}
              >
                {SERVICE_NAME}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                「Web2 × Web3」を目指す新感覚ゲーム
                <br />
                現在、開発を進めています。
              </Typography>
              <Box sx={{ pb: 4, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  使用言語
                </Typography>
                <Chip sx={{ mr: 1 }} label="React" />
                <Chip sx={{ mr: 1 }} label="Node.js" />
                <Chip sx={{ mr: 1 }} label="Solidity" />
              </Box>
              <Button variant="contained" color="info" onClick={() => router.push('/signin')}>
                open beta app
              </Button>
            </Box>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Whitepaper
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ゲームに関する概要や設計を記載
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => router.push('https://ruckgame.gitbook.io/untitled/')}
                >
                  ホワイトペーパーを見る
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Github
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Frontend、API、SmartContractを公開中
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => router.push('https://github.com/orgs/RuckWeb3Lab/repositories')}
                >
                  ソースコードを見る
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Discoard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Web3開発に関する情報を発信中
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => router.push('https://discord.gg/C3wmurGXyA')}
                >
                  コミュニティに参加する
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Contact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Twitter: @pokotaro_eth
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => router.push('https://twitter.com/pokotaro_eth')}
                >
                  問い合わせする
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

IndexPage.getLayout = function getLayout(page) {
  return <GuestLayout>{page}</GuestLayout>
}

export default IndexPage
