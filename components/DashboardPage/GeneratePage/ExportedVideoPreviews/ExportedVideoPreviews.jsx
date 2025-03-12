"use client"

import { useEffect, useState } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import CreateTitleModal from "../CreateTitleModal/CreateTitleModal";
import { FaDeleteLeft } from "react-icons/fa6";
import DeleteClipModal from "../DeleteClipModal/DeleteClipModal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import VideoPlayerModal from "../VideoPlayerModal/VideoPlayerModal";

const ExportedVideoPreviews = ({ socialExportedVideoRenderKey, videoPaths, gridClassName, editClip, quota_type, generatedCounts, groupId }) => {
    const [videoUrls, setVideoUrls] = useState([]);

    const handleDownload = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            // Create a temporary link to trigger the download
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Release object URL after the download
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("Failed to download file:", error);
        }
    };


    useEffect(() => {
        console.log("videoPaths : ", videoPaths)
        setVideoUrls(videoPaths);
    }, [videoPaths]);

    return (
        <div key={socialExportedVideoRenderKey} className={`${gridClassName && gridClassName} "w-full mx-auto mt-4 grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-6 row-gap-2"`}>
            {videoUrls.map((v, index) => (
                <div key={index} className="flex flex-col gap-y-2 w-full relative h-[400px] rounded-2xl group">
                    {/* <Image src={`${v?.thumbnails[2]}`} alt={`${v?.location}`} width={600} height={600} className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 rounded-2xl"  /> */}
                    {/* <Video className="w-full h-[350px] rounded-2xl" controls={false}>
                        <source src={`${v?.location}`} type='video/mp4' className='' />
                    </Video> */}

                    <div className="z-50 absolute  top-1/2 left-1/2 right-1/3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out">
                        <VideoPlayerModal v={v} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0  h-full">

                        <div className="flex items-center justify-center gap-x-2 w-full mx-auto px-4 absolute bottom-0">
                            <CreateTitleModal asset_url={videoPaths[index]?.location} v={v} thumbnails={v?.thumbnails} editClip={editClip} quota_type={quota_type} generatedCounts={generatedCounts} groupId={groupId} />
                        </div>
                    </div>
                    <div style={{
                        background: `url("${v?.thumbnails[index % 5]}") rgba(0,0,0,0.4)`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundBlendMode: 'darken'
                    }} className="bg-neutral-500/10 absolute top-0 left-0 bottom-0 w-full h-full rounded-2xl" >
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExportedVideoPreviews