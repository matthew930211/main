"use client"

import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import { MdVideoLibrary } from 'react-icons/md';
import { BsCameraVideoFill } from "react-icons/bs";

// import { TbBrandElastic } from 'react-icons/tb';

const RecentCreatedVideos = ({ userId, limit }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState(null);
    const [emptyLibrary, setEmptyLibrary] = useState(false);
    const [currentlimit, setCurrentlimit] = useState(limit || 1);

    const fetchVideo = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/get-recent-created-video?user_id=${userId}&&asset_status=DRAFT&&limit=${currentlimit ? currentlimit : 1}`);

            if (response?.data?.success && response?.data?.videos?.length > 0) {
                setVideos(response?.data?.videos)
                console.log(response?.data?.video)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setEmptyLibrary(true);
                setCurrentlimit(1)
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchVideo();
        }
    }, [userId])

    useEffect(() => {
        setCurrentlimit(limit)
    },[limit])
    return (
        <>
            <div className={`grid grid-cols-1 lg:grid-cols-${currentlimit} gap-4`}>
                {
                    videos?.length > 0 && videos?.map((item, i) => (
                        <div className='mt-6' key={i}>
                            <div className='bg-gray-500/0 backdrop-blur-md px-0 py-0 min-h-72 rounded-2xl'>
                                {/* <h3 className='text-neutral-200 !text-sm mb-8 lg:text-xl flex items-center gap-x-2'>
                                <MdVideoLibrary />
                                Your last generated video
                            </h3> */}
                                <div className='mt-0 flex items-center gap-x-4 w-full'>
                                    {
                                        !isLoading && (
                                            <div className='w-full bg-gray-500/20 p-2 rounded-3xl'>
                                                <Video className="h-[300px] rounded-3xl">
                                                    <source src={`${item?.location}`} type='video/mp4' className='' />
                                                </Video>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }




                {
                    (emptyLibrary && !isLoading) && (
                        <div className='py-2 mt-4'>
                            <div className='border-2 border-neutral-500/20 w-full h-[250px] rounded-2xl flex flex-col gap-y-2 items-center justify-center  text-neutral-300/50'>
                                <BsCameraVideoFill className='text-5xl' />
                                <p className='text-sm'>No Recent Videos</p>
                                <p className='text-xs'>Your recent creation will appear here</p>
                            </div>
                        </div>
                    )
                }

            </div>

           { isLoading && (
            <div className={`grid grid-cols-1 lg:grid-cols-${currentlimit} gap-y-4 w-full mt-6 gap-4`}>
                {
                    Array.from(new Array(limit))?.map((item, i) => (
                        <Skeleton key={i} className={`w-full h-[300px] bg-gray-500/20 flex items-center justify-center`}>
                            <Skeleton className={"bg-gray-400/40 w-[50px] h-[50px] rounded-lg"} />
                        </Skeleton>
                    ))
                }
                {/* <Skeleton className={'bg-gray-500 w-full h-[40px] py-2'} /> */}
            </div>
            )}
        </>

    )
}

export default RecentCreatedVideos