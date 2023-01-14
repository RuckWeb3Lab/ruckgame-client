import config from '@/globals/config'
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, WALLET_ADAPTER_TYPE } from '@web3auth/base'
import type { Web3AuthOptions, ModalConfig } from '@web3auth/modal'
import type { OpenloginAdapterOptions } from '@web3auth/openlogin-adapter'

export const web3AuthOptions: Web3AuthOptions = {
  clientId: config.web3AuthClientId ?? '',
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
  }
}

export const openloginAdapterOptions: OpenloginAdapterOptions = {
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
}

// DOCS: https://web3auth.io/docs/sdk/web/modal/whitelabel
// "google", "facebook", "twitter", "reddit", "discord", "twitch", "apple", "line", "github", "kakao", "linkedin", "weibo", "wechat", "email_passwordless
export const modalConfig: Record<WALLET_ADAPTER_TYPE, ModalConfig> = {
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
}
