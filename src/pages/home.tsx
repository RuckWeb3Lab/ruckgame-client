import { useEffect, useContext, useState, useCallback } from 'react'
// Mui
import {
  Breadcrumbs,
  Box,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import DefaultLayout from '@/components/layout/DefaultLayout'
import NftDetailDialog from '@/components/dialog/NftDetailDialog'
import TxResultDialog from '@/components/dialog/txResultDialog'
// Type
import type { NextPageWithLayout } from '@/pages/_app'
// Util
import { Web3AuthProviderContext } from '@/pages/_app'
import RuckNftContract from '@/asyncs/ruckNftContract'

const HomePage: NextPageWithLayout = () => {
  const [provider, __] = useContext(Web3AuthProviderContext)

  const [status, setStatus] = useState<string>('loading')
  const [nftDetailDialog, setNftDetailDialog] = useState<boolean>(false)
  const [nftDetailDialogOptions, setNftDetailDialogOptions] = useState({
    tokenId: NaN,
    address: '',
    title: '',
    description: '',
    uri: '',
  })
  const [txResultDialog, setTxResultDialog] = useState<boolean>(false)
  const [txResultDialogOptions, setTxResultDialogOptions] = useState({
    title: '',
    tokenId: NaN,
    from: '',
    to: '',
    txHash: '',
  })
  const [pendding, setPendding] = useState<boolean>(false)
  const [account, setAccount] = useState<string>('')
  const [contract, setContract] = useState<any>(null)
  const [metadataList, setMetadataList] = useState<any>([])

  const handlerTransferFrom = useCallback(
    async (from: string, to: string, tokenId: number) => {
      try {
        console.log(from, to, tokenId)
        if (!contract) return
        setPendding(true)

        const ethersRpc = new RuckNftContract(provider)
        const nftContract = await ethersRpc.getContract()

        const txReceipt = await nftContract.transferFrom(from, to, tokenId)
        console.log('txReceipt: ', txReceipt)
        const tx = await txReceipt.wait()
        console.log('tx: ', tx)
        setPendding(false)
        setNftDetailDialog(false)

        setTxResultDialogOptions({
          title: 'Success!!',
          tokenId,
          from,
          to,
          txHash: tx.transactionHash,
        })
        setTxResultDialog(true)

        // TODO: リロードをして再取得
      } catch (error: any) {
        setPendding(false)
      }
    },
    [provider, contract]
  )

  const openNftDetailDialog = (token: any) => {
    setNftDetailDialogOptions({
      tokenId: token.id,
      address: account,
      title: token.name,
      description: token.description,
      uri: token.image,
    })
    setNftDetailDialog(true)
  }

  useEffect(() => {
    if (!provider) return
    setAccount(provider.selectedAddress)

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

      if (dataList.length === 0) {
        setStatus('nothing')
      } else {
        setStatus('success')
      }
    })()
  }, [contract, account])

  return (
    <Box sx={{ py: 3, flexGrow: 1 }}>
      <Grid container spacing={3}>
        {status === 'loading' && (
          <>
            <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Grid>
            <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography component="div" variant="h6">
                Loading...
              </Typography>
            </Grid>
          </>
        )}
        {status === 'nothing' && (
          <>
            <Grid xs={12} md={4}>
              <Typography component="div" variant="h6">
                No item
              </Typography>
            </Grid>
          </>
        )}
        {status === 'success' && (
          <>
            {metadataList.map((token: any) => {
              return (
                <Grid key={token.id} xs={12} md={4}>
                  <Card sx={{ display: 'flex' }}>
                    <CardMedia component="img" sx={{ width: 150 }} image={token.image} alt="NFT" />
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
                      <CardActions>
                        <Button onClick={() => openNftDetailDialog(token)}>send</Button>
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              )
            })}
          </>
        )}
      </Grid>

      <NftDetailDialog
        open={nftDetailDialog}
        setOpen={setNftDetailDialog}
        options={nftDetailDialogOptions}
        handlerTransferFrom={handlerTransferFrom}
        pendding={pendding}
      />

      <TxResultDialog
        open={txResultDialog}
        setOpen={setTxResultDialog}
        options={txResultDialogOptions}
      />
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
