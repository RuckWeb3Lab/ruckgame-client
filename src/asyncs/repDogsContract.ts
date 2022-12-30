import type { SafeEventEmitterProvider } from '@web3auth/base'
import { ethers } from 'ethers'
import IRepDogAbi from '@/assets/abis/IRepDog.json'

export default class RepDogsContract {
  private provider: SafeEventEmitterProvider

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider
  }

  async getContract() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider)
      const signer = await ethersProvider.getSigner()
      return new ethers.Contract('0xf3c199c136C05ea69E4A82dCEF6dC14990d0BFDc', IRepDogAbi, signer)
    } catch (error: any) {
      return error
    }
  }
}
