"use client"

import React, { useState } from 'react'
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
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const VideoPlayerModal = ({ v }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white hover:scale-105 transition-all shadow-xl pointer-events-auto z-50 flex items-center justify-center"
                    >
                        <Play size={20} className="text-black ml-0.5 z-50" />
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] md:max-w-[500px] bg-black/95 border border-white/10 backdrop-blur-sm text-white">
                    <DialogHeader>
                        {/* <DialogTitle className="text-neutral-300">Save Short to Library</DialogTitle> */}
                        {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
                    </DialogHeader>
                    {/* <div className="grid gap-4 py-4">
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
                            <label className="text-sm font-medium text-gray-200">Choose Thumbnail</label>
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
                    </div> */}
                    {/* <DialogFooter className={"flex items-center gap-x-2 gap-y-2"}>
                        <button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="border-white/10 text-gray-400 hover:text-white hover:bg-white/10 bg-white/20 text-sm py-2 px-4 rounded transition-all duration-200 ease-in-out"
                        >
                            Cancel
                        </button>
                        <button disabled={isLoading} onClick={() => handleSave()} className={`bg-[#4F46E5] disabled:bg-blue-400/50 hover:bg-[#4F46E5]/80 !text-white py-2 ${isLoading ? "px-8" : "px-3"} rounded flex items-center justify-center gap-x-2 border-none text-sm transition-all duration-300 ease-in-out`}>
                            {
                                isLoading ? (<AiOutlineLoading3Quarters className="animate-spin" />) : (<div className="flex items-center gap-x-2">
                                    <FaSave />
                                    Save to library
                                </div>)
                            }
                        </button>
                    </DialogFooter> */}

                    <div>
                        <Video className="w-full h-[350px] rounded-2xl" controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']} autoPlay >
                            <source src={`${v?.location}`} type='video/mp4' className='' />
                        </Video>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default VideoPlayerModal