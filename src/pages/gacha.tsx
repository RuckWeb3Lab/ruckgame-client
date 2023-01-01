import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Web3AuthProviderContext } from '@/pages/_app'
// Mui
import { Breadcrumbs, Box, Link, Tab, Tabs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
// Component
import DefaultLayout from '@/components/layout/DefaultLayout'
import GachaDialog from '@/components/dialog/GachaDialog'
import ActionAlert from '@/components/alert/ActionAlert'
import NomalGachaTabPanel from '@/components/tab/gacha/NomalGachaPanel'
import NftGachaTabPanel from '@/components/tab/gacha/NftGachaPanel'
// Type
import type { NextPageWithLayout } from '@/pages/_app'
import type { GachaDialogOptions } from '@/components/dialog/GachaDialog'
// Util
import repezenDoxxGameContract from '@/asyncs/repezenDoxxGameContract'

const GachaPage: NextPageWithLayout = () => {
  const [provider, _] = useContext(Web3AuthProviderContext)

  const [tab, setTab] = useState(0)

  // Alert
  const [actionAlert, setActionAlert] = useState<boolean>(false)
  const [actionAlertOptions, setActionAlertOptions] = useState<any>({
    severity: 'error',
    title: '',
    message: '',
  })

  // Gacha dialog
  const [gachaDialog, setGachaDialog] = useState<boolean>(false)
  const [gachaDialogOptions, setGachaDialogOptions] = useState<GachaDialogOptions>({
    title: '',
    uri: '',
    price: '',
  })

  /**
   * openGachaDialog
   * ガチャダイアログを開く
   */
  const openGachaDialog = (title: string, uri: string, price: string) => {
    setGachaDialogOptions({
      title,
      uri,
      price,
    })
    setGachaDialog(true)
  }

  /**
   * handlerNftGacha
   * ガチャを回す
   */
  const handlerNftGacha = useCallback(async () => {
    try {
      const ethersRpc = new repezenDoxxGameContract(provider)
      const gameContract = await ethersRpc.getContract()

      if (!gameContract) return
      const txReceipt = await gameContract.rollFreeGacha()
      txReceipt.wait().then((tx: any) => {
        console.log('tx: ', tx)
        setActionAlertOptions({
          severity: 'success',
          title: 'Success',
          message: 'Congrats!!',
        })
        setActionAlert(true)
      })
    } catch (error: any) {
      console.error(error)
      setActionAlertOptions({
        severity: 'error',
        title: 'Warning',
        message: error.error.message,
      })
      setActionAlert(true)
    }
    setGachaDialog(false)
  }, [provider])

  /**
   * handleChangeTab
   * タブを切り替える
   */
  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <>
      <Tabs value={tab} onChange={handleChangeTab} aria-label="market tab">
        <Tab id="tab-0" aria-controls="tabpanel-0" label="Nomal" />
        <Tab id="tab-1" aria-controls="tabpanel-1" label="NFT" />
      </Tabs>

      {tab === 0 && <NomalGachaTabPanel />}
      {tab === 1 && <NftGachaTabPanel handlerGacha={openGachaDialog} />}

      <GachaDialog
        open={gachaDialog}
        setOpen={setGachaDialog}
        options={gachaDialogOptions}
        handlerGacha={handlerNftGacha}
      />

      <ActionAlert open={actionAlert} setOpen={setActionAlert} options={actionAlertOptions} />
    </>
  )
}

GachaPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      <Box sx={{ my: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Gacha</Typography>
        </Breadcrumbs>
      </Box>
      {page}
    </DefaultLayout>
  )
}

export default GachaPage
