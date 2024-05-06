'use client'
import { useEffect, useState } from 'react'

import Icon from '@/components/Global/Icon'

import * as utils from '@/utils'
import { ethers } from 'ethers'

type AddressInputProps = {
    className?: string
    placeholder: string
    value: string
    onSubmit: any
}

const AddressInput = ({ placeholder, value, onSubmit }: AddressInputProps) => {
    const [userInputAddress, setUserInputAddress] = useState<string>(value)
    const [address, setAddress] = useState<string>(value)
    const [debouncedAddress, setDebouncedAddress] = useState<string>('')
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function checkAddress(address: string) {
        try {
            if (address.toLowerCase().endsWith('.eth')) {
                const resolvedAddress = await utils.resolveFromEnsName(address.toLowerCase())
                if (resolvedAddress) {
                    address = resolvedAddress
                    setIsValidAddress(true)
                    setAddress(address)
                } else {
                    setIsValidAddress(false)
                }
            } else if (ethers.utils.isAddress(address)) {
                setAddress(address)
                setIsValidAddress(true)
            } else {
                setIsValidAddress(false)
            }
        } catch (error) {
            console.error('Error while validating address input field:', error)
            setIsValidAddress(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = () => {
        if (address) {
            onSubmit(address)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        const handler = setTimeout(() => {
            setDebouncedAddress(userInputAddress)
        }, 750)
        return () => {
            clearTimeout(handler)
        }
    }, [userInputAddress])

    useEffect(() => {
        if (debouncedAddress) {
            checkAddress(debouncedAddress)
        }
    }, [debouncedAddress])

    useEffect(() => {
        setUserInputAddress(value)
    }, [value])

    return (
        <div
            className={`relative w-full border border-n-1 dark:border-white${
                userInputAddress && !isLoading && isValidAddress
                    ? ' border border-n-1 dark:border-white'
                    : userInputAddress && !isLoading && !isValidAddress
                      ? ' border-n-1 border-red dark:border-red'
                      : ''
            }`}
        >
            <input
                className={`transition-color h-12 w-full rounded-none bg-transparent
                bg-white pl-6 pr-18  text-base text-base font-medium outline-none placeholder:text-sm focus:border-purple-1 dark:border-white dark:bg-n-1 dark:text-white dark:placeholder:text-white/75 dark:focus:border-purple-1`}
                type="text"
                placeholder={placeholder}
                value={userInputAddress}
                onSubmit={(e) => {
                    e.preventDefault()
                }}
                onChange={(e) => {
                    if (e.target.value.length > 0) {
                        setUserInputAddress(e.target.value)
                    } else {
                        setUserInputAddress('')
                    }
                }}
                spellCheck="false"
            />
            {userInputAddress.length > 0 ? (
                isLoading ? (
                    <div className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center">
                        <div
                            className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-none"
                            role="status"
                        />
                    </div>
                ) : isValidAddress ? (
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                        onClick={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <Icon className="h-6 w-6  dark:fill-white" name="arrow-next" />
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setUserInputAddress('')
                        }}
                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                    >
                        <Icon className="h-6 w-6 dark:fill-white" name="close" />
                    </button>
                )
            ) : null}
        </div>
    )
}

export default AddressInput