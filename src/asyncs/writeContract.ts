import config from '@/globals/config'

export async function babyMint(repDogsContract: any) {
  const response = await repDogsContract.babyMint(config.repDogsContractAddress)
  return response
}
