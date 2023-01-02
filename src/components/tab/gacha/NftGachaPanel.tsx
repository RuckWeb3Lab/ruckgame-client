import { useEffect, useState, useContext } from 'react'
// Mui
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
// Component
import GachaCard from '@/components/card/GachaCard'
// Util
import { Web3AuthProviderContext } from '@/pages/_app'
import RuckGameContract from '@/asyncs/ruckGameContract'

type Props = {
  handlerGacha: any
}

const NftGachaTabPanel = ({ handlerGacha }: Props) => {
  const [provider, _] = useContext(Web3AuthProviderContext)

  const [isFreeGacha, setIsFreeGacha] = useState<boolean>(true)

  useEffect(() => {
    if (!provider) return
    const ethersRpc = new RuckGameContract(provider)
    ethersRpc
      .getContract()
      .then((ruckGameContract) => {
        return ruckGameContract.isFreeGacha()
      })
      .then((response) => {
        setIsFreeGacha(!response)
      })
  }, [provider])

  return (
    <>
      <Box sx={{ py: 3, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <GachaCard
              imageSrc="https://s3.ap-southeast-1.amazonaws.com/twitfi/uploads/accessory/image/twitfi-82d3887a-9b96-47c6-bb6f-998a172b5ba0.gif"
              title="Free Egg"
              price="Free"
              disabled={isFreeGacha}
              handlerGacha={handlerGacha}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default NftGachaTabPanel
