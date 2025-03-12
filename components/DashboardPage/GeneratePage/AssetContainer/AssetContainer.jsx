"use client"

import React, { useState } from 'react'
import UploadVideo from '../UploadVideo/UploadVideo'

const AssetContainer = ({userId}) => {
    const [videoUrl, setVideoUrl] = useState('');

    const sendVideoForSegmentation = async () => {
        const formData = new FormData();
        formData.append("video_filepath", videoUrl); // Pass the video URL to the backend

        try {
            const response = await fetch("http://localhost:5000/api/v1/video/segmentation", {
                method: "POST",
                body: formData,
            });

            console.log('response : ', response);

            if (response.ok) {
                const segments = await response.json();
                console.log("Segments:", segments);
                // Handle segments as needed (e.g., display them)
            } else {
                console.error("Failed to fetch segmentation data");
            }
        } catch (error) {
            console.error("Error during segmentation request:", error);
        }
    };


    return (
        <div>
            <UploadVideo userId={userId} />            
        </div>
    )
}

export default AssetContainer