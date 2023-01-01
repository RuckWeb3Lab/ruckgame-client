const config = {
  repDogsContractAddress: process.env.NEXT_PUBLIC_RUCKGAME_CONTRACT_ADDRESS,
}

Object.entries(config).forEach(([key, value]) => {
  if (value === undefined) {
    throw Error(`Environment variables are insufficient. ${key}`)
  }
})

export default config
