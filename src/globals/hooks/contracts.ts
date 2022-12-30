import { useMemo } from 'react'
import IRepDog from '@/assets/abis/IRepDog.json'
import config from '@/globals/config'
import { getContract } from '@/globals/web3'
import { useWeb3React } from '@web3-react/core'
import type { Contract, ContractInterface } from '@ethersproject/contracts'

export function useContract(
  address: string | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useRepDogs(withSignerIfPossible?: boolean): Contract | null {
  return useContract(config.repDogsContractAddress, IRepDog, withSignerIfPossible)
}
