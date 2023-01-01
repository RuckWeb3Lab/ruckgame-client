import type { SafeEventEmitterProvider } from '@web3auth/base'
import { ethers } from 'ethers'
import IRepDogAbi from '@/assets/abis/IRepezenDoxxGame.json'
import config from '@/globals/config'

export default class RepesenDoxxGameContract {
  private provider: SafeEventEmitterProvider

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider
  }

  async getContract() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider)
      const signer = await ethersProvider.getSigner()
      return new ethers.Contract(config.repDogsContractAddress ?? '', IRepDogAbi, signer)
    } catch (error: any) {
      return error
    }
  }
}
