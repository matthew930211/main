"use client"

import React, { useEffect, useState } from 'react'
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
import Image from 'next/image';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import { FaInstagram, FaRegClipboard, FaRegClosedCaptioning, FaSpinner } from 'react-icons/fa6';
import { useToast } from '@/hooks/use-toast';
import { BiError, BiImport } from 'react-icons/bi';
// import CreateTitleModal from '../CreateTitleModal/CreateTitleModal';
import { cn } from '@/lib/utils';
import { FaCheck } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GiDuration } from 'react-icons/gi';
import { Input } from '@/components/ui/input';
import { IoShareSocial } from 'react-icons/io5';
import VideoCard from '../../VideosContainer/VideoCard';
import PublishClipModal from '../../PublishClipModal/PublishClipModal';

const PostOnSocialContainerModal = ({ clip, clips, setClips, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [duration, setDuration] = useState(0);
    const [startDuration, setStartDuration] = useState(0);
    const [endDuration, setEndDuration] = useState(0);
    const [isPosting, setIsPosting] = useState(false);
    const [isPosted, setIsPosted] = useState(false);

    const { toast } = useToast();
    const { user } = useUser();

    const copyToClipboard = async (text) => {
        console.log("clipboard : ", text);
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: "Copied to clipboard",
                variant: "default",
                action: <div className='!bg-[#3faa56] p-1 flex items-center justify-center rounded-full'>
                    <FaCheck className='!text-[#FDFFFF]' />
                </div>
            })
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    }

    const loginWithInstagram = async () => {
        const loginRes = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/auth/instagram-login`);
        const loginData = loginRes?.data;

        if (loginData?.success) {
            window.location.href = loginData?.login_url;
        }
    }

    const handlePostInstagram = async () => {
        setIsPosting(true);

        try {
            const insta_access_token = JSON.parse(window.localStorage.getItem("insta_access_token"));
            const insta_user_id = JSON.parse(window.localStorage.getItem("insta_user_id"));
            const insta_access_token_expires_in = JSON.parse(window.localStorage.getItem("insta_access_token_expires_in"));

            if (!insta_access_token || !insta_user_id || !insta_access_token_expires_in) {
                loginWithInstagram();
            }

            function isExpired() {
                const startTime = Math.floor(Date.now() / 1000);
                const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
                return currentTime >= startTime + insta_access_token_expires_in;
            }

            const token_expired = isExpired();

            if (token_expired) {
                window.localStorage.removeItem("insta_access_token");
                window.localStorage.removeItem("insta_user_id");
                window.localStorage.removeItem("insta_access_token_expires_in");

                loginWithInstagram();
            }

            if (insta_access_token && insta_user_id && insta_access_token_expires_in && !token_expired) {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/social-share/insta-reel-post`, {
                    user_id: user?.id,
                    clip_id: clip?._id,
                    ACCESS_TOKEN: insta_access_token,
                    INSTA_USER: insta_user_id,
                    expires_in: insta_access_token_expires_in
                })

                if (res?.data?.success) {
                    setIsPosting(false);
                    setIsPosted(true);
                    toast({
                        variant: "default",
                        description: "Posted successfully",
                        action: <div className='!bg-[#3faa56] p-1 flex items-center justify-center rounded-full'>
                            <FaCheck className='!text-[#FDFFFF]' />
                        </div>
                    })
                }
            }

        } catch (err) {
            console.log(err);
            toast({
                variant: "default",
                description: `Failed to post your clip`,
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsPosting(false);
        }
    }


    const handlePost = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/auth/insta-cookies`, {
            withCredentials: true
        });
    }
    return (
        <div className={cn("", className)}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="grow mt-2 bg-[#36339E] !text-white py-1 px-3 rounded hover:bg-[#36339E]/90 flex items-center justify-center gap-x-2 border-none text-sm font-light w-full">
                        <GiDuration />

                        Post on Social
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] lg:max-w-[500px] min-h-[25vh] bg-black/95 border border-white/10 backdrop-blur-sm text-white flex flex-col ">
                    <div className='flex items-start gap-x-2 pt-6'>
                        <IoShareSocial className='text-sm' />
                        <h4 className='text-neutral-400 text-xs'>Post on social</h4>
                    </div>

                    <div className='flex flex-col gap-y-3'>
                        <button disabled={isPosting} onClick={() => handlePostInstagram()}
                            className="grow mt-2 bg-white/10 text-white hover:text-white hover:bg-white/20 py-2 px-3 rounded flex items-center justify-start gap-x-2 transition-all duration-200 text-sm !border-0"
                        >
                            {
                                isPosting ? <FaSpinner className='text-white animate-spin' /> : <FaInstagram className='text-lg' />
                            }
                            Post on Instagram
                        </button>
                    </div>
                    {
                        isPosted && (
                            <>
                                <VideoCard v={clip} />
                                <PublishClipModal
                                    asset_url={clip?.location}
                                    draftThumnail={clip?.thumbnail}
                                />
                            </>
                        )
                    }
                    <DialogFooter>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostOnSocialContainerModal