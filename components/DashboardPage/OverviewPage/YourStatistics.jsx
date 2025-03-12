"use client"

import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Orbitron, Poppins } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaSquarePollVertical } from 'react-icons/fa6'
import { IoIosLink } from 'react-icons/io'
import { MdOutlinePayment, MdOutlinePermMedia } from 'react-icons/md'
import { GiFluffyFlame } from "react-icons/gi";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
})

const YourStatistics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, isLoaded } = useUser();
    const [stats, setStats] = useState(null);

    const fetchUserStats = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/users/get-user-stats?user_id=${user?.id}`);

            if (response?.data?.success) {
                setStats({
                    totalVideos: response?.data?.totalVideos
                })
                setIsLoading(false);
            }
        } catch (err) {
            console.log("erorr fetching stats : ", err)
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserStats();
        }
    }, [user])

    return (
        <div className={`mt-4 bg-[#0F1117] relative flex px-4 py-4 min-h-[150px] xl:min-h-[340px] ${font.className} border-dashed border-neutral-500/40 border-2 rounded-3xl`}>
            <div className='flex flex-col items-start gap-y-3 w-full relative'>
                {/* <GiFluffyFlame className='text-5xl text-neutral-200 absolute top-3 right-2 -rotate-90 opacity-20' /> */}

                <div className='w-full flex items-center justify-start pl-4'>
                    <div className='flex items-center justify-center flex-col bg-gray-500/20 rounded-full w-[100px] 2xl:w-[130px] h-[100px] 2xl:h-[130px]'>
                        {
                            (isLoaded && !isLoading) && (
                                // <Image src={`${user?.imageUrl}`} width={200} height={200} alt={`${user?.firstName}`} className='rounded-full w-[120px] h-[120px]' />
                                <FaSquarePollVertical className='text-5xl text-[#603ce2]' />
                            )
                        }
                    </div>
                </div>


                {
                    isLoading ? (
                        <div className='flex items-center justify-start flex-wrap gap-4 w-full px-4 mt-4'>
                            <div className='flex items-center justify-center gap-y-2 gap-x-2'>
                                <Skeleton className={`w-[20px] h-[20px] rounded-full bg-gray-500/50`} />
                                <Skeleton className={`w-[150px] h-[20px] rounded-lg bg-gray-500/50`} />
                            </div>
                            <div className='flex items-center justify-center gap-y-2 gap-x-2'>
                                <Skeleton className={`w-[20px] h-[20px] rounded-full bg-gray-500/50`} />
                                <Skeleton className={`w-[150px] h-[20px] rounded-lg bg-gray-500/50`} />
                            </div>
                            <div className='flex items-center justify-center gap-y-2 gap-x-2'>
                                <Skeleton className={`w-[20px] h-[20px] rounded-full bg-gray-500/50`} />
                                <Skeleton className={`w-[150px] h-[20px] rounded-lg bg-gray-500/50`} />
                            </div>

                        </div>
                    ) : (
                        <div className='flex items-start justify-center flex-wrap gap-4 w-full flex-col px-4 mt-4'>
                            <div className='flex items-center justify-center gap-x-2'>
                                <MdOutlinePermMedia className='text-[#603ce2]' />
                                <p className='text-sm text-neutral-300 text-center'>Assets Created:</p>
                                <p className='text-neutral-300 font-semibold text-sm xl:text-sm text-center'>{stats?.totalVideos}</p>

                            </div>
                            <div className='flex items-center justify-center gap-x-2'>
                                <IoIosLink className='text-[#603ce2]' />
                                <p className='text-sm text-neutral-300 text-center'>Connected Accounts:</p>
                                <p className='text-neutral-300 font-semibold text-sm xl:text-sm text-center'>1</p>

                            </div>
                            <div className='flex items-center justify-center gap-x-2'>
                                <MdOutlinePayment className='text-[#603ce2]' />
                                <p className='text-sm text-neutral-300 text-center'>Your Plan:</p>
                                <p className='text-neutral-300 font-semibold text-sm xl:text-sm text-center'>Free</p>

                            </div>

                        </div >
                    )
                }
            </div >

            {/* <div className='absolute top-0 left-0 right-0 bottom-0 rounded-xl blur-0 bg-[#0F1117]'>

            </div> */}
        </div >
    )
}

export default YourStatistics