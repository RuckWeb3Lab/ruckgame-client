import Head from 'next/head'
import { SERVICE_NAME } from '@/globals/constants'
// Mui
import { Container } from '@mui/material'
// Type
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const GuestLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{SERVICE_NAME}</title>
        <meta name="description" content={SERVICE_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg">{children}</Container>
    </>
  )
}

export default GuestLayout
