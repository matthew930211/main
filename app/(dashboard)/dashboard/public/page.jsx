import PublicAssetsContainer from '@/components/DashboardPage/PublicPage/PublicAssetsContainer'
import { Film } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='w-[90%] lg:w-full mx-auto'>
            <div className='border-b border-[#162845]/50 pb-4 flex flex-col gap-y-2'>
                <h1 className='flex items-center gap-x-2 font-semibold text-[#FDFFFF] text-2xl md:text-3xl lg:text-4xl pt-6 pb-0 flex-wrap md:flex-nowrap mb-0'>
                    <Film size={40} className='text-[#FDFFFF] text-3xl lg:text-3xl xl:text-4xl' />
                    Public Library
                </h1>
                <p className="text-gray-400">Explore our varity of clips that you can easily save to your private library</p>
            </div>

            <div>
                <PublicAssetsContainer />
            </div>
        </div>
    )
}

export default page