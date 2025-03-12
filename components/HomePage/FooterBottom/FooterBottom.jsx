import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";
import { BiLogoInstagramAlt } from "react-icons/bi";
import Link from 'next/link';

const FooterBottom = () => {
    return (
        <footer className='bg-[#020E1A] border-t-2 border-[#202341]/50 w-full '>
            <div className='flex items-center justify-between w-full max-w-6xl mx-auto py-6 lg:py-4 flex-wrap lg:flex-nowrap px-6 lg:px-10 gap-y-4 gap-x-4'>
                <div className='flex items-center gap-x-4'>
                    <Link href={"/"} className='rounded-full p-2 bg-gradient-to-t from-[#5a8db9] hover:from-[#416686] transition-all duration-300 ease-in-out'>
                        <FaXTwitter className='text-[#c1dcf1] text-lg' />
                    </Link>

                    <Link href={"/"} className='rounded-full p-2 bg-gradient-to-t from-[#5a8db9] hover:from-[#416686] transition-all duration-300 ease-in-out'>
                        <SiDiscord className='text-[#c1dcf1] text-lg' />
                    </Link>

                    <Link href={"/"} className='rounded-full p-2 bg-gradient-to-t from-[#5a8db9] hover:from-[#416686] transition-all duration-300 ease-in-out'>
                        <BiLogoInstagramAlt className='text-[#c1dcf1] text-lg' />
                    </Link>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='text-neutral-200'>Copyright &copy; 2024</span>
                    <span className='text-neutral-300 text-glow-footer-logo underline'>InstaClip</span>
                </div>
            </div>
        </footer>
    )
}

export default FooterBottom