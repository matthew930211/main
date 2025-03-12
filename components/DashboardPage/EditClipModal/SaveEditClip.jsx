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
import { Clock, PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi"
import { FaCheck, FaSave } from "react-icons/fa"

const SaveEditClip = ({ asset_url, thumbnails, public_thumbnail, v, className, isPublicClip, editClip, fetchFreshNewVideos, videos, setVideos, filteredVideos, setFilteredVideos, selectedFilter, videoRenderKey, setVideoRenderKey, isOpenEditClipModal, setIsOpenEditClipModal, popoverOpen, setPopoverOpen, quota_type, generatedCounts }) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const { user, isLoaded, isSignedIn } = useUser();
    const { toast } = useToast();
    const router = useRouter();

    function generateUniqueId() {
        const timestamp = Date.now().toString(36); // Base36 representation of the current timestamp
        const randomPart = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
        return `${timestamp}-${randomPart}`;
    }


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
            const groupId = generateUniqueId();

            const res = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/save-asset`, {
                title: title,
                asset_url: asset_url,
                thumbnail: thumbnail,
                user_id: user?.id,
                quota_type,
                generatedCounts,
                groupId : groupId
            })

            if (res?.data?.success) {
                setTitle("");
                setIsLoading(false);
                setIsOpen(false);
                // fetchFreshNewVideos(res?.data?.data);
                if (!selectedFilter) {
                    setVideos([res?.data?.data, ...videos])
                    setIsOpenEditClipModal(false);
                    setPopoverOpen(false);
                } else {
                    setFilteredVideos([res?.data?.data, ...filteredVideos])
                    setIsOpenEditClipModal(false);
                    setPopoverOpen(false);
                }
                toast({
                    variant: "default",
                    description: "Saved clip to library",
                    action: <div className='!bg-[#000] p-1 flex items-center justify-center rounded-full'>
                        <FaCheck className='!text-[#3faa56]' />
                    </div>
                })


            }
        } catch (err) {
            console.log(err);
            toast({
                variant: "default",
                description: `Failed to save clip`,
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

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60); // Calculate full minutes
        const remainingSeconds = seconds % 60;  // Calculate remaining seconds
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        setThumbnail(public_thumbnail)
    }, [public_thumbnail])

    return (
        (isSignedIn && isLoaded) && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className="space-y-2 mt-4">
                        {/* {
                            !isPublicClip && (
                                <div className="flex items-center text-sm text-white/90 z-10">
                                    <Clock size={14} className="mr-1 z-10" />
                                    <span className="z-10"> {formatTime(v?.duration)}</span>
                                </div>
                            )
                        } */}
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all z-10"

                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Save to Library
                            </Button>
                        </div>
                    </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] md:max-w-[500px] bg-black/95 border border-white/10 backdrop-blur-sm text-white">
                    <DialogHeader>
                        <DialogTitle className="text-neutral-300">Save Short to Library</DialogTitle>
                        {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="w-full items-center gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-200">Title</label>
                                <Input
                                    placeholder="Enter a title for your short"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 w-full"
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className="space-y-2">
                            {
                                !isPublicClip && <label className="text-sm font-medium text-gray-200">Choose Thumbnail</label>
                            }
                            {
                                !public_thumbnail && (
                                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-3 h-[230px]">
                                        {
                                            thumbnails?.length > 0 && thumbnails?.map((item, index) => (
                                                <Image src={`${item}`} width={800} height={800} alt={`${item}`} className={`${thumbnail === item ? "border-2 border-[#4F46E5]/90 rounded-md cursor-pointer h-[100px] lg:h-[150px] w-full object-cover" : "h-[100px] lg:h-[150px] w-full object-cover rounded-lg cursor-pointer border-none"}`} onClick={() => handleSelect(item)} />
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <DialogFooter className={"flex items-center gap-x-2 gap-y-2"}>
                        <button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="border-white/10 text-gray-400 hover:text-white hover:bg-white/10 bg-white/20 text-sm py-2 px-4 rounded transition-all duration-200 ease-in-out"
                        >
                            Cancel
                        </button>
                        <button disabled={isLoading} onClick={() => handleSave()} className={`bg-[#4F46E5] disabled:bg-[#4F46E5] hover:bg-[#4F46E5]/80 !text-white py-2 ${isLoading ? "px-8 py-2" : "px-3"} rounded flex items-center justify-center gap-x-2 border-none text-sm transition-all duration-300 ease-in-out`}>
                            {
                                isLoading ? (<AiOutlineLoading3Quarters className="animate-spin text-lg" />) : (<div className="flex items-center gap-x-2">
                                    <FaSave />
                                    Save to library
                                </div>)
                            }
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    )
}

export default SaveEditClip