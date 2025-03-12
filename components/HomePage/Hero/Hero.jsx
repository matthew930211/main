import React from 'react'
import { RiSparklingFill } from 'react-icons/ri'
import { TbBolt } from 'react-icons/tb'
import { FiSend } from "react-icons/fi"
import { IoColorPaletteOutline } from 'react-icons/io5'
import { BackgroundLines } from '@/components/ui/BackgroundLines'
import Navbar from '../Navbar/Navbar'
import Image from 'next/image'

const Hero = () => {
    return (
        <BackgroundLines className={`w-[90%] mx-auto !z-[999]`}>
            <div className="min-h-screen w-full mt-20 ">
                <div className="flex items-center justify-center z-50">
                    <div className="w-fit px-4 py-[5px] rounded-full flex items-center gap-x-2 bg-gradient-to-b from-[#445c73]/10 via-[#1E1F40] to-[#445c73]/10 border border-white/10">
                        <RiSparklingFill className="text-[#c1dcf1] text-xs" />
                        <span className="text-[#c1dcf1] text-xs">New Tik Tok Integration</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-6 gap-y-2 z-50">
                    <h2 className={`text-5xl text-[#c1dcf1] text-center`}>
                        Create viral <span className="text-[#85c4f3]" id="landing-hero-span-1">short-form</span>
                    </h2>
                    <h2 className={`text-5xl text-[#c1dcf1] text-center`}>
                        <span className="text-[#30a4da]" id="landing-hero-span-1">videos</span> in seconds.
                    </h2>
                </div>

                <div className="max-w-md mx-auto text-center text-[#c1dcf1] text-lg mt-4 z-50">
                    InstaClip generates short-form viral content instantly with AI. No more countless hours editing required.
                </div>

                <div className="mt-10 z-50">
                    <div className="flex items-center gap-x-2 md:gap-x-4 gap-y-3 flex-wrap justify-around sm:justify-center mt-4">
                        <div className="flex items-center gap-x-2 text-[#c1dcf1] text-sm">
                            <TbBolt />
                            Fast Generations
                        </div>

                        <div className="flex items-center gap-x-2 text-[#c1dcf1] text-sm border-white/50 sm:border-l sm:border-r px-4">
                            <FiSend />
                            One-Click Sharing
                        </div>

                        <div className="flex items-center gap-x-2 text-[#c1dcf1] text-sm">
                            <IoColorPaletteOutline />
                            Customizable
                        </div>
                    </div>

                    <section style={{ position: 'relative', width: '100%', maxHeight: "40vh", overflow: 'hidden' }} className='flex items-center justify-center mt-10 mx-auto max-w-3xl rounded-2xl shadow-2xl shadow-[#1F1B36]'>
                        <Image src={"/assets/images/poster.PNG"} alt='Demo' width={800} height={800} />
                    </section>
                </div>

                <div className="absolute inset-0 !z-10 h-full w-full bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            </div>
        </BackgroundLines>
    )
}

export default Hero