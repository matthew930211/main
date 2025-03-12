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
import VideoPlayerModal from '../GeneratePage/VideoPlayerModal/VideoPlayerModal';

const VideoCard = ({ v, isDeleting, setIsDeleting, isOpen, setIsOpen, handleDownload, handleDelete }) => {
    return (
        <div className="relative w-full h-[400px] rounded-2xl group">
            {/* Overlay with modal trigger */}
            <div className="z-50 absolute top-[45%] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out">
                <VideoPlayerModal v={v} />
            </div>

            {/* Background image with dark overlay */}
            <div
                style={{
                    backgroundImage: `url("${v?.thumbnail}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
                className="absolute inset-0 bg-neutral-500/10 rounded-2xl"
            >
                <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
            </div>
        </div>
    );
};

export default VideoCard;