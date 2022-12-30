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

type Options = {
  title: string
  uri: string
  price: string
}

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  options: Options
  handlerPurchaseEgg: any
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const PurchaseDialog = ({ open, setOpen, options, handlerPurchaseEgg }: Props) => {
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
          <Button onClick={() => handlerPurchaseEgg()}>Purchase</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PurchaseDialog
