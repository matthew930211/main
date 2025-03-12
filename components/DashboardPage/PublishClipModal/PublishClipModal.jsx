"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi"
import { FaSave } from "react-icons/fa"
import { FaCheck } from "react-icons/fa6"
import { MdPublish } from "react-icons/md"

const PublishClipModal = ({ asset_url, thumbnails, draftThumnail, className }) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);

    const { user, isLoaded, isSignedIn } = useUser();
    const { toast } = useToast();


    const handleSave = async (e) => {
        if (!title) {
            toast({
                variant: "default",
                description: `Please create a title for your clip`,
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            return;
        }

        if (!thumbnail) {
            toast({
                variant: "default",
                description: `Please select a thumbnail`,
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/publish-asset`, {
                title: title,
                asset_url: asset_url,
                user_id: user?.id,
                thumbnail: thumbnail
            })

            if (res?.data?.success) {
                setTitle("");
                setIsLoading(false);
                // setIsOpen(false);
                toast({
                    variant: "default",
                    description: "Clip published",
                    action: <div className='!bg-[#3faa56] p-1 flex items-center justify-center rounded-full'>
                        <FaCheck className='!text-[#FDFFFF]' />
                    </div>
                })
                setIsOpen(false);
            }
        } catch (err) {
            console.log(err);
            toast({
                variant: "default",
                description: `${err?.response?.data?.message}`,
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsLoading(false);
        }


    }

    const handleSelect = (url) => {
        setThumbnail(url);
    }

    useEffect(() => {
        setThumbnail(draftThumnail)
    }, [draftThumnail])
    return (
        (isSignedIn && isLoaded) && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className={cn("w-full grow mt-2 bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all py-2 px-3 rounded flex items-center justify-center gap-x-2 border-none", className)}>
                        <MdPublish />

                        Publish Clip
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] md:max-w-[500px] bg-black/95 border border-white/10 backdrop-blur-sm text-white group">
                    <DialogHeader>
                        <DialogTitle className="text-neutral-300 text-start">Create Title For Your Published Clip</DialogTitle>
                        {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center gap-4">
                            <Input
                                placeholder="Enter a title for your short"
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 w-full"
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        {
                            !draftThumnail && (
                                <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-3 h-[230px] mt-4">
                                    {
                                        thumbnails?.length > 0 && thumbnails?.map((item, index) => (
                                            <Image src={`${item}`} width={800} height={800} alt={`${item}`} className={`${thumbnail === item ? "border-2 border-[#4F46E5]/90 rounded cursor-pointer h-[100px] lg:h-[150px] w-full object-cover" : "h-[100px] lg:h-[150px] w-full object-cover rounded cursor-pointer border-none"}`} onClick={() => handleSelect(item)} />
                                        ))
                                    }
                                </div>
                            )
                        }

                    </div>
                    <DialogFooter>
                        <button disabled={isLoading} onClick={() => handleSave()} className={`bg-[#4F46E5] disabled:bg-[#4F46E5] hover:bg-[#4F46E5]/80 !text-white py-2 ${isLoading ? "px-8 py-2" : "px-3"} rounded flex items-center justify-center gap-x-2 border-none text-sm`}>
                            {
                                isLoading ? (<AiOutlineLoading3Quarters className="animate-spin text-lg" />) : (<div className="flex items-center gap-x-2">
                                    <MdPublish />
                                    Publish Clip
                                </div>)
                            }
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    )
}

export default PublishClipModal