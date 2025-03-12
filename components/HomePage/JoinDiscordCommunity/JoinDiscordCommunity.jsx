import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

const JoinDiscordCommunity = () => {
    const people = [
        {
            id: 1,
            name: "John Doe",
            designation: "Software Engineer",
            image:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
            id: 2,
            name: "Robert Johnson",
            designation: "Product Manager",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 3,
            name: "Jane Smith",
            designation: "Data Scientist",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 4,
            name: "Emily Davis",
            designation: "UX Designer",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
    ];
    return (
        <div className='py-16 px-10'>
            <div className='max-w-3xl lg:max-w-7xl mx-auto rounded-2xl shadow-xl shadow-[#30A4DA] flex flex-wrap xl:flex-nowrap items-center justify-center lg:justify-center xl:justify-between bg-gradient-to-r from-[#30A4DA] to-[#754bf3] px-8 lg:px-10 2xl:px-16 py-6 lg:py-10 2xl:py-6 gap-y-4 gap-x-4'>
                <div>
                    <h2 className='text-white text-2xl lg:text-3xl font-semibold text-center xl:text-left'>Join our discord community</h2>
                    <p className='text-neutral-200 w-full md:w-[50%] xl:w-[70%] mx-auto xl:mx-0 mt-4 text-center xl:text-left'>
                        Be a part of a community with over 10,000 members and get the latest updates, support, and more.
                    </p>
                </div>
                <Image src={"/assets/images/bg-shape-1.png"} alt="shape" width={400} height={400} className='w-[290px] h-[200px] hidden xl:inline-block -ml-40 object-cover' />
                <div className='flex flex-col gap-y-4'>
                    <div className="flex flex-row items-center justify-center w-full">
                        <AnimatedTooltip items={people} />
                    </div>
                    <Link href={"/"} className='text-black text-lg xl:text-sm bg-white rounded-lg px-6 py-3 font-semibold'>
                        Join Now Today Free
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default JoinDiscordCommunity