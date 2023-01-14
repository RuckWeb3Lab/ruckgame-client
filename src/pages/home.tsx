import { useEffect, useContext, useState } from 'react'
// Mui
import { Breadcrumbs, Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import DefaultLayout from '@/components/layout/DefaultLayout'
// Type
import type { NextPageWithLayout } from '@/pages/_app'
// Util
import { Web3AuthContext } from '@/pages/_app'
import { Web3AuthProviderContext } from '@/pages/_app'
import RuckNftContract from '@/asyncs/ruckNftContract'

const HomePage: NextPageWithLayout = () => {
  const [web3auth, _] = useContext(Web3AuthContext)
  const [provider, __] = useContext(Web3AuthProviderContext)

  const [account, setAccount] = useState<string>('')
  const [contract, setContract] = useState<any>(null)
  const [metadataList, setMetadataList] = useState<any>([])

  useEffect(() => {
    if (!web3auth) return
    web3auth.connect().then((res: any) => {
      setAccount(res.selectedAddress)
    })
  }, [web3auth])

  useEffect(() => {
    if (!provider) return
    const ethersRpc = new RuckNftContract(provider)
    ethersRpc.getContract().then((ruckNftContract) => {
      setContract(ruckNftContract)
    })
  }, [provider])

  useEffect(() => {
    if (!contract) return
    if (!account) return

    ;(async () => {
      const totalSupply = await contract.totalSupply()
      const balance = await contract.balanceOf(account)

      const tokens: {
        tokenId: number
        tokenUri: string
      }[] = []
      for (let tokenId = 1; tokenId < totalSupply.toNumber(); tokenId++) {
        const owner = await contract.ownerOf(tokenId)
        const isOwner = owner.toUpperCase() === account.toUpperCase()

        if (isOwner) {
          const tokenUri = await contract.tokenURI(tokenId)
          tokens.push({
            tokenId,
            tokenUri,
          })
        }

        if (balance.toNumber() === tokens.length) {
          break
        }
      }

      const dataList = []
      for (const token of tokens) {
        const query = new URLSearchParams({ tokenUri: token.tokenUri })
        const metadataResponse = await fetch(`/api/get-nft-metadata?${query}`)
        const data = await metadataResponse.json()
        console.log(data)
        dataList.push({
          id: dataList.length++,
          name: data.name,
          description: data.description,
          image: data.image,
          attributes: data.attributes,
        })
      }

      setMetadataList(dataList)
    })()
  }, [contract, account])

  return (
    <Box sx={{ py: 3, flexGrow: 1 }}>
      <Grid container spacing={3}>
        {metadataList.length === 0 && (
          <Grid xs={12} md={4}>
            <p>No item</p>
          </Grid>
        )}
        {metadataList.map((token: any) => {
          return (
            <Grid key={token.id} xs={12} md={4}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia component="img" sx={{ width: 151 }} image={token.image} alt="NFT" />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Box>
                      <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                        {token.name}
                      </Typography>
                    </Box>
                    <Box sx={{ py: 1 }}>
                      <Typography component="div" variant="body1">
                        {token.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
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
