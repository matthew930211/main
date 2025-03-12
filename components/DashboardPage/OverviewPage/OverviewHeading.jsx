"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { Orbitron, Poppins } from 'next/font/google'
import Image from 'next/image'
import { MdVerified } from 'react-icons/md'

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

const OverviewHeading = () => {
  const { user } = useUser();
  const [localStatus, setLocalStatus] = useState('');



  function getTimeOfDay() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      console.log("local time : ", "Morning")
      setLocalStatus("MORNING")
    } else if (hour >= 12 && hour < 17) {
      console.log("local time : ", "AFTERNOON")
      setLocalStatus("AFTERNOON")
    } else if (hour >= 17 && hour < 21) {
      console.log("local time : ", "EVENING")
      setLocalStatus("EVENING")
    } else {
      console.log("local time : ", "NIGHT")
      setLocalStatus("NIGHT")
    }
  }

  useEffect(() => {
    getTimeOfDay();
  }, [])

  return (
    <div>
      {
        user && (
          <div>
            <h1 className={`flex items-center flex-wrap gap-x-2 font-semibold bg-gradient-to-r bg-clip-text from-[#728ee9] via-purple-700 to-[#30a4da] text-transparent text-3xl md:text-2xl pt-4 pb-2 border-b border-[#162845]/50 ${font.className}`}>
              <span className='text-neutral-100 leading-normal'>
                {
                  localStatus === "MORNING" && (`Good Morning! Let's kickstart your day 🌅`)
                }
                {
                  localStatus === "AFTERNOON" && (`Good Afternoon! Here's what's happening 🕶️`)
                }
                {
                  localStatus === "EVENING" && (`Evening Overview: Here's what's left 📋`)
                }
                {
                  localStatus === "NIGHT" && (`Late Night Hustle? Here's what's up 🌙`)
                }
              </span>
              {/* <span>{user?.firstName} {user?.lastName}</span>
            <span className='text-neutral-300'>!</span> */}
            </h1>

            <div className='flex items-center gap-x-2'>
              <Image src={`${user?.imageUrl}`} width={120} height={120} alt={`${user?.firstName}`} className='w-[60px] h-[60px] rounded-full' />

              <div className='flex items-center gap-x-2'>
                <p className={`${font.className} text-neutral-200 text-lg`}>{user?.firstName + " " +  user?.lastName}</p>
                <MdVerified className='text-blue-500' />

              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default OverviewHeading