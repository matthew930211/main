'use cache'
'use client'
import FeaturedAssets from '@/components/DashboardPage/GeneratePage/UploadVideo/FeaturedAssets'
import OverviewHeading from '@/components/DashboardPage/OverviewPage/OverviewHeading'
import OverviewStats from '@/components/DashboardPage/OverviewPage/OverviewStats'
import PopularArticles from '@/components/DashboardPage/OverviewPage/PopularArticles'
import YourStatistics from '@/components/DashboardPage/OverviewPage/YourStatistics'
import RecentCreatedVideos from '@/components/DashboardPage/RecentCreatedVideos/RecentCreatedVideos'
import { useUser } from '@clerk/nextjs'
import { Orbitron, Poppins } from 'next/font/google'
// import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { FaSquarePollVertical } from 'react-icons/fa6'

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})


const DashboardPage = () => {
  // const { userId } = await auth();
  const { user, isLoaded } = useUser();

  return (
    <div className='pt-6'>
      {/* <OverviewHeading /> */}
      {/* <OverviewStats /> */}
      <div className='flex w-full flex-wrap xl:flex-nowrap gap-x-4 gap-y-6'>
        <div className='w-full xl:w-9/12 min-h-screen mb-4'>
          <div className='flex gap-x-10 gap-y-4 flex-wrap xl:flex-nowrap'>
            <div className='w-full'>
              <div style={{
                background: `${isLoaded ? `url("/assets/images/dashboard-cover-1.jpg") no-repeat rgba(0,0,0,0.4)` : "#0F1117"}`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "darken"
              }} className='rounded-2xl px-6 py-4 h-[400px] flex items-end bg-gray-500/50'>
                <OverviewHeading />
              </div>
            </div>
          </div>

          <div className='mt-12'>
            <div className=''>
              <h4 className={`bg-[#4a2ac0]/50 text-white text-xs px-4 py-1 rounded-full w-fit ${font.className}`}>Most used by the community</h4>
            </div>
            <FeaturedAssets />
          </div>

          <div className='mt-12'>
            <div className=''>
              <h4 className={`bg-[#4a2ac0]/50 text-white text-xs px-4 py-1 rounded-full w-fit ${font.className}`}>Your recent activity</h4>
            </div>

            <div>
              <RecentCreatedVideos userId={user?.id} limit={4} />
            </div>
          </div>
        </div>

        <div className='w-full xl:w-3/12'>
          <PopularArticles />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage