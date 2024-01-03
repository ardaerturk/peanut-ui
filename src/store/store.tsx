'use client'
import { atom, useSetAtom } from 'jotai'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { ethers } from 'ethersv5'
import peanut from '@squirrel-labs/peanut-sdk'
import * as interfaces from '@/interfaces'
import * as socketTech from '@socket.tech/socket-v2-sdk'
import * as hooks from '@/hooks'

export const userBalancesAtom = atom<interfaces.IUserBalance[]>([])
export const defaultChainDetailsAtom = atom<any[]>([])
export const defaultTokenDetailsAtom = atom<interfaces.IPeanutTokenDetail[]>([])

export const supportedChainsSocketTechAtom = atom<socketTech.ChainDetails[]>([])

export function Store({ children }: { children: React.ReactNode }) {
    const setUserBalances = useSetAtom(userBalancesAtom)
    const setDefaultChainDetails = useSetAtom(defaultChainDetailsAtom)
    const setDefaultTokenDetails = useSetAtom(defaultTokenDetailsAtom)
    const setSupportedChainsSocketTech = useSetAtom(supportedChainsSocketTechAtom)
    const gaEventTracker = hooks.useAnalyticsEventTracker('peanut-general')

    const { address: userAddr, isDisconnected } = useAccount()

    useEffect(() => {
        setUserBalances([])
        if (userAddr) {
            loadUserBalances(userAddr)
            gaEventTracker('peanut-wallet-connected', userAddr)
        }
    }, [userAddr])

    useEffect(() => {
        if (isDisconnected) {
            setUserBalances([])
        }
    }, [isDisconnected])

    useEffect(() => {
        getSupportedChainsSocketTech()
        getPeanutChainAndTokenDetails()
    }, [])

    const getSupportedChainsSocketTech = async () => {
        try {
            const supportedChainsResponse = await socketTech.Supported.getAllSupportedChains()
            if (supportedChainsResponse.success) {
                setSupportedChainsSocketTech(supportedChainsResponse.result)
            }
        } catch (error) {
            console.error('error loading supportedChainsSocketTech, ', error)
        }
    }

    const getPeanutChainAndTokenDetails = async () => {
        if (peanut) {
            const chainDetailsArray = Object.keys(peanut.CHAIN_DETAILS).map(
                (key) => peanut.CHAIN_DETAILS[key as keyof typeof peanut.CHAIN_DETAILS]
            )
            const tokenDetailsArray = peanut.TOKEN_DETAILS
            //NOTE: Filtering out milkomeda per request of KU
            setDefaultChainDetails(chainDetailsArray.filter((chain) => chain.chainId !== 2001))
            setDefaultTokenDetails(tokenDetailsArray)
        }
    }

    const formatUserBalance = (socketBalance: socketTech.TokenBalanceReponseDTO) => {
        return {
            chainId: socketBalance.result.chainId,
            address: socketBalance.result.tokenAddress,
            name: socketBalance.result.name,
            symbol: socketBalance.result.symbol,
            decimals: socketBalance.result.decimals,
            chainAgnosticId: null,
            icon: socketBalance.result.icon,
            logoURI: socketBalance.result.icon,
            amount: ethers.utils.formatUnits(Number(socketBalance.result.balance), socketBalance.result.decimals),
            price: 0,
            currency: null,
        }
    }

    const loadUserBalances = async (address: string) => {
        try {
            const userBalancesResponse: any = await socketTech.Balances.getBalances({
                userAddress: address,
            })
            const usdcPolygonBalance = await socketTech.Balances.getBalance({
                tokenAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
                chainId: 137,
                userAddress: address,
            })
            const usdcArbBalance = await socketTech.Balances.getBalance({
                tokenAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                chainId: 42161,
                userAddress: address,
            })
            const usdcOptiBalance = await socketTech.Balances.getBalance({
                tokenAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
                chainId: 10,
                userAddress: address,
            })
            const x = userBalancesResponse.result.concat([
                formatUserBalance(usdcPolygonBalance),
                formatUserBalance(usdcArbBalance),
                formatUserBalance(usdcOptiBalance),
            ])

            const updatedBalances: interfaces.IUserBalance[] = userBalancesResponse.result
                .map((balances: any) => {
                    return {
                        chainId: balances.chainId,
                        symbol: balances.symbol,
                        name: balances.name,
                        address: balances.address,
                        decimals: balances.decimals,
                        amount: Number(balances.amount),
                        price: 0,
                        currency: balances.currency,
                        //@ts-ignore
                        logoURI: balances.logoURI,
                    }
                })
                .sort((a: interfaces.IUserBalance, b: interfaces.IUserBalance) => {
                    if (a.chainId === b.chainId) {
                        // If the address is the native currency, move it to the top
                        if (a.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') return -1
                        if (b.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') return 1

                        // If 'chainId' is the same, sort by 'amount'
                        return b.amount - a.amount
                    } else {
                        // Else sort by 'chainId'
                        return a.chainId - b.chainId
                    }
                })

            if (userBalancesResponse.success) {
                setUserBalances((prev) => {
                    return [...prev, ...updatedBalances]
                })
            } else {
                setUserBalances([])
            }
        } catch (error) {
            console.error('error loading userBalances, ', error)
        }
    }

    return <>{children}</>
}
