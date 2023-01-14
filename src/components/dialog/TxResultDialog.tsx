import React, { useState } from 'react'

// Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'

export type DialogOptions = {
  title: string
  tokenId: number
  from: string
  to: string
  txHash: string
}

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  options: DialogOptions
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const TxResultDialog = ({ open, setOpen, options }: Props) => {
  const goto = (txHash: string) => {
    const url = `https://goerli.etherscan.io/tx/${txHash}`
    window.open(url, '_blank')
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{options.title}</DialogTitle>
        <DialogContent>
          <Typography component="div" variant="body1" sx={{ pt: 2 }}>
            TokenID: {options.tokenId}
            <br />
            From: {options.from}
            <br />
            To: {options.to}
          </Typography>
          <Button variant="text" onClick={() => goto(options.txHash)}>
            {`${options.txHash.slice(0, 10)}...${options.txHash.slice(-6)}`}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TxResultDialog
