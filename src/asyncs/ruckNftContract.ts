import type { SafeEventEmitterProvider } from '@web3auth/base'
import { ethers } from 'ethers'
import IRuckNFT from '@/assets/abis/IRuckNFT.json'
import config from '@/globals/config'

export default class RuckGameContract {
  private provider: SafeEventEmitterProvider

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider
  }

  async getContract() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider)
      const signer = await ethersProvider.getSigner()
      return new ethers.Contract(config.ruckNftContractAddress ?? '', IRuckNFT, signer)
    } catch (error: any) {
      return error
    }
  }
}
