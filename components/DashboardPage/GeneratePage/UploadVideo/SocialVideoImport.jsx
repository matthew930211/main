import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Clock, Film, Loader2, Play, Youtube } from 'lucide-react'
import React from 'react'
import { ImSpinner3 } from 'react-icons/im'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GoArrowRight } from 'react-icons/go';

const SocialVideoImport = ({ socialExportedVideoRenderKey, isImportingSocialVideo, setIsImportingSocialVideo, socialVideoLink, setSocialVideoLink, handleSocialVideoImport, message, icon, youtubeVideoCategory, setYoutubeVideoCategory }) => {
    return (
        <div className="w-full">
            <div className={cn(
                "p-6 bg-black/20 backdrop-blur-sm rounded-xl border-[3px] border-dashed border-white/10 transition-all min-h-[160px] flex items-center justify-center",
                socialVideoLink ? "border-2" : "border-white/5"
            )}>
                <div className="flex flex-col items-center gap-6 max-w-xl mx-auto w-full">
                    <div className="w-16 h-16 bg-red-600/20 rounded-xl flex items-center justify-center">
                        {isImportingSocialVideo ? (
                            <Loader2 className="w-8 h-8 text-red-400 animate-spin" />
                        ) : (
                            icon
                        )}
                    </div>
                    <div className="text-center w-full space-y-6">
                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">
                                {isImportingSocialVideo ? 'Importing...' : 'Import from YouTube'}
                            </h3>
                            <p className="text-sm text-gray-400">
                                Transform your YouTube content into engaging short-form videos
                            </p>
                        </div>

                        <div className="space-y-4">
                            <form onSubmit={handleSocialVideoImport} className="flex gap-2 flex-col lg:flex-row">
                                <Input
                                    type="url"
                                    placeholder="Paste YouTube URL here"
                                    className="bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                                    value={socialVideoLink}
                                    onChange={(e) => setSocialVideoLink(e.target.value)}
                                    disabled={isImportingSocialVideo}
                                />
                                {
                                    !message && (
                                        <Select disabled={isImportingSocialVideo} required={true} onValueChange={(value) => {
                                            window.localStorage.setItem("clipCount", JSON.stringify(value))
                                        }}>
                                            <SelectTrigger className="w-full lg:w-[200px] !border-none border-gray-500/20 !bg-[#333]/20 !text-white">
                                                <SelectValue placeholder="Max Clip Count" className='!text-white/40 !text-xs' />
                                            </SelectTrigger>
                                            <SelectContent className="!bg-[#101012] !border-none">
                                                <SelectGroup>
                                                    <SelectLabel className="!text-neutral-100">Max Clip Count</SelectLabel>
                                                    <SelectItem value="2" className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black">
                                                        <div className='flex items-center justify-between gap-x-4'>
                                                            <span>Max Clip 2</span>
                                                            <GoArrowRight className='text-lg' />
                                                            <span className='!text-xs font-semibold'>{"(Est. 3 min)"}</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="3" className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black">
                                                        <div className='flex items-center justify-between gap-x-4'>
                                                            <span>Max Clip 3</span>
                                                            <GoArrowRight className='text-lg' />
                                                            <span className='!text-xs font-semibold'>{"(Est. 4 min)"}</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="5" className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black">
                                                        <div className='flex items-center justify-between gap-x-4'>
                                                            <span>Max Clip 5</span>
                                                            <GoArrowRight className='text-lg' />
                                                            <span className='!text-xs font-semibold'>{"(Est. 5 min)"}</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="10" className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black">
                                                        <div className='flex items-center justify-between gap-x-4'>
                                                            <span>Max Clip 10</span>
                                                            <GoArrowRight className='text-lg' />
                                                            <span className='!text-xs font-semibold'>{"(Est. 7 min)"}</span>
                                                        </div>
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )
                                }
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white whitespace-nowrap"
                                    disabled={isImportingSocialVideo || !socialVideoLink}
                                >
                                    {isImportingSocialVideo ? 'Importing...' : 'Import'}
                                </Button>
                            </form>

                            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 flex-wrap lg:flex-nowrap">
                                <span className="flex items-center">
                                    <Play className="w-4 h-4 mr-1" /> {youtubeVideoCategory === "YOUTUBE_SHORTS" ? "Any YouTube Shorts" : "Any YouTube Video"}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" /> Auto-trimming
                                </span>
                                <span className="flex items-center">
                                    <Film className="w-4 h-4 mr-1" /> {message ? message : "Multiple Shorts"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialVideoImport