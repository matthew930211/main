import React from 'react'
import { UserProfile } from '@clerk/nextjs'
import { CiSettings } from 'react-icons/ci'
import Link from 'next/link'

const SettingsPage = () => {
    return (
        <div>
            <div className='w-full'>

                <div className='w-full xl:w-full'>
                    <UserProfile className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default SettingsPage