"use client"

import React, { useEffect, useState } from 'react'
import { LuClapperboard } from 'react-icons/lu'
import { DiYii } from "react-icons/di";
import { IoIosLink } from 'react-icons/io';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import RecentCreatedVideos from '../RecentCreatedVideos/RecentCreatedVideos';

const OverviewStats = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState(null);

    const { user } = useUser();

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
        user && (
            isLoading ? (
                <>
                    <div className='mt-14 flex items-center gap-x-4 gap-y-2 flex-wrap xl:flex-nowrap'>
                        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-[#FEAEB0] backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-x-3 gap-y-2 text-neutral-950'>
                            <Skeleton className="p-4 rounded-md bg-gray-200/50" />

                            <div className='flex flex-col items-center sm:items-start gap-y-2'>
                                <Skeleton className="py-2 w-full rounded-md bg-gray-200/50" />
                                <Skeleton className="py-2 w-[100px] rounded-md bg-gray-200/50" />
                            </div>
                        </div>

                        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-[#C6D6FE] backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-x-3 gap-y-2 text-neutral-950'>
                            <Skeleton className="p-4 rounded-md bg-gray-500/50" />

                            <div className='flex flex-col items-center sm:items-start gap-y-2'>
                                <Skeleton className="py-2 w-full rounded-md bg-gray-500/50" />
                                <Skeleton className="py-2 w-[100px] rounded-md bg-gray-500/50" />
                            </div>
                        </div>
                        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-[#EDF58F] backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-x-3 gap-y-2 text-neutral-950'>
                            <Skeleton className="p-4 rounded-md bg-gray-500/50" />

                            <div className='flex flex-col items-center sm:items-start gap-y-2'>
                                <Skeleton className="py-2 w-full rounded-md bg-gray-500/50" />
                                <Skeleton className="py-2 w-[100px] rounded-md bg-gray-500/50" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='mt-14 flex items-center gap-x-4 gap-y-2 flex-wrap xl:flex-nowrap'>
                        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-[#FEAEB0] backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-x-3 text-neutral-950'>
                            <LuClapperboard className="text-4xl" />

                            <div className='flex flex-col items-center sm:items-start gap-y-0'>
                                <span className='text-sm'>Videos Generated</span>
                                <span className='text-lg'>{stats?.totalVideos} Videos</span>
                            </div>
                        </div>

                        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-[#C6D6FE] backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-x-3 text-neutral-950'>
                            <IoIosLink className="text-4xl" />

                            <div className='flex flex-col items-center sm:items-start gap-y-0'>
                                <span className='text-sm'>Linked Email Accounts</span>
                                <span className='text-lg'>{user?.emailAddresses[0].emailAddress}</span>
                            </div>
                        </div>
                        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-[#EDF58F] backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-x-3 text-neutral-950'>
                            <DiYii className="text-4xl" />

                            <div className='flex flex-col items-center sm:items-start gap-y-0'>
                                <span className='text-sm'>Your Plan</span>
                                <span className='text-lg font-semibold'>Free</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-[50%] mt-10'>
                        <RecentCreatedVideos userId={user?.id} />
                    </div>
                </>
            )
        )
    )
}

export default OverviewStats