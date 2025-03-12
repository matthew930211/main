"use client"

import React from 'react'
import ImportAssetModal from './ImportAssetModal'
import { assets } from '@/data/community_creations'
import { useUser } from '@clerk/nextjs'

const FeaturedAssets = () => {
    const { user, isLoaded } = useUser();

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 mt-6'>
            {
                (assets?.length > 0 && isLoaded) ? assets?.slice(0,4)?.map((item, index) => (
                    <ImportAssetModal key={index} title={item?.title} url={item?.url} cover={item?.cover} category={item?.category} source={item?.source} id={item?.id} />
                )) : (
                    Array.from(new Array(4))?.map((item, i) => (
                        <div key={i} className='h-[350px] bg-[#0F1117] rounded-2xl'>
                        </div>
                    ))
                )
            }


        </div>
    )
}

export default FeaturedAssets