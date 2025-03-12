"use client"

import { Skeleton } from '@/components/ui/skeleton'
import { articles } from '@/data/articles'
import { useUser } from '@clerk/nextjs'
import { Orbitron, Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
})


const PopularArticles = () => {
    const { user, isLoaded } = useUser();

    return (
        isLoaded ? (
            <div className='px-0 xl:px-10'>
                <div className=''>
                    <h4 className={`bg-[#4a2ac0] text-white text-xs px-4 py-1 rounded-full w-fit ${font.className}`}>Popular</h4>
                    <h3 className={`text-white text-2xl mt-4 ${font.className}`}>Articles</h3>
                </div>

                <div className='mt-6 flex flex-col gap-y-2'>
                    {
                        articles?.length > 0 && articles?.slice(0, 3)?.map((item, index) => (
                            index === 0 ? (
                                <div key={item?._id} style={{
                                    background: `url("${item?.previewImage}") rgba(0,0,0,0.7) no-repeat`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundBlendMode: "darken"
                                }} className='min-h-[100px] rounded-3xl flex flex-wrap items-center px-4 py-4 gap-x-2 gap-y-2 transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer'>
                                    <Image src={`${item?.previewImage}`} alt={`${item?.title}`} width={120} height={100} className='rounded-lg object-cover w-[90px] ' />

                                    <div className='text-white'>
                                        <p className='text-sm'>{item?.title}</p>
                                        <p className='text-neutral-400 text-xs'>{item?.shortDesc}</p>
                                    </div>
                                </div>
                            ) : (
                                <div key={item?._id} style={{
                                    background: `url("${item?.previewImage}") rgba(0,0,0,0.4) no-repeat`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundBlendMode: "darken"
                                }} className='rounded-3xl h-[200px] px-6 py-2 flex flex-col gap-y-2 items-start justify-center text-white transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer'>
                                    <p className='text-sm'>{item?.title}</p>
                                    <p className='text-neutral-400 text-xs'>{item?.shortDesc}</p>
                                </div>
                            )
                        ))
                    }
                </div>

                <div className='mt-4 w-full'>
                    <div className={`cursor-pointer bg-gradient-to-r from-[#4a2ac0] to-[#5324c0] px-4 py-3 rounded-lg text-sm text-white flex items-center justify-center gap-x-2 ${font.className}`}>
                        Browse More
                        <FaLongArrowAltRight />

                    </div>
                </div>
            </div>
        ) : (
            <div className='px-0 xl:px-10'>
                <div className=''>
                    <h4 className={`bg-[#4a2ac0] text-white text-xs px-4 py-1 rounded-full w-fit ${font.className}`}>Popular</h4>
                    <h3 className={`text-white text-2xl mt-4 ${font.className}`}>Articles</h3>
                </div>

                <div className='mt-6 flex flex-col gap-y-2'>
                    {
                        Array.from(new Array(3))?.map((item, index) => (
                            index === 0 ? (
                                <div key={item?._id} className='min-h-[100px] bg-[#0F1117] rounded-3xl flex flex-wrap items-center px-4 py-4 gap-x-2 gap-y-2'>

                                    <div className='text-white w-full flex flex-col gap-y-2'>
                                        <Skeleton className={`bg-[#232F3A] w-[40px] h-[40px] rounded-lg`} />
                                        <Skeleton className={`bg-[#232F3A] w-[60%] h-[10px]`} />
                                        <Skeleton className={`bg-[#232F3A] w-[80%] h-[10px]`} />
                                    </div>
                                </div>
                            ) : (
                                <Skeleton key={item?._id} className={`rounded-3xl bg-[#0F1117] h-[200px]`}  >
                          
                                </Skeleton>
                            )
                        ))
                    }
                </div>

                <div className='mt-4 w-full'>
                    <div className={`cursor-pointer bg-gradient-to-r from-[#4a2ac0] to-[#5324c0] px-4 py-3 rounded-lg text-sm text-white flex items-center justify-center gap-x-2 ${font.className}`}>
                    </div>
                </div>
            </div>
        )
    )
}

export default PopularArticles