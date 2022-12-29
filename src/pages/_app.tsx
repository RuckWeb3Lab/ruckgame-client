import '../styles/globals.css'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
  })

  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
