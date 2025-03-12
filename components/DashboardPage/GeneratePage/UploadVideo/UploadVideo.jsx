"use client";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ExportedVideoPreviews from "../ExportedVideoPreviews/ExportedVideoPreviews";
import { ImFilePlay, ImSpinner3 } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import {
  MdCloudUpload,
  MdOutlineCompareArrows,
  MdOutlinePermMedia,
  MdOutlinePhotoLibrary,
  MdPermMedia,
  MdUploadFile,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import RecentCreatedVideos from "../../RecentCreatedVideos/RecentCreatedVideos";
import { DefaultPlayer as VideoPlayer } from "react-html5video";
import "react-html5video/dist/styles.css";
import { useToast } from "@/hooks/use-toast";
import SocialVideoImport from "./SocialVideoImport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaArrowsAltH, FaCheck, FaYoutube } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import PublicLibraryAssets from "./PublicLibraryAssets";
import FeaturedAssets from "./FeaturedAssets";
import { FaFileArrowUp } from "react-icons/fa6";
import { PiYoutubeLogo } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { RiGalleryLine } from "react-icons/ri";
import { LuVideo } from "react-icons/lu";
import Link from "next/link";
import { BiError } from "react-icons/bi";
import {
  Youtube,
  FileVideo,
  Loader2,
  Play,
  Clock,
  Video,
  Film,
  PlusCircle,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoArrowRight } from "react-icons/go";
import { checkSubscription } from "@/lib/actions/checkSubscription";
import { checkUserQuota } from "@/lib/actions/checkUserQuota";
// import {GiFairyWand} from "react-icons/gi"

const UploadVideo = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSegmenting, setIsSegmenting] = useState(false);
  const [isSegmentingCandidates, setIsSegmentingCandidates] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedVideos, setExportedVideos] = useState([]);
  const [uploadedData, setUploadedData] = useState(null);
  const [isImportingSocialVideo, setIsImportingSocialVideo] = useState(false);
  const [socialVideoLink, setSocialVideoLink] = useState("");
  const [socialExportedVideoRenderKey, setSocialExportedVideoRenderKey] =
    useState(1);
  const [selectedTab, setSelectedTab] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [clipCount, setClipCount] = useState(1);
  const [groupId, setGroupId] = useState("");

  const uploadBtnRef = useRef(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();

  const { user } = useUser();

  const onDrop = useCallback((acceptedFiles) => {
    handleFileUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    // maxSize: 1024 * 1024 * 100,
  });

  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Base36 representation of the current timestamp
    const randomPart = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
    return `${timestamp}-${randomPart}`;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setTimeout(() => {
        uploadBtnRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setExportedVideos([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  const sendVideoSegmentation = async (videoFilePath, local_video_filepath) => {
    setIsSegmenting(true);

    const formData = new FormData();
    formData.append("video_filepath", videoFilePath);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/segmentation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("segment response:", response?.data);

      if (response?.data) {
        sendVideSegmentCandidates(response?.data, local_video_filepath);
      }
    } catch (error) {
      console.error("Error sending video filepath:", error);
      toast({
        variant: "destructive",
        description: "Segmenting Video File Failed!",
      });
    } finally {
      setIsSegmenting(false);
    }
  };

  const sendVideSegmentCandidates = async (segments, local_video_filepath) => {
    setIsSegmentingCandidates(true);

    const formData = new FormData();
    formData.append("segments", JSON.stringify(segments));
    formData.append(
      "count",
      JSON.parse(window.localStorage.getItem("clipCount"))
    );

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/segment_candidates`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("segment candidate response:", response?.data);

      if (response?.data) {
        console.log(
          "uploadedData?.local_video_filepath : ",
          local_video_filepath
        );
        exportVideos(local_video_filepath, response?.data);
      }
    } catch (error) {
      console.error("Error sending video filepath:", error);
      toast({
        variant: "destructive",
        description: "Segmenting Candidates Failed!",
      });
    } finally {
      setIsSegmentingCandidates(false);
    }
  };

  const exportVideos = async (video_filepath, candidates) => {
    setExportedVideos([]);
    setIsExporting(true);

    const formData = new FormData();
    formData.append("video_filepath", video_filepath);
    formData.append("candidates", JSON.stringify(candidates));
    formData.append("user_id", user?.id);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/export`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("export response:", response?.data);
      console.log("exported paths : ", response?.data?.details?.paths);

      if (response?.data?.details?.paths?.length > 0) {
        const uniqueId = generateUniqueId();
        console.log("uuid : ", uniqueId);
        setGroupId(uniqueId);
        setExportedVideos(response?.data?.details?.paths);
        setIsExporting(false);
        setIsSegmenting(false);
        setIsSegmentingCandidates(false);
        setPreviewUrl(null);
        setSocialVideoLink("");
        setSelectedFile(null);
        setUploadedData(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input value
        }
      }

      if (response?.data?.details?.paths?.length === 0) {
        setExportedVideos([]);
        setIsExporting(false);
        setIsSegmenting(false);
        setIsSegmentingCandidates(false);
        setPreviewUrl(null);
        setSocialVideoLink("");
        setSelectedFile(null);
        setUploadedData(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input value
        }

        toast({
          variant: "destructive",
          title: "Exporting Clips Failed!",
          description: "Try uploading again",
        });
      }
    } catch (error) {
      console.error("Error sending video filepath:", error);
      setIsExporting(false);
      setIsSegmenting(false);
      setIsSegmentingCandidates(false);
      setPreviewUrl(null);
      setSelectedFile(null);
      setUploadedData(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input value
      }

      toast({
        variant: "destructive",
        description: "Exporting Clips Failed!",
      });
    }
  };


  const handleFileUpload = async (files) => {
    if (!files.length) return;
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a blob URL to load the video file
      const videoBlob = URL.createObjectURL(files[0]);
      const videoElement = document.createElement("video");

      // Use a promise to load the video and fetch its duration
      const getVideoDuration = () =>
        new Promise((resolve, reject) => {
          videoElement.preload = "metadata";
          videoElement.src = videoBlob;

          videoElement.onloadedmetadata = () => {
            console.log("video duration : ", videoElement.duration);
            resolve(videoElement.duration); // Duration in seconds
            URL.revokeObjectURL(videoBlob); // Free up memory
          };

          videoElement.onerror = (error) => {
            reject("Failed to load video metadata");
            URL.revokeObjectURL(videoBlob); // Free up memory
          };
        });

      const duration = await getVideoDuration();

      console.log("Video Duration:", duration, "seconds");

      // Check if the video is less than 3 minutes (180 seconds)
      if (duration < 180) {
        toast({
          variant: "default",
          title: "Upload Failed",
          description: "Video is less than 3 minutes",
          action: (
            <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
              <BiError className="!text-[#FDFFFF]" />
            </div>
          ),
        });
        handleClear();
        setIsUploading(false);
        setIsImportingSocialVideo(false);
        setIsExporting(false);
        setIsSegmenting(false);
        setIsSegmentingCandidates(false);
        return;
      }
    } catch (error) {
      console.error("Error checking video duration:", error);
      toast({
        variant: "default",
        title: "Upload Failed",
        description: "Failed to check video duration",
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      handleClear();
      return;
    }

    const isPro = await checkSubscription(user?.id);
    const checkQuotaStatus = await checkUserQuota(
      isPro,
      user?.id,
      "generate_clips_count",
      JSON.parse(window.localStorage.getItem("clipCount"))
        ? Number(JSON.parse(window.localStorage.getItem("clipCount")))
        : 2
    );

    if (checkQuotaStatus) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 3500);

      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("user_id", user?.id);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const data = await response.json();
        console.log("response : ", data);
        if (data) {
          console.log(
            "sending this for video segmenting : ",
            data?.details?.firebase_paths?.audio_location
          );

          sendVideoSegmentation(
            `${data?.details?.local_audio_filepath}`,
            data?.details?.local_video_filepath
          );
        } else {
          toast({
            variant: "default",
            description: "Failed to upload file.",
            action: (
              <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
                <BiError className="!text-[#FDFFFF]" />
              </div>
            ),
          });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({
          variant: "default",
          description: "An error occurred during file upload.",
          action: (
            <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
              <BiError className="!text-[#FDFFFF]" />
            </div>
          ),
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const urlOrigin = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
    const instagramRegex =
      /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
    const tiktokRegex =
      /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;

    if (youtubeRegex.test(url)) {
      return "youtube";
    } else if (instagramRegex.test(url)) {
      return "instagram";
    } else if (tiktokRegex.test(url)) {
      return "tiktok";
    } else {
      return null; // Not a recognized video link
    }
  };

  const urlOriginYouTube = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
    const instagramRegex =
      /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
    const tiktokRegex =
      /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;

    if (youtubeRegex.test(url)) {
      return "youtube";
    } else {
      return null; // Not a recognized video link
    }
  };

  function simplifyYouTubeURL(url) {
    try {
      // Create a URL object to parse the URL
      const parsedURL = new URL(url);

      // Extract the 'v' parameter
      const videoId = parsedURL.searchParams.get("v");

      // If 'v' exists, construct the simplified URL
      if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
      } else {
        throw new Error("The URL does not contain a 'v' parameter.");
      }
    } catch (error) {
      console.error("Invalid URL:", error.message);
      return null; // Return null if the URL is invalid or 'v' is missing
    }
  }

  const handleSocialVideoImport = async (e) => {
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
          action: (
            <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
              <BiError className="!text-[#FDFFFF]" />
            </div>
          ),
        });
        setIsImportingSocialVideo(false);
        return;
      }

      if (origin === "youtube") {
        const formData = new FormData();
        const simpleurl = simplifyYouTubeURL(socialVideoLink);

        if (!simpleurl) {
          toast({
            variant: "default",
            description: "Failed to import video",
            action: (
              <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
                <BiError className="!text-[#FDFFFF]" />
              </div>
            ),
          });
          return;
        }

        formData.append("url", simplifyYouTubeURL(socialVideoLink));
        formData.append("user_id", user?.id);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/split-youtube-video`,
          {
            method: "POST",
            headers: {
              // When using FormData, do not set Content-Type manually;
              // fetch will set it correctly for multipart form data.
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const data = await response.json();
        console.log("response : ", data);
        if (data?.success) {
          console.log("video uploaded");
          sendVideoSegmentation(
            `${data?.local_audio_filepath}`,
            data?.local_video_filepath
          );
          setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1);
          setIsImportingSocialVideo(false);
        } else {
          toast({
            variant: "default",
            description: "Upload Failed",
            action: (
              <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
                <BiError className="!text-[#FDFFFF]" />
              </div>
            ),
          });
        }
      }
    } catch (err) {
      console.error("Error checking video duration:", err);
      toast({
        variant: "default",
        description: "Upload Failed",
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      setIsImportingSocialVideo(false);
    }
  };

  const handleClipCountFilter = (filter) => {
    setClipCount(filter);
  };

  useEffect(() => {
    setSelectedTab("AI");
    window.localStorage.setItem("clipCount", JSON.stringify("2"));
    
  }, []);

  useEffect(() => {
    console.log("clip Count : ", clipCount);
  }, [clipCount]);

  return (
    <div>
      <div className="w-[100%] 2xl:w-[70%] mx-auto gap-10 mt-4 mb-10 relative">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center">
          Create New Video
        </h1>
        <p className="text-gray-400">
          Import or create content from various platforms
        </p>
        <div className="min-h-screen max-h-fit col-span-0 lg:col-span-4 2xl:col-span-4 bg-transparent px-0 rounded-2xl w-full mt-9">
          <Tabs defaultValue="create_clips" className="w-full !bg-transparent">
            <TabsList className="w-fit bg-[#08090C] flex items-center justify-start gap-x-2">
              <TabsTrigger
                disabled={
                  isUploading ||
                  isImportingSocialVideo ||
                  isSegmenting ||
                  isSegmentingCandidates ||
                  isExporting
                }
                value="create_clips"
                className="w-fit"
                onClick={() =>
                  window.localStorage.setItem("clipCount", JSON.stringify("2"))
                }
              >
                <div className="flex items-center gap-x-2 text-sm py-1 px-1">
                  <MdUploadFile className="text-[1.1rem]" />
                  Upload Video
                </div>
              </TabsTrigger>
              <TabsTrigger
                disabled={
                  isUploading ||
                  isImportingSocialVideo ||
                  isSegmenting ||
                  isSegmentingCandidates ||
                  isExporting
                }
                value="youtube_import"
                className="w-fit"
                onClick={() =>
                  window.localStorage.setItem("clipCount", JSON.stringify("2"))
                }
              >
                <div className="flex items-center gap-x-2 text-sm py-1 px-1">
                  <PiYoutubeLogo className="text-[1.1rem]" />
                  YouTube Import
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="create_clips">
              <div
                {...getRootProps()}
                className={`relative group cursor-pointer transform transition-all duration-200 mt-9 ${isDragActive
                    ? "border-indigo-500 ring-2 ring-indigo-500/20"
                    : "border-white/5"
                  }`}
              >
                <input
                  disabled={
                    isUploading ||
                    isSegmenting ||
                    isSegmentingCandidates ||
                    isExporting
                  }
                  {...getInputProps()}
                />
                <div className="p-8 bg-black/20 backdrop-blur-sm rounded-xl hover:bg-black/30 transition-all border-[3px] border-dashed border-white/10 min-h-[240px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-6 max-w-xl mx-auto text-center">
                    <div className="w-16 h-16 bg-indigo-600/20 rounded-xl flex items-center justify-center group-hover:bg-indigo-600/30 transition-all">
                      {isUploading ||
                        isSegmenting ||
                        isSegmentingCandidates ||
                        isExporting ? (
                        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                      ) : (
                        <FileVideo className="w-8 h-8 text-indigo-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        {isUploading && "Uploading..."}
                        {isSegmenting && "Spliting Video..."}
                        {isSegmentingCandidates && "Making Shorts..."}
                        {isExporting && "Exporting Clips..."}
                        {!isUploading &&
                          !isSegmenting &&
                          !isSegmentingCandidates &&
                          !isExporting &&
                          "Drop your video here"}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {isUploading ||
                          isSegmenting ||
                          isSegmentingCandidates ||
                          isExporting
                          ? `${uploadProgress}% complete`
                          : "Upload your video files to create engaging short-form content automatically"}
                      </p>

                      <div className="w-full flex items-center justify-center mb-6">
                        <Select
                          disabled={
                            isUploading ||
                            isImportingSocialVideo ||
                            isSegmenting ||
                            isSegmentingCandidates ||
                            isExporting
                          }
                          required={true}
                          onValueChange={(value) => {
                            window.localStorage.setItem(
                              "clipCount",
                              JSON.stringify(value)
                            );
                          }}
                        >
                          <SelectTrigger className="w-[90%] sm:w-[400px] !border-none border-gray-500/20 !bg-[#333]/20 !text-white">
                            <SelectValue
                              placeholder="Max Clip Count"
                              className="!text-white/40 !text-xs"
                            />
                          </SelectTrigger>
                          <SelectContent className="!bg-[#101012] !border-none">
                            <SelectGroup>
                              <SelectLabel className="!text-neutral-100">
                                Max Clip Count
                              </SelectLabel>
                              <SelectItem
                                value="2"
                                className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black"
                              >
                                <div className="flex items-center justify-between gap-x-4">
                                  <span>Max Clip 2</span>
                                  <GoArrowRight className="text-lg" />
                                  <span className="!text-xs font-semibold">
                                    {"(Est. 3 min)"}
                                  </span>
                                </div>
                              </SelectItem>
                              <SelectItem
                                value="3"
                                className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black"
                              >
                                <div className="flex items-center justify-between gap-x-4">
                                  <span>Max Clip 3</span>
                                  <GoArrowRight className="text-lg" />
                                  <span className="!text-xs font-semibold">
                                    {"(Est. 4 min)"}
                                  </span>
                                </div>
                              </SelectItem>
                              <SelectItem
                                value="5"
                                className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black"
                              >
                                <div className="flex items-center justify-between gap-x-4">
                                  <span>Max Clip 5</span>
                                  <GoArrowRight className="text-lg" />
                                  <span className="!text-xs font-semibold">
                                    {"(Est. 5 min)"}
                                  </span>
                                </div>
                              </SelectItem>
                              <SelectItem
                                value="10"
                                className="!w-full !flex !items-center !gap-x-2 !justify-between !text-neutral-100 focus:!text-black hover:!text-black"
                              >
                                <div className="flex items-center justify-between gap-x-4">
                                  <span>Max Clip 10</span>
                                  <GoArrowRight className="text-lg" />
                                  <span className="!text-xs font-semibold">
                                    {"(Est. 7 min)"}
                                  </span>
                                </div>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FileVideo className="w-4 h-4 mr-1" /> MP4, MOV
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" /> Any Duration
                          </span>
                          <span className="flex items-center">
                            <Film className="w-4 h-4 mr-1" /> Up to 100MB
                          </span>
                        </div>
                        {!isUploading && (
                          <div className="flex gap-3 justify-center">
                            <Button
                              size="default"
                              variant="outline"
                              className="border-white/10 text-gray-400 hover:text-white bg-transparent hover:bg-white/10"
                            >
                              <FileVideo className="w-4 h-4 mr-2" />
                              Browse Files
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="youtube_import">
              <div className="w-full mt-9">
                <SocialVideoImport
                  isImportingSocialVideo={
                    isImportingSocialVideo ||
                    isSegmenting ||
                    isSegmentingCandidates ||
                    isExporting
                  }
                  setIsImportingSocialVideo={setIsImportingSocialVideo}
                  socialVideoLink={socialVideoLink}
                  setSocialVideoLink={setSocialVideoLink}
                  handleSocialVideoImport={handleSocialVideoImport}
                  icon={<Youtube className="w-8 h-8 text-red-400" />}
                />
              </div>
            </TabsContent>
          </Tabs>

          {exportedVideos?.length > 0 &&
            !isImportingSocialVideo &&
            !isExporting &&
            !isSegmenting &&
            !isSegmentingCandidates &&
            !isUploading && (
              <div className="mt-6 mb-10">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-x-2 text-[#FDFFFF]/80 text-lg font-semibold">
                    <LuVideo className="text-[1.3rem]" />
                    Generated Shorts
                  </div>

                  <button
                    onClick={() => handleClear()}
                    className="border-2 border-neutral-500/20 text-[#676d74] text-xs px-2 py-1 rounded-lg"
                  >
                    Generate More
                  </button>
                </div>

                <div>
                  <ExportedVideoPreviews
                    socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                    videoPaths={exportedVideos}
                    quota_type={"generate_clips_count"}
                    generatedCounts={Number(
                      JSON.parse(window.localStorage.getItem("clipCount"))
                    )}
                    groupId={groupId}
                  />
                </div>
              </div>
            )}

          {isExporting && (
            <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-4 mt-2">
              <Skeleton
                className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}
              >
                <Skeleton
                  className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"}
                />
              </Skeleton>
              <Skeleton
                className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}
              >
                <Skeleton
                  className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"}
                />
              </Skeleton>
              <Skeleton
                className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}
              >
                <Skeleton
                  className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"}
                />
              </Skeleton>
              <Skeleton
                className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}
              >
                <Skeleton
                  className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"}
                />
              </Skeleton>
            </div>
          )}

          {/* {
                        (exportedVideos?.length == 0 && !isExporting && !isImportingSocialVideo) && (
                            <RecentCreatedVideos userId={userId} limit={1} />
                        )
                    } */}

          <div className="mt-4">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-x-2 text-[#FDFFFF]/80 text-lg font-semibold">
                <Film />
                Community Creations
              </div>

              <Link
                href={"/dashboard/public"}
                className="border-2 border-neutral-500/20 text-[#676d74] text-xs px-2 py-1 rounded-lg"
              >
                View All
              </Link>
            </div>

            <FeaturedAssets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
