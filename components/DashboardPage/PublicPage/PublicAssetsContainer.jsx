"use client"

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { assets } from '@/data/community_creations'
import ImportAssetModal from '../GeneratePage/UploadVideo/ImportAssetModal';
import { IoSearchSharp } from 'react-icons/io5';

const PublicAssetsContainer = () => {
    const { user, isLoaded } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState("");
    const [publicAssets, setPublicAssets] = useState([]);
    const [currentAssets, setCurrentAssets] = useState([]);

    const handleSearch = async (query) => {
        try {
            const regex = new RegExp(query, "i"); // Create a case-insensitive regex
            const filteredArray = assets.filter(asset => regex.test(asset.title));
            setCurrentAssets(assets);
            setPublicAssets(filteredArray);
        } catch (e) {
            console.error("Invalid regex pattern:", e.message);
            setCurrentAssets(assets);
            setPublicAssets([]); // Return an empty array if regex fails
        }
    }

    useEffect(() => {
        setPublicAssets(assets);
    }, [assets])

    return (
        <div>
            <div className='w-full flex items-center gap-x-4 justify-end mt-10 mb-10'>
                <div className='flex items-center gap-x-2 border-b border-neutral-400/80 pb-2'>
                    <IoSearchSharp className='text-neutral-400/80' />
                    <input
                        type='text'
                        placeholder='Search'
                        className='bg-transparent text-neutral-400 placeholder:text-neutral-400/80 focus:!ring-0 !outline-none'
                        value={searchQuery}
                        onChange={(e) => {
                            if (e.target.value?.length === 0) {
                                setPublicAssets(currentAssets)
                            }
                            setSearchQuery(e.target.value)
                            handleSearch(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-4 mt-6 mb-6'>
                {
                    (publicAssets?.length > 0 && isLoaded) && publicAssets?.map((item, index) => (
                        <ImportAssetModal key={index} title={item?.title} url={item?.url} cover={item?.cover} category={item?.category} source={item?.source} id={item?.id} />
                    ))
                }

                {
                    !isLoaded ? Array.from(new Array(18))?.map((item, i) => (
                        <div key={i} className='h-[350px] bg-[#0F1117] rounded-2xl'>
                        </div>
                    )) : ((isLoaded && publicAssets?.length === 0) && (
                        <div className=''>
                            <p className='text-neutral-200 text-xl'>No Clips Found</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default PublicAssetsContainer