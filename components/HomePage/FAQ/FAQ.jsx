import Link from 'next/link'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { RiSparklingFill } from 'react-icons/ri'
import { FAQAccordion } from './FAQAccordion'

const FAQ = () => {
    return (
        <div className='mt-40 lg:mb-24 scroll-mt-20' id='faqs'>
            <div className='w-full lg:max-w-7xl mx-auto p-10 min-h-[50vh] bg-transparent'>
                <div className='flex items-start justify-between flex-wrap lg:flex-nowrap gap-y-8'>
                    <div className='w-full lg:w-4/6'>
                        <div>
                            <div className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 border border-[#47BBE9]/30 text-sm bg-violet-300/10 text-[#47BBE9] py-2 rounded-full mb-6 gap-x-1">
                                <RiSparklingFill className="text-[#c1dcf1] text-xs" />
                                <span className="text-[#c1dcf1] text-xs">FAQs</span>
                            </div>
                            <p className='text-5xl text-[#85c4f3]'>Frequently <span className='text-[#47bbe9]'>Asked</span></p>
                            <p className='text-[#c1dcf1] text-5xl'>Questions</p>
                        </div>
                    </div>

                    <div className='w-full lg:w-2/6 flex flex-col gap-y-4'>
                        <div className='text-[#c1dcf1]'>
                            InstaClip lets you create viral short-form videos for your audience in seconds, using AI. No more hours spent editing.
                        </div>
                        {/* <Link href={"/"} className='w-fit bg-gradient-to-b from-[#76aee4]/60 via-transparent to-[#387ebe]/60 border border-white/10 text-[#c1dcf1] px-5 py-2 rounded-lg hidden md:flex items-center gap-x-2'>
                           
                        </Link> */}

                        <Link href={"/sign-up"} className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 border border-[#47BBE9]/30 text-sm bg-violet-300/10 text-[#47BBE9] py-2 hover:bg-[#47BBE9]/30">
                            Get Started Now
                            <IoIosArrowForward />
                        </Link>
                    </div>
                </div>

                <FAQAccordion />
            </div>
        </div>
    )
}

export default FAQ