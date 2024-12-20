'use client'
import { motion } from 'framer-motion'
import {
    Cloud,
    HandToken,
    Star,
    StopSign,
    EasySign,
    HeyDudeSign,
    ClaimChainsBadge,
    SmileHigh,
    SmileFinder,
    HandSnap,
    GoodIdeaSign,
    Eyes,
    HandBag,
    HandRad,
    CloudLeft,
    CloudRight,
} from '@/assets'

const CloudAnimation = ({
    side,
    top,
    imageSrc,
    styleMod,
    screenWidth,
    speed = 45,
    startXOffset = 0,
}: {
    side: 'left' | 'right'
    top: string
    duration: number
    imageSrc: string
    styleMod?: string
    screenWidth?: number
    speed?: number
    startXOffset?: number
}) => {
    const imageWidth = 340 // Width of the cloud image (adjust as needed)
    const vpWidth = screenWidth || 1080

    // Total travel distance is screen width + image width + offset
    const totalDistance = vpWidth + imageWidth

    return (
        <motion.img
            src={imageSrc}
            alt={`Floating Cloud ${side}`}
            className={`absolute ${side}-0 ${styleMod || ''}`}
            style={{ top, width: imageWidth }}
            initial={{
                x: side === 'left' ? -imageWidth : vpWidth + startXOffset,
            }}
            animate={{
                x: side === 'left' ? [vpWidth, -imageWidth] : [-imageWidth, vpWidth],
            }}
            transition={{
                ease: 'linear',
                duration: totalDistance / speed,
                repeat: Infinity,
            }}
        />
    )
}

export const CloudImages = ({ screenWidth }: { screenWidth: number }) => {
    return (
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
            {/* Right side clouds */}
            <CloudAnimation
                side="right"
                top="5%"
                duration={10}
                imageSrc={Cloud.src}
                screenWidth={screenWidth}
                startXOffset={-200}
                speed={55}
            />
            <CloudAnimation
                side="right"
                top="35%"
                duration={12}
                imageSrc={Cloud.src}
                styleMod="scale-50"
                screenWidth={screenWidth}
                startXOffset={100}
                speed={35}
            />
            {/* <CloudAnimation
                side="right"
                top="65%"
                duration={14}
                imageSrc={Cloud.src}
                screenWidth={screenWidth}
                startXOffset={300}
                speed={60}
            /> */}

            {/* Left side clouds */}
            <CloudAnimation
                side="left"
                top="15%"
                duration={15}
                imageSrc={Cloud.src}
                styleMod="scale-50"
                screenWidth={screenWidth}
                startXOffset={-100}
                speed={30}
            />
            <CloudAnimation
                side="left"
                top="45%"
                duration={18}
                imageSrc={Cloud.src}
                screenWidth={screenWidth}
                startXOffset={200}
                speed={40}
            />
            {/* <CloudAnimation
                side="left"
                top="75%"
                duration={20}
                imageSrc={Cloud.src}
                styleMod="z-[99]"
                screenWidth={screenWidth}
                startXOffset={50}
                speed={45}
            /> */}
        </div>
    )
}

export const HeroImages = () => {
    return (
        <>
            <motion.img
                initial={{ opacity: 0, translateY: 20, translateX: 5 }}
                whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                transition={{ type: 'spring', damping: 5 }}
                src={Star.src}
                className="absolute bottom-[-4%] left-[1%] w-8 sm:bottom-[11%] sm:left-[12%] md:bottom-[18%] md:left-[5%] md:w-12"
            />
            <motion.img
                initial={{ opacity: 0, translateY: 28, translateX: -5 }}
                whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                transition={{ type: 'spring', damping: 5 }}
                src={Star.src}
                className="absolute right-[1.5%] top-[-12%] w-8 sm:right-[6%] sm:top-[8%] md:right-[5%] md:top-[8%] md:w-12 lg:right-[10%]"
            />
            {/* <motion.img
                initial={{ rotate: 5, opacity: 0, translateY: 28, translateX: -5, transformOrigin: 'top left' }}
                whileInView={{ rotate: 0, opacity: 1, translateY: 0, translateX: 0, transformOrigin: 'top left' }}
                whileHover={{ rotate: 5, transformOrigin: 'top left' }}
                transition={{ type: 'spring', damping: 10 }}
                src={HandToken.src}
                className="absolute left-[7%] top-[63%] hidden w-36 md:left-[1%] md:top-[70%] lg:left-[7%] lg:top-[63%] lg:block xl:left-[11%]"
            /> */}
        </>
    )
}

export const StoryImages = ({ index }: { index: number }) => {
    return (
        <>
            {index === 0 && (
                <>
                    <motion.img
                        initial={{ scale: 1.2, rotate: 5, translateY: 10 }}
                        whileInView={{ scale: 1, rotate: 0, translateY: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        src={StopSign.src}
                        className="absolute -left-[52%] -top-4 hidden w-40 -rotate-3 md:-left-[28%] md:block"
                    />
                    <motion.img
                        initial={{ opacity: 0, translateY: 20, translateX: 5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 5 }}
                        src={Star.src}
                        className="absolute -left-[32%] top-[42%] hidden w-14 md:block"
                    />
                </>
            )}

            {index === 1 && (
                <>
                    <motion.img
                        initial={{ scale: 1.2, rotate: 5, translateY: 10 }}
                        whileInView={{ scale: 1, rotate: 0, translateY: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        src={EasySign.src}
                        className="absolute -right-[66%] top-[20%] hidden w-48 rotate-6 md:-right-[38%] md:block lg:-right-[48%]"
                    />
                    <motion.img
                        initial={{ scale: 1.2, rotate: -5, translateY: 10 }}
                        whileInView={{ scale: 1, rotate: 0, translateY: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        src={HeyDudeSign.src}
                        className="absolute -right-[48%] -top-2 hidden w-40 -rotate-3 md:-right-[25%] md:block lg:-right-[35%]"
                    />

                    <motion.img
                        initial={{ opacity: 0, translateY: 18, translateX: -5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={Star.src}
                        className="absolute -bottom-16 -right-[8%] hidden w-14 md:block"
                    />
                </>
            )}
        </>
    )
}

export const FeaturesBadgeImage = () => {
    return (
        <motion.img
            initial={{ opacity: 0, translateY: 18, translateX: -5, rotate: 0, transformOrigin: 'bottom right' }}
            whileInView={{ opacity: 1, translateY: 0, translateX: 0, rotate: 3, transformOrigin: 'bottom right' }}
            whileHover={{ translateY: 1, translateX: 2, rotate: 0.5, transformOrigin: 'bottom right' }}
            transition={{ type: 'spring', damping: 15 }}
            src={ClaimChainsBadge.src}
            className="mx-auto w-80 -rotate-6 md:mt-8"
            alt="Send a link. Claim on 20+ Chains."
        />
    )
}

export const FeaturesImages = ({ index }: { index: number }) => {
    return (
        <>
            {index === 0 && (
                <>
                    {/* <motion.img
                        initial={{ opacity: 0, translateY: 18, translateX: -5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={SmileHigh.src}
                        className="absolute -left-20 top-4 hidden w-30 md:-top-16 md:left-[1%] md:block lg:left-[14%] xl:left-[20%]"
                    />
                    <motion.img
                        initial={{ opacity: 0, translateY: 18, translateX: 5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={SmileFinder.src}
                        className="absolute -left-10 top-16 hidden w-28 md:-left-[2%] md:-top-4 md:block lg:left-[12%] xl:left-[18%]"
                    /> */}
                    <motion.img
                        initial={{ opacity: 0, translateY: 18, translateX: -5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={Star.src}
                        className="absolute -left-6 top-10 hidden w-14 -rotate-3 md:left-[1%] md:block lg:left-[6%] lg:top-8 xl:left-[16%] xl:top-6"
                    />
                    <motion.img
                        initial={{
                            rotate: -5,
                            opacity: 0,
                            translateY: 22,
                            translateX: -5,
                            transformOrigin: 'bottom left',
                        }}
                        whileInView={{
                            rotate: 0,
                            opacity: 1,
                            translateY: 0,
                            translateX: 0,
                            transformOrigin: 'bottom left',
                        }}
                        whileHover={{ rotate: -6, transformOrigin: 'bottom left' }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={HandRad.src}
                        className="lg:-top-12- absolute -right-8 top-12 hidden w-14 md:-top-14 md:right-7 md:block md:w-14 lg:right-[10%] xl:right-[20%]"
                    />
                </>
            )}

            {index === 1 && (
                <>
                    <motion.img
                        initial={{ opacity: 0, translateY: 18, translateX: -5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={Star.src}
                        className="absolute -left-6 -top-14 hidden w-14 -rotate-3 md:left-[2%] md:block lg:left-[2%] xl:left-[8%]"
                    />
                    {/* <motion.img
                        initial={{ opacity: 0, translateY: 18, translateX: 5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={GoodIdeaSign.src}
                        className="absolute -right-20 top-20 hidden w-48 rotate-6 md:right-[2%] md:top-18 md:block lg:-right-[3%] lg:top-32 xl:right-[7%] xl:top-18"
                    />
                    <motion.img
                        initial={{ opacity: 0, translateY: 18, translateX: 5 }}
                        whileInView={{ opacity: 1, translateY: 0, translateX: 0 }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={Eyes.src}
                        className="absolute -left-16 bottom-0 hidden w-36 -rotate-6 md:-bottom-12 md:block lg:-bottom-8 lg:left-[0%] xl:-bottom-18 xl:left-[7%]"
                    /> */}
                    {/* <motion.img
                        initial={{
                            rotate: 12,
                            transformOrigin: 'bottom left',
                            opacity: 0,
                        }}
                        whileInView={{
                            rotate: 0,
                            transformOrigin: 'bottom left',
                            opacity: 1,
                        }}
                        whileHover={{ rotate: -6, transformOrigin: 'bottom left' }}
                        transition={{ type: 'spring', damping: 6 }}
                        src={HandBag.src}
                        className="absolute -bottom-16 right-[0%] hidden w-36 md:block lg:-bottom-32 lg:right-[20%] xl:-bottom-18 xl:right-6"
                    /> */}
                </>
            )}
        </>
    )
}
