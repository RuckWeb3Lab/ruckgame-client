const config = {
  web3AuthClientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
  ruckgameContractAddress: process.env.NEXT_PUBLIC_RUCKGAME_CONTRACT_ADDRESS,
  ruckNftContractAddress: process.env.NEXT_PUBLIC_MOCK_NFT_CONTRACT_ADDRESS,
}

Object.entries(config).forEach(([key, value]) => {
  if (value === undefined) {
    throw Error(`Environment variables are insufficient. ${key}`)
  }
})

export default config
