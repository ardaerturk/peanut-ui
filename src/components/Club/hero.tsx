import { Stack, Center } from '@chakra-ui/react'
import { MarqueeComp } from '../Global/MarqueeWrapper'
import * as assets from '@/assets'
import { HeroImages } from './imageAssets'

type HeroProps = {
    heading: string
    marquee?: {
        visible: boolean
        message?: string
    }
}

export function Hero({ heading, marquee = { visible: false } }: HeroProps) {
    return (
        <Stack className="relative overflow-x-hidden">
            <HeroImages />

            <Center height={`calc(100vh - 4rem - 4rem)`}>
                <h1 className="text-violet-3- mt-[-35%] text-center font-display text-7xl font-black uppercase md:-mt-32 lg:-mt-40 lg:text-9xl">
                    {heading}
                </h1>
            </Center>

            <div className="relative z-1">
                {marquee && <MarqueeComp message={marquee.message} imageSrc={assets.HandThumbs.src} />}
            </div>

            <img
                src={assets.PeanutGuy.src}
                className="absolute bottom-[14%] left-1/2 h-1/3 -translate-x-1/2 md:bottom-[10%] md:h-1/2"
                alt=""
            />
        </Stack>
    )
}
