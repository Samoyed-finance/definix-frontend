import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getAddress,
  getHerodotusAddress,
  getFinixAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getBunnyFactoryAddress,
  getDefinixProfileAddress,
  getDefinixRabbitsAddress,
  getPointCenterIfoAddress,
  getBunnySpecialAddress,
} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import bunnyFactory from 'config/abi/bunnyFactory.json'
import definixRabbits from 'config/abi/definixRabbits.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import herodotus from 'config/abi/herodotus.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import profile from 'config/abi/definixProfile.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import bunnySpecial from 'config/abi/bunnySpecial.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const useFinix = () => {
  return useERC20(getFinixAddress())
}

export const useBunnyFactory = () => {
  const bunnyFactoryAbi = (bunnyFactory as unknown) as AbiItem
  return useContract(bunnyFactoryAbi, getBunnyFactoryAddress())
}

export const useDefinixRabbits = () => {
  const definixRabbitsAbi = (definixRabbits as unknown) as AbiItem
  return useContract(definixRabbitsAbi, getDefinixRabbitsAddress())
}

export const useProfile = () => {
  const profileABIAbi = (profile as unknown) as AbiItem
  return useContract(profileABIAbi, getDefinixProfileAddress())
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useHerodotus = () => {
  const abi = (herodotus as unknown) as AbiItem
  return useContract(abi, getHerodotusAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, getAddress(config.contractAddress))
}

export const usePointCenterIfoContract = () => {
  const abi = (pointCenterIfo as unknown) as AbiItem
  return useContract(abi, getPointCenterIfoAddress())
}

export const useBunnySpecialContract = () => {
  const abi = (bunnySpecial as unknown) as AbiItem
  return useContract(abi, getBunnySpecialAddress())
}

export default useContract
