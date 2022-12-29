import Head from 'next/head'
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
        <title>Repezen Dogs</title>
        <meta name="description" content="Repezen Dogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg">{children}</Container>
    </>
  )
}

export default GuestLayout
