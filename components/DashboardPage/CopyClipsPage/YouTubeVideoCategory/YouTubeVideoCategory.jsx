import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Clock, Film, Loader2, Play, Youtube } from 'lucide-react'
import React from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { ImYoutube } from 'react-icons/im'
import { SiYoutubeshorts } from 'react-icons/si'
import SocialVideoImport from '../../GeneratePage/UploadVideo/SocialVideoImport'

const YouTubeVideoCategory = ({ youtubeVideoCategory, setYoutubeVideoCategory, socialExportedVideoRenderKey, isImportingSocialVideo, setIsImportingSocialVideo, socialVideoLink, setSocialVideoLink, handleSocialVideoImportYouTube, message }) => {
    return (
        <div className='w-full mt-9'>
            {
                !youtubeVideoCategory ? (
                    <div className='w-full flex gap-x-6'>
                        <label
                            disabled={isImportingSocialVideo}
                            htmlFor="dropzone-file"
                            className="mt-0 flex flex-col items-center justify-center w-1/2 min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-transparent hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                            onClick={() => {
                                if (!isImportingSocialVideo) {
                                    setYoutubeVideoCategory("YOUTUBE_SHORTS")
                                }
                            }}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className='bg-[#1E0E11] p-4 rounded-xl flex items-center justify-center w-fit'>
                                    <SiYoutubeshorts className='text-[#633B42] text-2xl' />
                                </div>
                                <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                    YouTube Shorts
                                </h4>
                                <p className='text-[#4E545A] text-sm mt-1 text-center px-2 md:px-10 lg:px-0'>Import YouTube Shorts and save it to your own library</p>

                            </div>
                        </label>
                        <label
                            disabled={isImportingSocialVideo}
                            htmlFor="dropzone-file"
                            className="mt-0 flex flex-col items-center justify-center w-1/2 min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-transparent hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                            onClick={() => {
                                if (!isImportingSocialVideo) {
                                    setYoutubeVideoCategory("YOUTUBE_LANDSCAPE")
                                }
                            }}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className='bg-[#1E0E11] p-4 rounded-xl flex items-center justify-center w-fit'>
                                    <ImYoutube className='text-[#633B42] text-2xl' />
                                </div>
                                <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                    YouTube Landscape
                                </h4>
                                <p className='text-[#4E545A] text-sm mt-1 text-center px-2 md:px-10 lg:px-0'>Import YouTube Video and save it to your own library</p>
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className='w-full flex items-center justify-center'>
                        <SocialVideoImport
                            socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                            isImportingSocialVideo={isImportingSocialVideo}
                            setIsImportingSocialVideo={setIsImportingSocialVideo}
                            socialVideoLink={socialVideoLink}
                            setSocialVideoLink={setSocialVideoLink}
                            handleSocialVideoImport={handleSocialVideoImportYouTube}
                            message={"Single File"}
                            // heading={`${youtubeVideoCategory === 'YOUTUBE_SHORTS' ? "" : ""}`}
                            icon={youtubeVideoCategory === 'YOUTUBE_SHORTS' ? (<SiYoutubeshorts className='text-[#633B42] text-2xl' />) : (youtubeVideoCategory === 'YOUTUBE_LANDSCAPE' ? (<ImYoutube className='text-[#633B42] text-2xl' />) : <Youtube className="w-8 h-8 text-red-400" />)}
                            youtubeVideoCategory={youtubeVideoCategory}
                            setYoutubeVideoCategory={setYoutubeVideoCategory}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default YouTubeVideoCategory