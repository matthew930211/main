"use client"

import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IoFilter, IoSearchSharp } from 'react-icons/io5'
import { FaArrowDownWideShort, FaArrowUpWideShort } from 'react-icons/fa6'
import { MdOutlinePhotoSizeSelectLarge, MdOutlinePhotoSizeSelectSmall } from 'react-icons/md'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const VideosFilter = ({ userId, filterPage, setFilterPage, totalVideos, setTotalVideos, isFiltering, setIsFiltering, selectedFilter, setSelectedFilter, filteredVideos, setFilteredVideos, filteredVideoUrls, setFilteredVideoUrls, filteringFunction, handleSearch, searchQuery, setSearchQuery, currentVideos, setCurrentVideosNull, isSearching }) => {
    const limit = 12;
    const { toast } = useToast();


    const handleFilterChange = (filter) => {
        setFilterPage(1);
        setSelectedFilter(filter);
    };



    return (
        <div className='mt-6 mb-12'>
            <div className='flex items-center gap-x-2 lg:gap-x-4'>
                <form onSubmit={handleSearch} className='flex items-center gap-x-0 border-none border-[#4F46E5]/80 px-0 grow rounded-lg'>
                    <div className='!bg-[#333]/10 pl-4 pr-4 py-3 rounded-l-lg'>
                        <IoSearchSharp className='text-[#FFFF]' />
                    </div>

                    <input
                        type='text'
                        placeholder='Search'
                        className='!bg-[#333]/5 text-neutral-200 placeholder:text-[#fff]/70 focus:!ring-0 !outline-none text-sm grow py-2.5 pl-1 rounded-r-lg indent-2'
                        value={searchQuery}
                        disabled={isSearching}
                        onChange={(e) => {
                            if (e.target.value?.length === 0) {
                                // setPublicAssets(currentAssets)
                                setCurrentVideosNull();
                            }
                            setSearchQuery(e.target.value)
                            // handleSearch(e.target.value)
                        }}
                    />
                </form>

                <Select onValueChange={(value) => handleFilterChange(value)} className="">
                    <SelectTrigger className="w-[180px] text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 !bg-[#4F46E5] !drop-shadow-none py-4 px-4 rounded-md">
                        <div className='flex items-center gap-x-2 py-2'>
                            <IoFilter />
                            <SelectValue className='' placeholder="Filter" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="LATEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <FaArrowUpWideShort /> */}

                                Latest
                            </div>
                        </SelectItem>
                        <SelectItem className='' value="OLDEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <FaArrowDownWideShort /> */}
                                Oldest
                            </div>
                        </SelectItem>
                        <SelectItem className='' value="SHORTEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <MdOutlinePhotoSizeSelectSmall /> */}
                                Shortest
                            </div>
                        </SelectItem>
                        <SelectItem className='' value="LONGEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <MdOutlinePhotoSizeSelectLarge /> */}
                                Longest
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                {
                    isSearching && (
                        <div className="w-full flex items-center justify-center mt-8">
                            <AiOutlineLoading3Quarters className='text-3xl text-[#4F46E5] animate-spin' />
                        </div>
                    )}
            </div>
        </div>
    )
}

export default VideosFilter