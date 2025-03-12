"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa6'
import { ImFilePlay } from 'react-icons/im'
import SocialVideoImport from '../../GeneratePage/UploadVideo/SocialVideoImport'
import { useToast } from '@/hooks/use-toast'
import { BiError } from 'react-icons/bi'
import ExportedVideoPreviews from '../../GeneratePage/ExportedVideoPreviews/ExportedVideoPreviews'
import { useUser } from '@clerk/nextjs'
import InstagramVideoImport from '../../GeneratePage/UploadVideo/InstagramVideoImport'
import { GoPlusCircle } from "react-icons/go";
import { FaTiktok } from 'react-icons/fa'
import TikTokVideoImport from '../../GeneratePage/UploadVideo/TikTokVideoImport'
import YouTubeVideoCategory from '../YouTubeVideoCategory/YouTubeVideoCategory'
import { checkSubscription } from '@/lib/actions/checkSubscription'
import { checkUserQuota } from '@/lib/actions/checkUserQuota'

const BuilderContainer = () => {
    const router = useRouter();
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [socialExportedVideoRenderKey, setSocialExportedVideoRenderKey] = useState(1);
    const [isImportingSocialVideo, setIsImportingSocialVideo] = useState(false);
    const [socialVideoLink, setSocialVideoLink] = useState('');
    const [exportedVideos, setExportedVideos] = useState([]);
    const [youtubeVideoCategory, setYoutubeVideoCategory] = useState("");
    const [groupId, setGroupId] = useState("");

    const { toast } = useToast();
    const { user } = useUser();

    function generateUniqueId() {
        const timestamp = Date.now().toString(36); // Base36 representation of the current timestamp
        const randomPart = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
        return `${timestamp}-${randomPart}`;
    }


    const urlOriginYouTube = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
        const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
        const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;
        const youtubeShortsRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]+$/;

        if (youtubeRegex.test(url)) {
            return "youtube";
        } else if (youtubeShortsRegex.test(url)) {
            return "youtube";
        } else {
            return null; // Not a recognized video link
        }
    }

    const urlOriginInstagram = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
        const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reels|reel|tv)\/[A-Za-z0-9_-]+/;
        const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;

        if (instagramRegex.test(url)) {
            return "instagram";
        } else {
            return null; // Not a recognized video link
        }
    }

    const urlOriginTiktok = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
        const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
        const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;

        if (tiktokRegex.test(url)) {
            return "tiktok";
        } else {
            return null; // Not a recognized video link
        }
    }

    const isYouTubeShortsUrl = (url) => {
        const youtubeShortsRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]+$/;
        return youtubeShortsRegex.test(url);
    };

    function simplifyYouTubeURL(url) {
        try {
            const parsedURL = new URL(url);
            const videoId = parsedURL.searchParams.get('v');

            if (videoId) {
                return `https://www.youtube.com/watch?v=${videoId}`;
            } else if (isYouTubeShortsUrl(url)) {
                return `${url}`
            }
            else {
                throw new Error("The URL does not contain a 'v' parameter.");
            }
        } catch (error) {
            console.error("Invalid URL:", error.message);
            return null; // Return null if the URL is invalid or 'v' is missing
        }
    }

    const handleSocialVideoImportYouTube = async (e) => {
        e.preventDefault();

        if (socialVideoLink?.length === 0) {
            return;
        }

        setIsImportingSocialVideo(true);

        try {
            const origin = urlOriginYouTube(socialVideoLink);

            if (!origin) {
                toast({
                    variant: "default",
                    description: "Please paste a youtube url",
                    action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                        <BiError className='!text-[#FDFFFF]' />
                    </div>
                })
                setIsImportingSocialVideo(false);
                return;
            }

            if (origin === "youtube") {
                const isPro = await checkSubscription(user?.id);
                const checkQuotaStatus = await checkUserQuota(isPro, user?.id, 'copy_posts_count');

                if (checkQuotaStatus) {
                    const formData = new FormData();
                    const simpleurl = simplifyYouTubeURL(socialVideoLink);

                    if (!simpleurl) {
                        toast({
                            variant: "default",
                            description: "Failed to import video",
                            action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                                <BiError className='!text-[#FDFFFF]' />
                            </div>
                        })
                        return;
                    }

                    formData.append("url", simplifyYouTubeURL(socialVideoLink));
                    formData.append("user_id", user?.id);

                    const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/import-youtube-video`, {
                        method: "POST",
                        headers: {
                            // When using FormData, do not set Content-Type manually;
                            // fetch will set it correctly for multipart form data.
                        },
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Failed to upload file");
                    }

                    const data = await response.json();
                    console.log("response : ", data);
                    if (data?.success) {
                        console.log("video uploaded");
                        setSocialVideoLink("");
                        setExportedVideos(data?.data);
                        const uniqueId = generateUniqueId();
                        setGroupId(uniqueId);
                        setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1)
                        setIsImportingSocialVideo(false);
                    } else {
                        toast({
                            variant: "default",
                            description: "Upload Failed",
                            action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                                <BiError className='!text-[#FDFFFF]' />
                            </div>
                        })
                        setIsImportingSocialVideo(false);
                    }
                }
            }

        } catch (err) {
            console.error("Error checking video duration:", err);
            toast({
                variant: "default",
                description: "Upload Failed",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsImportingSocialVideo(false);
        }
    }

    const handleSocialVideoImportInstagram = async (e) => {
        e.preventDefault();

        if (socialVideoLink?.length === 0) {
            return;
        }

        setIsImportingSocialVideo(true);

        try {
            const origin = urlOriginInstagram(socialVideoLink);

            if (!origin) {
                toast({
                    variant: "default",
                    description: "Please paste a instagram url",
                    action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                        <BiError className='!text-[#FDFFFF]' />
                    </div>
                })
                setIsImportingSocialVideo(false);
                return;
            }

            if (origin === "instagram") {
                const isPro = await checkSubscription(user?.id);
                const checkQuotaStatus = await checkUserQuota(isPro, user?.id, 'copy_posts_count')

                if (checkQuotaStatus) {
                    const formData = new FormData();

                    formData.append("url", socialVideoLink);
                    formData.append("user_id", user?.id);

                    const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/import-instagram-video`, {
                        method: "POST",
                        headers: {
                            // When using FormData, do not set Content-Type manually;
                            // fetch will set it correctly for multipart form data.
                        },
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Failed to upload file");
                    }

                    const data = await response.json();
                    console.log("response : ", data);
                    if (data?.success) {
                        console.log("video uploaded");
                        setSocialVideoLink("");
                        setExportedVideos(data?.data);
                        const uniqueId = generateUniqueId();
                        setGroupId(uniqueId);
                        setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1)
                        setIsImportingSocialVideo(false);
                    } else {
                        toast({
                            variant: "default",
                            description: "Upload Failed",
                            action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                                <BiError className='!text-[#FDFFFF]' />
                            </div>
                        })
                    }
                }
            }

        } catch (err) {
            console.error("Error checking video duration:", err);
            toast({
                variant: "default",
                description: "Upload Failed",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsImportingSocialVideo(false);
        }
    }

    const handleSocialVideoImportTikTok = async (e) => {
        e.preventDefault();

        if (socialVideoLink?.length === 0) {
            return;
        }

        setIsImportingSocialVideo(true);

        try {
            const origin = urlOriginTiktok(socialVideoLink);

            if (!origin) {
                toast({
                    variant: "default",
                    description: "Please paste a instagram url",
                    action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                        <BiError className='!text-[#FDFFFF]' />
                    </div>
                })
                setIsImportingSocialVideo(false);
                return;
            }

            if (origin === "tiktok") {
                const isPro = await checkSubscription(user?.id);
                const checkQuotaStatus = await checkUserQuota(isPro, user?.id, 'copy_posts_count')

                if (checkQuotaStatus) {
                    const formData = new FormData();

                    formData.append("url", socialVideoLink);
                    formData.append("user_id", user?.id);

                    const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/import-tiktok-video`, {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Failed to upload file");
                    }

                    const data = await response.json();
                    console.log("response : ", data);
                    if (data?.success) {
                        console.log("video uploaded");
                        setSocialVideoLink("");
                        setExportedVideos(data?.data);
                        const uniqueId = generateUniqueId();
                        setGroupId(uniqueId);
                        setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1)
                        setIsImportingSocialVideo(false);
                    } else {
                        toast({
                            variant: "default",
                            description: "Upload Failed",
                            action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                                <BiError className='!text-[#FDFFFF]' />
                            </div>
                        })
                    }
                }

            }

        } catch (err) {
            console.error("Error checking video duration:", err);
            toast({
                variant: "default",
                description: "Upload Failed",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsImportingSocialVideo(false);
        }
    }

    useEffect(() => {
        setSocialVideoLink("")
    }, [selectedPlatform])

    return (

        user && (
            <div className='w-full'>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center">
                    Create New Video
                </h1>
                <p className="text-gray-400">Import or create content from various platforms</p>
                <div className='flex items-center gap-x-2 text-[#FDFFFF] mt-6 text-xl'>
                    <GoPlusCircle className='text-[#7171BB] text-2xl' />
                    Import Content
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 w-full mt-8'>
                    {/* <Link href={"/dashboard/generate"}
                        className="mt-0 flex flex-col items-center justify-center w-full min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-[#080A0B] hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <ImFilePlay className='text-[#8F92F3] text-2xl' />
                            </div>
                            <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                Drop video files here
                            </h4>
                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>MP4, MOV up to 100MB</p>

                        </div>
                    </Link> */}

                    <label
                        disabled={isImportingSocialVideo}
                        className="mt-0 flex flex-col items-center justify-center w-full min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-[#080A0B] hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                        onClick={() => {
                            if (!isImportingSocialVideo) {
                                setSelectedPlatform("TIKTOK")
                            }
                        }}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <FaTiktok className='text-[#8F92F3] text-2xl' />
                            </div>
                            <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                Import from TikTok
                            </h4>
                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>
                                Paste a TikTok URL
                            </p>

                        </div>
                    </label>

                    <label
                        disabled={isImportingSocialVideo}
                        htmlFor="dropzone-file"
                        className="mt-0 flex flex-col items-center justify-center w-full min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-transparent hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                        onClick={() => {
                            if (!isImportingSocialVideo) {
                                setSelectedPlatform("YOUTUBE");
                                setYoutubeVideoCategory("");
                            }
                        }}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className='bg-[#1E0E11] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <AiOutlineYoutube className='text-[#633B42] text-2xl' />
                            </div>
                            <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                Import from YouTube
                            </h4>
                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>Paste a youtbe URL</p>

                        </div>
                    </label>

                    <label
                        disabled={isImportingSocialVideo}
                        htmlFor="dropzone-file"
                        className="mt-0 flex flex-col items-center justify-center w-full min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-transparent hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                        onClick={() => {
                            if (!isImportingSocialVideo) {
                                setSelectedPlatform("INSTAGRAM")
                            }
                        }}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className='bg-[#1D0D1A] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <FaInstagram className='text-[#614456] text-2xl' />
                            </div>
                            <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                Import from instagram
                            </h4>
                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>Paste an instagram URL</p>

                        </div>
                    </label>
                </div>

                <div className='w-full mx-auto'>
                    {/* {
                        selectedPlatform === "YOUTUBE" && (
                            <div className='w-full flex items-center justify-center'>
                                <SocialVideoImport
                                    socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                                    isImportingSocialVideo={isImportingSocialVideo}
                                    setIsImportingSocialVideo={setIsImportingSocialVideo}
                                    socialVideoLink={socialVideoLink}
                                    setSocialVideoLink={setSocialVideoLink}
                                    handleSocialVideoImport={handleSocialVideoImportYouTube}
                                    message={"Single File"}
                                />
                            </div>
                        )
                    } */}

                    {
                        selectedPlatform === "YOUTUBE" && (
                            <div className='w-fullflex items-center justify-center'>
                                <YouTubeVideoCategory
                                    youtubeVideoCategory={youtubeVideoCategory}
                                    setYoutubeVideoCategory={setYoutubeVideoCategory}
                                    socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                                    isImportingSocialVideo={isImportingSocialVideo}
                                    setIsImportingSocialVideo={setIsImportingSocialVideo}
                                    socialVideoLink={socialVideoLink}
                                    setSocialVideoLink={setSocialVideoLink}
                                    handleSocialVideoImportYouTube={handleSocialVideoImportYouTube}
                                    message={"Single File"}
                                />
                            </div>
                        )
                    }

                    {
                        selectedPlatform === "INSTAGRAM" && (
                            <div className='w-fullflex items-center justify-center'>
                                <InstagramVideoImport
                                    socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                                    isImportingSocialVideo={isImportingSocialVideo}
                                    setIsImportingSocialVideo={setIsImportingSocialVideo}
                                    socialVideoLink={socialVideoLink}
                                    setSocialVideoLink={setSocialVideoLink}
                                    handleSocialVideoImport={handleSocialVideoImportInstagram}
                                />
                            </div>
                        )
                    }

                    {
                        selectedPlatform === "TIKTOK" && (
                            <div className='w-fullflex items-center justify-center'>
                                <TikTokVideoImport
                                    socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                                    isImportingSocialVideo={isImportingSocialVideo}
                                    setIsImportingSocialVideo={setIsImportingSocialVideo}
                                    socialVideoLink={socialVideoLink}
                                    setSocialVideoLink={setSocialVideoLink}
                                    handleSocialVideoImport={handleSocialVideoImportTikTok}
                                />
                            </div>
                        )
                    }

                    {
                        (!isImportingSocialVideo && exportedVideos?.length > 0) && (
                            <ExportedVideoPreviews key={socialExportedVideoRenderKey} socialExportedVideoRenderKey={socialExportedVideoRenderKey} videoPaths={exportedVideos} quota_type={"copy_posts_count"} generatedCounts={1} groupId={groupId} />
                        )
                    }
                </div>


            </div>
        )
    )
}

export default BuilderContainer