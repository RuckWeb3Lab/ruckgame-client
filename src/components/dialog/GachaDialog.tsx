import React, { useState } from 'react'

// Mui
import {
  Breadcrumbs,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Slide,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'

export type GachaDialogOptions = {
  title: string
  uri: string
  price: string
}

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  options: GachaDialogOptions
  handlerGacha: any
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const GachaDialog = ({ open, setOpen, options, handlerGacha }: Props) => {
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
          <Card sx={{ display: 'flex' }}>
            <CardMedia component="img" sx={{ width: 151 }} image={options.uri} alt="Paella dish" />
          </Card>
          <Typography component="div" variant="body1" sx={{ pt: 2 }}>
            Price: {options.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlerGacha()}>Run Gacha</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GachaDialog
