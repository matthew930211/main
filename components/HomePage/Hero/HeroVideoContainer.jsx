"use client"

import { useState } from 'react';
// import { ClipLoader } from 'react-spinners'; // Optional: react-spinners loader
import Video from "next-video"
// import heroVIdeo from "@/videos/hero-video.webm"
// import heroVIdeoTwo from "@/videos/video-2.mp4"\
import heroVideo from "https://res.cloudinary.com/dex1j2qai/video/upload/v1730538858/video-2_n17iup.mp4";
import poster from '../../../public/assets/images/poster.PNG';
import blurPoster from '../../../public/assets/images/blurPoster.webp';
import Image from 'next/image';

export default function HeroVideoContainer() {
    const [isLoading, setIsLoading] = useState(true);

    const handleVideoLoaded = () => {
        setIsLoading(false);
    };

    return (
        <section style={{ position: 'relative', width: '100%', maxHeight: "40vh", overflow: 'hidden' }} className='flex items-center justify-center mt-10 mx-auto max-w-3xl rounded-2xl shadow-2xl shadow-[#1F1B36]'>
            {/* <Video
                src={"https://res.cloudinary.com/dex1j2qai/video/upload/v1730538858/video-2_n17iup.mp4"}
                autoPlay
                className="w-full"
                poster={poster.src}
                blurDataURL={blurPoster.blurDataURL}
            /> */}
            <Image src={"/assets/images/poster.PNG"} alt='Demo' width={800} height={800} />
        </section>
    );
}