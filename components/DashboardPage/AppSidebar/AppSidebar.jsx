"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { SignedIn, UserButton, UserProfile, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BiHome } from "react-icons/bi"
import { CiGrid42, CiSettings, CiUser } from "react-icons/ci";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { RiAiGenerate, RiScissorsLine } from "react-icons/ri"
import { LuClapperboard, LuCrown, LuExternalLink } from "react-icons/lu";
import { AiOutlineDiscord } from "react-icons/ai"
import { MdOutlineContactSupport, MdOutlineSpaceDashboard, MdPublishedWithChanges } from "react-icons/md"
import { Skeleton } from "@/components/ui/skeleton"
import { Poppins } from "next/font/google"
import { RxCopy } from "react-icons/rx"
import { TbWorld } from "react-icons/tb"
import { PiGlobe } from "react-icons/pi";
import { IoMdShare } from "react-icons/io"
import { HiOutlineUser } from "react-icons/hi"
import { checkSubscription } from "@/lib/actions/checkSubscription"
import axios from "axios"


const poppins = Poppins({
    subsets: ["latin"],
    weight: ['100', '200', '300', '400', '500', '600', '700']
})

export function AppSidebar() {
    const { user, isLoaded } = useUser();


    const [activeLink, setActiveLink] = useState('');
    const pathname = usePathname();
    const [openProfile, setOpenProfile] = useState(false);
    const [proUser, setProUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkUserPlan = async () => {
        if (user) {
            const isPro = await checkSubscription(user?.id);

            if (isPro) {
                setProUser(isPro);
            }
        }
    }

    const handleBillings = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/payments/stripe/manage-billings`, {
                userId: user?.id,
            });

            const data = response?.data;

            if (data?.url) {
                window.location.href = data?.url;
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname])

    useEffect(() => {
        if (user) {
            checkUserPlan()
        }
    }, [user])
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                {/* <SidebarGroup /> */}
                {/* <SidebarGroup /> */}
                <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-x-2">
                        {
                            (isLoaded) ? (
                                // <UserButton />
                                <div className="w-fit bg-gradient-to-tr from-[#5843E7] to-[#723DEB] p-2 rounded-xl">
                                    <HiOutlineUser className="text-white text-[1rem]" />
                                </div>
                            ) : (
                                <div className="flex items-center gap-x-2">
                                    <Skeleton className={`w-[30px] h-[30px] rounded-full bg-gray-500/50`} />
                                    <Skeleton className={`w-[150px] h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                                </div>
                            )
                        }
                        {
                            isLoaded && (
                                <div className="flex items-center text-neutral-100 text-xs">
                                    <SignedIn>
                                        {user?.firstName}{" "}{user?.lastName}
                                    </SignedIn>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className={`px-4 mt-4 flex flex-col gap-y-2 ${poppins.className}`}>

                    {
                        isLoaded ? (
                            <div className="flex flex-col gap-y-0">
                                <small className={`text-neutral-500 px-2 uppercase text-xs ${poppins.className}`}>Main</small>
                                <Link href={"/dashboard"} className={`w-full rounded-lg hover:bg-[#1B1D23] ${activeLink === '/dashboard' && "bg-[#2a2d36] bg-opacity-40 border border-[#2d2e7e] !text-neutral-200"} text-gray-400 text-xs flex items-center gap-x-2 px-5 py-2 transition-all duration-200 ease-in-out outline-none ring-0 border-none mx-0 mt-2`}>
                                    <MdOutlineSpaceDashboard className="text-[1rem]" />
                                    Overview
                                </Link>
                            </div>
                        ) : (
                            <div className="px-2">
                                <Skeleton className={`w-full h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                            </div>
                        )
                    }
                    {
                        isLoaded ? (
                            <div className="mt-2">
                                <small className={`text-neutral-500 px-2 uppercase text-xs ${poppins.className}`}>Generate</small>

                                <div className="flex flex-col gap-y-2 mt-2">
                                    <Link href={"/dashboard/copy-clips"} className={`w-full rounded-lg hover:bg-[#1B1D23] ${activeLink === '/dashboard/copy-clips' && "bg-[#2a2d36] bg-opacity-40 border border-[#2d2e7e] !text-neutral-200"} text-gray-400 text-xs flex items-center justify-between gap-x-2 px-5 py-1 transition-all duration-200 ease-in-out outline-none ring-0 border-none`}>
                                        <div className="flex items-center gap-x-2">
                                            <RxCopy className="text-[1rem]" />
                                            Copy Clips
                                        </div>

                                        <div className="rounded-md bg-[#102F21] text-[#2C9553] text-xs px-2 py-1 font-semibold">Free</div>
                                    </Link>
                                    <Link href={"/dashboard/generate"} className={`w-full rounded-lg hover:bg-[#1B1D23] ${activeLink === '/dashboard/generate' && "bg-[#2a2d36] bg-opacity-40 border border-[#2d2e7e] !text-neutral-200"} text-gray-400 text-xs flex items-center justify-between gap-x-2 px-5 py-1 transition-all duration-200 ease-in-out outline-none ring-0 border-none`}>
                                        <div className="flex items-center gap-x-2">
                                            <RiScissorsLine className="text-[1rem]" />
                                            Generate Clips
                                        </div>

                                        <div className="rounded-md bg-[#1B1B3C] text-[#737de9] text-xs px-2 py-1 font-semibold">Paid</div>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2 pt-3 pb-3">
                                <Skeleton className={`w-[60%] h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                            </div>
                        )
                    }

                    {
                        isLoaded ? (
                            <div className="mt-2">
                                <small className={`text-neutral-500 px-2 uppercase text-xs ${poppins.className}`}>Library</small>
                                <div className="flex flex-col gap-y-2 mt-2">
                                    <Link href={"/dashboard/public"} className={`w-full rounded-lg hover:bg-[#1B1D23] ${activeLink === '/dashboard/public' && "bg-[#2a2d36] bg-opacity-40 border border-[#2d2e7e] !text-neutral-200"} text-gray-400 text-xs flex items-center gap-x-2 px-5 py-2 transition-all duration-200 ease-in-out outline-none ring-0 border-none`}>
                                        <PiGlobe className="text-[1rem]" />
                                        Public
                                    </Link>
                                    <Link href={"/dashboard/private"} className={`w-full rounded-lg hover:bg-[#1B1D23] ${activeLink === '/dashboard/private' && "bg-[#2a2d36] bg-opacity-40 border border-[#2d2e7e] !text-neutral-200"} text-gray-400 text-xs flex items-center gap-x-2 px-5 py-2 transition-all duration-200 ease-in-out outline-none ring-0 border-none`}>
                                        <CiUser className="text-[1rem]" />
                                        Private
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2 pt-0 pb-3">
                                <Skeleton className={`w-[80%] h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                            </div>
                        )
                    }

                    {
                        isLoaded ? (
                            <div className="mt-2">
                                <small className={`text-neutral-500 px-2 uppercase text-xs ${poppins.className}`}>Clips</small>
                                <div className="mt-2">
                                    <Link href={"/dashboard/ready-to-post"} className={`w-full rounded-lg hover:bg-[#1B1D23] ${activeLink === '/dashboard/ready-to-post' && "bg-[#2a2d36] bg-opacity-40 border border-[#2d2e7e] !text-neutral-200"} text-gray-400 text-xs flex items-center gap-x-2 px-5 py-2 transition-all duration-200 ease-in-out outline-none ring-0 border-none`}>
                                        <IoMdShare className="text-[1rem]" />

                                        Ready to Post
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2">
                                <Skeleton className={`w-[50%] h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                            </div>
                        )
                    }
                </div>
            </SidebarContent>
            <SidebarFooter>
                <div className="py-4 px-4">
                    {/* <Link href={"#"} className="flex items-center justify-start gap-x-2 mb-4 rounded-lg bg-[#2d4b7e]/30 border-2 border-b-dashed border-t-0 border-[#2d4b7e]/70 text-xs text-neutral-200 px-4 py-2">
                        <AiOutlineDiscord />
                        Join our Discord
                    </Link> */}

                    <div className="mb-2 px-2">

                        <div className="mt-3 flex flex-col !gap-y-6">
                            {
                                isLoaded ? (
                                    <Link href={"/dashboard/settings"} className="flex items-center gap-x-2 text-xs text-neutral-400">
                                        <CiSettings className="text-[1rem]" />
                                        Settings
                                    </Link>
                                ) : (
                                    <Skeleton className={`w-[150px] h-[7px] rounded-lg bg-gray-500/50 flex-grow`} />
                                )
                            }

                            {
                                isLoaded ? (
                                    <div className="flex items-center gap-x-2 text-xs text-neutral-400 w-full">
                                        {/* <MdOutlineContactSupport className="text-[1rem]" /> */}
                                        <SidebarTrigger className="!text-[1rem]">
                                            Collapse
                                        </SidebarTrigger>

                                    </div>
                                ) : (
                                    <Skeleton className={`w-[120px] h-[7px] rounded-lg bg-gray-500/50 flex-grow`} />
                                )
                            }
                        </div>
                    </div>


                    <div className="mt-4">
                        <div className="bg-[#14171F] w-full rounded-lg flex items-center justify-between px-4 py-2">
                            <div className="text-neutral-400 text-xs w-1/2">
                                Free Plan
                            </div>

                            <Link href={proUser ? "#" : ((!isLoaded ? "#" : "/dashboard/settings/subscription") )} onClick={() => {
                                if (proUser) {
                                    handleBillings()
                                }
                            }} className="w-1/2 flex items-center justify-center gap-x-2 px-2 py-2 text-neutral-200 text-xs bg-gradient-to-br from-[#5141D8] via-[#6E3EEA] to-[#763BEC] rounded-md">
                                <LuCrown />
                                {proUser ? "Basic" : "Upgrade"}
                            </Link>
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
