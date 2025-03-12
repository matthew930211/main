import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { FaXTwitter } from 'react-icons/fa6'
import { SiDiscord } from 'react-icons/si'
// import { Button } from '../ui/moving-border'

const Footer = () => {
    return (
        // <Button>
        <div className='bg-[#020E1A]'>
            <div className='flex !items-start !justify-between w-full max-w-6xl mx-auto py-6 lg:py-8 flex-wrap lg:flex-nowrap px-6 lg:px-10 gap-y-8 gap-x-4'>
                <div className='w-full lg:w-1/4 flex flex-col items-start'>
                    <Link href={"/"} className='flex items-start text-[#c1dcf1] gap-x-2'>
                        <Image src={"/assets/images/logo3.png"} alt='InstaClip' width={120} height={120} className='w-[30px] h-[30px]' />

                        <div className='flex flex-col gap-y-0'>
                            <span className='text-2xl lg:text-xl'>InstaClip</span>
                            {/* <span className='text-xs text-gray-500'>Make Clips EZ</span> */}
                        </div>
                    </Link>

                    <div>
                        <p className='text-gray-400 mt-4 !text-left'>
                            2000+ Our clients are Using InstaClip Around the World
                        </p>
                    </div>


                </div>

                <div className='flex justify-between gap-x-2 gap-y-4 w-full lg:w-2/4 flex-wrap md:flex-nowrap'>
                    <div className='w-full lg:w-1/3'>
                        <h4 className='font-semibold text-[#c1dcf1] text-xl uppercase !text-left'>Links</h4>

                        <div className='flex flex-col gap-y-2 mt-4'>
                            <Link href={"/"} className='text-gray-400 !text-left'>Home</Link>
                            <Link href={"/"} className='text-gray-400 !text-left'>Features</Link>
                            <Link href={"/"} className='text-gray-400 !text-left'>Pricing</Link>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/3'>
                        <h4 className='font-semibold text-[#c1dcf1] text-xl uppercase !text-left'>Socials</h4>

                        <div className='flex flex-col gap-y-2 mt-4'>

                            <Link href={"/"} className='text-gray-400 !text-left'>Discord</Link>
                            <Link href={"/"} className='text-gray-400 !text-left'>YouTube</Link>
                            <Link href={"/"} className='text-gray-400 !text-left'>TikTok</Link>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/3'>
                        <h4 className='font-semibold text-[#c1dcf1] text-xl uppercase !text-left'>Legal</h4>

                        <div className='flex flex-col gap-y-2 mt-4'>
                            <Link href={"/"} className='text-gray-400 !text-left'>Privacy Policy</Link>
                            <Link href={"/"} className='text-gray-400 !text-left'>Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </Button>
    )
}

export default Footer