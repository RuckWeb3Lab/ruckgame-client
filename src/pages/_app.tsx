import { useEffect, useState, createContext } from 'react'
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { Web3Auth } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const clientId =
  'BAVw6bQNDV2dWhShQ-dKV6dxuW2_zt50WdPMSpVzNUTCCFOYnSeZH_caCB6n9mu7o1-kmTtQCi95EtCb14h3e7c'

export const Web3AuthContext = createContext<any>([null, () => {}])
export const Web3AuthProviderContext = createContext<any>([null, () => {}])

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [web3AuthProvider, setWeb3AuthProvider] = useState<SafeEventEmitterProvider | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x5',
            rpcTarget: 'https://eth-goerli.g.alchemy.com/v2/Y4PZBcYureGZiAC4cTvo8wsabTI5SVnt',
          },
          uiConfig: {
            theme: 'dark',
            loginMethodsOrder: ['twitter'],
            appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
            defaultLanguage: 'ja',
          },
        })

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: 'cyan',
            uxMode: 'popup',
            whiteLabel: {
              name: 'Your app Name',
              logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
              logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
              defaultLanguage: 'en',
              dark: true, // whether to enable dark mode. defaultValue: false
            },
          },
        })

        web3auth.configureAdapter(openloginAdapter)
        setWeb3auth(web3auth)

        // DOCS: https://web3auth.io/docs/sdk/web/modal/whitelabel
        // "google", "facebook", "twitter", "reddit", "discord", "twitch", "apple", "line", "github", "kakao", "linkedin", "weibo", "wechat", "email_passwordless
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: 'openlogin',
              loginMethods: {
                twitter: {
                  name: 'twitter',
                  showOnModal: false,
                },
                facebook: {
                  name: 'facebook',
                  showOnModal: false,
                },
                google: {
                  name: 'google',
                  showOnModal: false,
                },
                reddit: {
                  name: 'reddit',
                  showOnModal: false,
                },
                discord: {
                  name: 'discord',
                  showOnModal: false,
                },
                twitch: {
                  name: 'twitch',
                  showOnModal: false,
                },
                apple: {
                  name: 'apple',
                  showOnModal: false,
                },
                line: {
                  name: 'line',
                  showOnModal: false,
                },
                github: {
                  name: 'github',
                  showOnModal: false,
                },
                kakao: {
                  name: 'kakao',
                  showOnModal: false,
                },
                linkedin: {
                  name: 'linkedin',
                  showOnModal: false,
                },
                weibo: {
                  name: 'weibo',
                  showOnModal: false,
                },
                wechat: {
                  name: 'wechat',
                  showOnModal: false,
                },
                email_passwordless: {
                  name: 'email',
                  showOnModal: false,
                },
              },
              showOnModal: true,
            },
          },
        })

        setWeb3AuthProvider(web3auth.provider)
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
    <Web3AuthContext.Provider value={[web3auth, setWeb3auth]}>
      <Web3AuthProviderContext.Provider value={[web3AuthProvider, setWeb3AuthProvider]}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Web3AuthProviderContext.Provider>
    </Web3AuthContext.Provider>
  )
}
