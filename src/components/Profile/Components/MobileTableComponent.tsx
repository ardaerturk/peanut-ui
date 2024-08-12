'use client'
import * as utils from '@/utils'
import * as interfaces from '@/interfaces'
import Modal from '@/components/Global/Modal'
import { useCallback, useState } from 'react'
import * as consts from '@/constants'
import { useRouter } from 'next/navigation'

export const MobileTableComponent = ({
    key,
    primaryText,
    secondaryText,
    tertiaryText,
    quaternaryText,
    type,
    avatar,
    dashboardItem,
    address,
}: interfaces.IProfileTableData) => {
    const [modalVisible, setModalVisible] = useState(false)
    const router = useRouter()
    const handleSendToAddress = useCallback(
        (address: string) => {
            router.push(`/send?recipientAddress=${encodeURIComponent(address)}`)
        },
        [router]
    )

    return (
        <div
            className="flex w-full flex-row items-center justify-between gap-2 border border-n-1 bg-background px-2 py-4 text-h8 font-normal dark:bg-black"
            key={key}
            onClick={() => setModalVisible(true)}
        >
            {avatar.avatarUrl ? (
                <div className="border border-black border-n-1 p-2">
                    <img alt="" loading="eager" src={avatar.avatarUrl} className="h-8 w-8" />
                </div>
            ) : (
                avatar.iconName && ''
            )}

            <div className="flex w-full flex-col gap-2" key={key}>
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex w-full max-w-48 flex-col items-start justify-center gap-1">
                        <label className="font-bold">
                            {primaryText.substring(0, 1).toUpperCase()}
                            {primaryText.substring(1).toLowerCase()}
                        </label>
                    </div>
                    <label>{secondaryText}</label>
                </div>
                <div className="flex w-full border-t border-dotted border-black" />
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-col items-start justify-end gap-2 text-start">
                        <label className="font-bold">{tertiaryText}</label>
                    </div>
                    <div className="flex flex-col items-end justify-end gap-2 text-end">
                        <div>
                            {type === 'history' ? (
                                quaternaryText === 'claimed' ? (
                                    <div className="border border-green-3 px-2 py-1 text-center text-green-3">
                                        claimed
                                    </div>
                                ) : (
                                    <div className="border border-gray-1 border-n-1 px-2 py-1 text-gray-1">pending</div>
                                )
                            ) : type === 'contacts' ? (
                                <label className="font-bold">txs: {quaternaryText}</label>
                            ) : (
                                type === 'accounts' && ''
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Options"
                classWrap="bg-background"
            >
                {' '}
                <div className="flex w-full flex-col items-center justify-center p-2 "></div>
                {type === 'history' ? (
                    <>
                        {dashboardItem?.type !== 'Link Received' && dashboardItem?.status === 'pending' && (
                            <div
                                onClick={() => {
                                    dashboardItem.link && window.open(dashboardItem?.link ?? '', '_blank')
                                }}
                                className="flex h-12 w-full items-center gap-2 px-4 text-h8 text-sm font-bold transition-colors last:mb-0 hover:bg-n-3/10 disabled:cursor-not-allowed disabled:bg-n-4 disabled:hover:bg-n-4/90 dark:hover:bg-white/20 "
                            >
                                Refund
                            </div>
                        )}
                        {(dashboardItem?.type === 'Link Received' || dashboardItem?.type === 'Link Sent') && (
                            <div
                                onClick={() => {
                                    utils.copyTextToClipboardWithFallback(dashboardItem?.link ?? '')
                                }}
                                className="flex h-12 w-full items-center gap-2 px-4 text-h8 text-sm font-bold transition-colors last:mb-0 hover:bg-n-3/10 disabled:cursor-not-allowed disabled:bg-n-4 disabled:hover:bg-n-4/90 dark:hover:bg-white/20"
                            >
                                Copy link
                            </div>
                        )}
                        {dashboardItem?.txHash && (
                            <div
                                onClick={() => {
                                    const chainId =
                                        consts.supportedPeanutChains.find(
                                            (chain) => chain.name === dashboardItem?.chain
                                        )?.chainId ?? ''

                                    const explorerUrl = utils.getExplorerUrl(chainId)
                                    window.open(`${explorerUrl}/tx/${dashboardItem?.txHash ?? ''}`, '_blank')
                                }}
                                className="flex h-12 w-full items-center gap-2 px-4 text-h8 text-sm font-bold transition-colors last:mb-0 hover:bg-n-3/10 disabled:cursor-not-allowed disabled:bg-n-4 disabled:hover:bg-n-4/90 dark:hover:bg-white/20 "
                            >
                                Show in explorer
                            </div>
                        )}
                        {dashboardItem?.attachmentUrl && (
                            <a
                                href={dashboardItem.attachmentUrl}
                                download
                                target="_blank"
                                className="flex h-12 w-full items-center gap-2 px-4 text-h8 text-sm font-bold transition-colors last:mb-0 hover:bg-n-3/10 disabled:cursor-not-allowed disabled:bg-n-4 disabled:hover:bg-n-4/90 dark:hover:bg-white/20"
                            >
                                Download attachment
                            </a>
                        )}
                    </>
                ) : type === 'contacts' ? (
                    <>
                        <div
                            onClick={() => {
                                handleSendToAddress(address as string)
                            }}
                            className="flex h-12 w-full items-center gap-2 px-4 text-h8 text-sm font-bold transition-colors last:mb-0 hover:bg-n-3/10 disabled:cursor-not-allowed disabled:bg-n-4 disabled:hover:bg-n-4/90 dark:hover:bg-white/20 "
                        >
                            {' '}
                            Send to this address
                        </div>
                        <div
                            onClick={() => {
                                console.log('Delete') // TODO: implement delete
                            }}
                            className="flex h-12 w-full items-center gap-2 px-4 text-h8 text-sm font-bold transition-colors last:mb-0 hover:bg-n-3/10 disabled:cursor-not-allowed disabled:bg-n-4 disabled:hover:bg-n-4/90 dark:hover:bg-white/20 "
                        >
                            Delete
                        </div>
                    </>
                ) : (
                    type === 'accounts' && (
                        <div
                            onClick={() => {
                                console.log('Delete') // TODO: implement delete
                            }}
                            className="flex h-12 w-full items-center gap-2 px-4 text-h8 text-sm font-bold transition-colors last:mb-0 hover:bg-n-3/10 disabled:cursor-not-allowed disabled:bg-n-4 disabled:hover:bg-n-4/90 dark:hover:bg-white/20 "
                        >
                            Delete
                        </div>
                    )
                )}
            </Modal>
        </div>
    )
}