import BuilderContainer from '@/components/DashboardPage/CopyClipsPage/BuilderContainer/BuilderContainer';
import SocialVideoLayouts from '@/components/DashboardPage/CopyClipsPage/SocialVideoLayouts/SocialVideoLayouts';
import React from 'react'


const CopyClipsPage = () => {
    return (
        <div>
            <div className='w-[100%] 2xl:w-[70%] mx-auto gap-10 mt-4 mb-10 relative'>
                <div className='mt-4'>
                    <BuilderContainer />
                </div>

                {/* <SocialVideoLayouts /> */}
            </div>
        </div>
    )
}

export default CopyClipsPage