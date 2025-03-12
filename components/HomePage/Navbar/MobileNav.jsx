"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Asterisk, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { MdSlowMotionVideo } from "react-icons/md"

export function MobileNav() {
    const [isSheetOpen, setSheetOpen] = useState(false);
    return (
        <Sheet open={isSheetOpen} onClose={() => setSheetOpen(false)} onOpenChange={() => setSheetOpen(!isSheetOpen)}>
            {/* <SheetTrigger asChild>
                <Button variant="none" className='bg-gradient-to-b from-[#445c73] via-[#1E1F40] to-[#445c73] text-white px-5 py-3 rounded-full flex md:hidden items-center gap-x-2'>
                    <Menu />
                </Button>
            </SheetTrigger> */}

            <button className='bg-gradient-to-b from-[#445c73] via-[#1E1F40] to-[#445c73] text-white px-5 py-1 rounded-full flex lg:hidden items-center gap-x-2' onClick={() => setSheetOpen(true)}>     <Menu /></button>

            <SheetContent side="left" className="bg-[#13203f] border-none">
                <SheetHeader>
                    <SheetTitle>

                    </SheetTitle>
                    <SheetDescription>

                    </SheetDescription>

                    <Link href={"/"} className='flex items-start text-[#c1dcf1] gap-x-2 w-fit'>
                        <Image src={"/assets/images/logo3.png"} alt='InstaClip' width={120} height={120} className='w-[30px] h-[30px]' />

                        <div className='flex flex-col gap-y-0'>
                            <span className='text-2xl lg:text-xl'>InstaClip</span>
                            {/* <span className='text-xs text-gray-500'>Make Clips EZ</span> */}
                        </div>
                    </Link>

                    <div className="flex flex-col gap-y-4 items-start pt-10 px-4">
                        <Link href="/" onClick={() => setSheetOpen(false)} className="text-2xl text-[#c1dcf1]">HOME</Link>
                        <Link href="/works" className="text-2xl text-[#c1dcf1]">FEATURES</Link>
                        <Link href="/about" className="text-2xl text-[#c1dcf1]">ABOUT</Link>
                        <SheetTrigger asChild>
                            <Button onClick={() => setSheetOpen(false)} variant="none" className="p-0 font-normal">
                                <Link href="/#pricing" className="text-2xl text-[#c1dcf1]">
                                    PRICING
                                </Link>
                            </Button>
                        </SheetTrigger>
                        <Button onClick={() => setSheetOpen(false)} variant="none" className="p-0 font-normal">
                            <Link href="/#faqs" className="text-2xl text-[#c1dcf1]">
                                FAQs
                            </Link>
                        </Button>
                    </div>
                </SheetHeader>

                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}
