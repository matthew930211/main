"use client"

import React from 'react'
import { FiLayout } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa6'
import { FaTiktok } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';

const SocialVideoLayouts = () => {
    const { user } = useUser();

    return (
        user && (
            <div className='mt-16'>
                <div className='flex items-center gap-x-2 text-[#FDFFFF] text-xl'>
                    <FiLayout className='text-[#8F92F3] text-2xl' />
                    Templates
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4 w-full mt-6'>
                    <label
                        className="mt-0 flex items-center justify-start w-full min-h-28 border-2 border-gray-300/5 rounded-2xl cursor-pointer bg-[#080A0B] hover:bg-[#07080A] relative transition-all duration-300 ease-in-out px-10"
                    >
                        <div className="flex items-center justify-start gap-x-4">
                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <FiLayout className='text-[#8F92F3] text-2xl' />
                            </div>

                            <div>
                                <h4 className='text-md text-[#FDFFFF]'>
                                    YouTube Short
                                </h4>
                                <p className='text-[#4E545A] text-sm'>Vertical 9:36 format</p>
                            </div>

                        </div>
                    </label>

                    <label
                        className="mt-0 flex items-center justify-start w-full min-h-28 border-2 border-gray-300/5 rounded-2xl cursor-pointer bg-[#080A0B] hover:bg-[#07080A] relative transition-all duration-300 ease-in-out px-10"
                    >
                        <div className="flex items-center justify-start gap-x-4">
                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <FaInstagram className='text-[#8F92F3] text-2xl' />
                            </div>

                            <div>
                                <h4 className='text-md text-[#FDFFFF]'>
                                    Instagram Reel
                                </h4>
                                <p className='text-[#4E545A] text-sm'>Vertical 9:36 format</p>
                            </div>

                        </div>
                    </label>

                    <label
                        className="mt-0 flex items-center justify-start w-full min-h-28 border-2 border-gray-300/5 rounded-2xl cursor-pointer bg-[#080A0B] hover:bg-[#07080A] relative transition-all duration-300 ease-in-out px-10"
                    >
                        <div className="flex items-center justify-start gap-x-4">
                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <FaTiktok className='text-[#8F92F3] text-2xl' />
                            </div>

                            <div>
                                <h4 className='text-md text-[#FDFFFF]'>
                                    TikTok Video
                                </h4>
                                <p className='text-[#4E545A] text-sm'>Vertical 9:36 format</p>
                            </div>

                        </div>
                    </label>
                </div>
            </div>
        )
    )
}

export default SocialVideoLayouts