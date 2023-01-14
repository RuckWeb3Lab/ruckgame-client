import { useEffect, useState, createContext } from 'react'
import { SafeEventEmitterProvider } from '@web3auth/base'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { Web3Auth } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { web3AuthOptions, openloginAdapterOptions, modalConfig } from '@/globals/web3AuthConfig'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const WalletContext = createContext<any>([null, () => {}])
export const Web3AuthContext = createContext<any>([null, () => {}])
export const EthersProviderContext = createContext<any>([null, () => {}])

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [wallet, setWallet] = useState<any>(null)
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null)
  const [ethersProvider, setEthersProvider] = useState<SafeEventEmitterProvider | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth(web3AuthOptions)
        const openloginAdapter = new OpenloginAdapter(openloginAdapterOptions)
        web3authInstance.configureAdapter(openloginAdapter)

        await web3authInstance.initModal({ modalConfig })

        setWeb3Auth(web3authInstance)
      } catch (error) {
        console.error(error)
      }
    }
    init()
  }, [])

  const getLayout = Component.getLayout ?? ((page) => page)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <WalletContext.Provider value={[wallet, setWallet]}>
      <Web3AuthContext.Provider value={[web3auth, setWeb3Auth]}>
        <EthersProviderContext.Provider value={[ethersProvider, setEthersProvider]}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </EthersProviderContext.Provider>
      </Web3AuthContext.Provider>
    </WalletContext.Provider>
  )
}
