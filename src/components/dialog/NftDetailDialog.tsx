import React, { useState } from 'react'

// Mui
import {
  Box,
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import type { TransitionProps } from '@mui/material/transitions'

export type DialogOptions = {
  tokenId: number
  address: string
  title: string
  description: string
  uri: string
}

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  options: DialogOptions
  handlerTransferFrom: any
  pendding: boolean
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const NftDetailDialog = ({ open, setOpen, options, handlerTransferFrom, pendding }: Props) => {
  const [to, setTo] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value)
  }

  return (
    <>
      <Dialog open={open} TransitionComponent={Transition} keepMounted>
        <DialogTitle>{options.title}</DialogTitle>
        <DialogContent>
          <Card variant="outlined">
            <CardMedia component="img" image={options.uri} alt="nft" />
          </Card>
          <Typography component="div" variant="body1" sx={{ pt: 2 }}>
            TokenID: {options.tokenId}
            <br />
            {options.description}
          </Typography>
          <Box sx={{ pt: 2 }}>
            <TextField
              id="from-input"
              label="From"
              variant="outlined"
              fullWidth
              sx={{ pb: 2 }}
              value={options.address}
              focused
              disabled
            />
            <TextField
              id="to-input"
              label="To"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <LoadingButton
            onClick={() => handlerTransferFrom(options.address, to, options.tokenId)}
            loading={pendding}
          >
            send
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NftDetailDialog
