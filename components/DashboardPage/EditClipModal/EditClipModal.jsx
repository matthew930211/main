"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { MdOutlineSplitscreen } from "react-icons/md";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { CldVideoPlayer } from "next-cloudinary";
import { ImSpinner3 } from "react-icons/im";
import { TbAssembly, TbHourglassEmpty } from "react-icons/tb";
import axios from "axios";
import PublishClipModal from "../PublishClipModal/PublishClipModal";
import { assets as featured_assets } from "@/data/featured_assets";
import { assets as public_assets } from "@/data/community_creations";
import { RxCross1 } from "react-icons/rx";
import { BiError } from "react-icons/bi";
import CreateTitleModal from "../GeneratePage/CreateTitleModal/CreateTitleModal";
import { FaRegPaste } from "react-icons/fa6";
import ExportedVideoPreviews from "../GeneratePage/ExportedVideoPreviews/ExportedVideoPreviews";
import SaveEditClip from "./SaveEditClip";

const EditClipModal = ({
  clip_url,
  fetchFreshNewVideos,
  videos,
  setVideos,
  filteredVideos,
  setFilteredVideos,
  selectedFilter,
  videoRenderKeyContainer,
  setVideoRenderKeyContainer,
  popoverOpen,
  setPopoverOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isCombined, setIsCombined] = useState(false);
  const [combinedClip, setCombinedClip] = useState(null);
  const [assets, setAssets] = useState([]);
  const [publicAssetExists, setPublicAssetExists] = useState(false);
  const [videoRenderKey, setVideoRenderKey] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);

  const uploadBtnRef = useRef(null);
  const fileInputRef = useRef(null);

  const { user, isLoaded, isSignedIn } = useUser();
  const { toast } = useToast();

  const handleClear = () => {
    setPreviewUrl(null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      toast({
        variant: "default",
        description: "Please upload a mp4 file",
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
    }
  };

  const handleInputChange = (e) => {
    console.log("assets : ", assets);
    setVideoRenderKey(videoRenderKey + 1);

    const exists = assets.find((item) => item?.id === e.target.value);

    if (exists) {
      setPublicAssetExists(true);
      setPreviewUrl(exists?.url);
    } else {
      setPublicAssetExists(false);
      handleClear();
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: "default",
        title: "Upload Failed",
        description: "Please select a file to combine",
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      return;
    }

    setIsUploading(true);

    try {
      const videoBlob = URL.createObjectURL(selectedFile);
      const videoElement = document.createElement("video");

      const getVideoDuration = () =>
        new Promise((resolve, reject) => {
          videoElement.preload = "metadata";
          videoElement.src = videoBlob;

          videoElement.onloadedmetadata = () => {
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

      // if (duration < 180) {
      //     toast({
      //         variant: "destructive",
      //         title: "Upload Failed",
      //         description: "Video is less than 3 minutes",
      //     })
      //     handleClear();
      //     setIsUploading(false);
      //     return;
      // }
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
      setIsUploading(false);
      handleClear();
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", user?.id);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/upload-clip`,
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

      if (data?.success) {
        function extractUploadsPath(url) {
          const match = url.match(/\/uploads\/(.+)$/);
          if (match) {
            return "/" + match[1]; // Adds a leading slash to the extracted path
          }
          return null; // Returns null if no match is found
        }

        const bodyData = new FormData();
        bodyData.append("original_clip", String(extractUploadsPath(clip_url)));
        bodyData.append(
          "clip_to_combine",
          String(data?.details?.local_video_filepath)
        );
        bodyData.append("user_id", user?.id);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/split-screen`,
          {
            method: "POST",
            body: bodyData,
          }
        );

        const resData = await res.json();

        console.log("combined response : ", resData);

        if (resData?.success) {
          setIsCombined(true);
          console.log("combined response : ", resData?.data);
          setCombinedClip(resData?.data);
          setVideoRenderKey(videoRenderKey + 1);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "default",
        title: "Upload Failed",
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
  };

  const handleUploadPublicAsset = async () => {
    if (!previewUrl || !publicAssetExists) {
      toast({
        variant: "default",
        title: "Combine Failed",
        description: "Invalid Public ID",
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      return;
    }

    setIsUploading(true);

    try {
      function extractUploadsPath(url) {
        const match = url.match(/\/uploads\/(.+)$/);
        if (match) {
          return "/" + match[1]; // Adds a leading slash to the extracted path
        }
        return null; // Returns null if no match is found
      }

      const bodyData = new FormData();
      bodyData.append("original_clip", String(extractUploadsPath(clip_url)));
      bodyData.append(
        "clip_to_combine",
        String(extractUploadsPath(previewUrl))
      );
      bodyData.append("user_id", user?.id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/split-screen`,
        {
          method: "POST",
          body: bodyData,
        }
      );

      const resData = await res.json();

      console.log("combined response : ", resData);

      if (resData?.success) {
        setIsCombined(true);
        setCombinedClip(resData?.data);
        setVideoRenderKey(videoRenderKey + 1);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "default",
        description: `An error occurred during file upload`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelect = (url) => {
    setThumbnail(url);
  };

  useEffect(() => {
    setAssets(featured_assets.concat(public_assets));
  }, [user?.id]);

  useEffect(() => {
    console.log("combinedClip?.location : ", combinedClip?.location);
  }, [combinedClip]);

  return (
    isSignedIn &&
    isLoaded && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full !h-full bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all py-4 px-4 rounded flex flex-col items-center justify-start gap-x-2 border-none text-sm font-light"
          >
            <MdOutlineSplitscreen  className="text-[#fff] !text-2xl scale-150" />
            Split Screen
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] md:max-w-3xl lg::max-w-3xl h-[90vh] mx-auto !bg-[#000000] border-none flex flex-col gap-y-0 items-start justify-start">
          <div className="flex flex-col justify-center w-full mt-10 gap-x-6 relative flex-wrap xl:flex-nowrap">
            {/* <div className="w-full xl:w-4/12 border-none xl:border-r border-[#4385c2]/20 flex-grow min-h-auto">
                            <div className="w-full">
                                <div className="bg-[#235a8d]/40 backdrop-blur-2xl w-fit xl:w-[70%] mx-auto text-center py-2 rounded-lg relative cursor-pointer">
                                    <div className="text-[#61a6e7] text-center text-sm flex items-center gap-x-2 px-4">
                                        <MdOutlineSplitscreen />

                                        Split Screen Effect
                                    </div>
                                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-cyan-500/20 w-full rounded-lg blur-md">

                                    </div>
                                </div>
                            </div>
                        </div> */}

            <div className="w-full h-full">
              {!isCombined && (
                <Video className="w-full h-64 rounded-2xl">
                  <source src={`${clip_url}`} type="video/mp4" className="" />
                </Video>
              )}

              {!isCombined ? (
                <div className="w-full mt-6">
                  {!selectedFile && (
                    <div className="flex items-center gap-x-1 bg-gray-50/10 hover:bg-gray-100/10 h-fit px-4 rounded-lg">
                      <FaRegPaste className="text-gray-200" />

                      <input
                        type="text"
                        placeholder="Paste public id here"
                        className="w-full py-2 px-4 rounded-lg bg-transparent mt-0 focus:ring-0 outline-none border-none text-gray-200"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  )}

                  {!publicAssetExists && !selectedFile && (
                    <div className="flex items-center justify-center mt-2 text-gray-500">
                      Or
                    </div>
                  )}

                  <label
                    htmlFor="dropzone-file"
                    className="mt-2 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300/5 rounded-3xl cursor-pointer bg-gray-50/5 hover:bg-gray-100/10 dark:border-gray-600 dark:hover:border-gray-500 relative transition-all duration-150 ease-in-out"
                  >
                    {!isUploading && (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-xs lg:text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center text-center flex-col 2xl:flex-row">
                          <span className="font-semibold">Click to upload</span>{" "}
                          <span className="ml-0 2xl:ml-2">
                            or drag and drop
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          Video files only
                        </p>
                      </div>
                    )}

                    {isUploading && (
                      <div className="w-full flex flex-col items-center justify-center mt-4">
                        <div className="flex flex-col items-center gap-x-2 text-neutral-500 text-sm">
                          <ImSpinner3 className="animate-spin text-3xl" />
                          <span className="font-semibold mt-2">
                            {isUploading && "Uploding"}
                          </span>
                        </div>

                        <div className="flex gap-x-2 gap-y-1 items-center justify-center text-xs mt-2 text-white bg-[#4F46E4] rounded-lg px-4 py-1">
                          <span>ETA:</span>
                          <span>2-3 Minutes</span>
                        </div>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="video/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      disabled={isUploading || previewUrl}
                      required
                    />

                    {previewUrl && (
                      <div
                        key={videoRenderKey}
                        className="absolute top-0 left-0 right-0 bottom-0"
                      >
                        <Video className="w-full h-64 rounded-2xl">
                          <source
                            src={`${previewUrl}`}
                            type="video/mp4"
                            className=""
                          />
                        </Video>
                      </div>
                    )}
                  </label>

                  <div className="mt-2 w-full flex items-center gap-x-2">
                    <button
                      disabled={isUploading}
                      onClick={() => {
                        if (publicAssetExists) {
                          handleUploadPublicAsset();
                        } else {
                          handleUpload();
                        }
                      }}
                      className="flex items-center justify-center bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all z-10 w-full py-2 px-4 rounded-lg gap-x-2"
                    >
                      {isUploading ? (
                        <ImSpinner3 className="animate-spin text-xl" />
                      ) : (
                        <TbAssembly />
                      )}

                      {!isUploading && "Combine video"}
                    </button>

                    {selectedFile && (
                      <button
                        onClick={() => handleClear()}
                        className="mt-4 mb-4 px-4 py-3 bg-red-600/50 text-white !text-xs rounded-lg hover:bg-red-700 flex items-center gap-x-2 transition-all duration-300 ease-in-out"
                        disabled={isUploading}
                      >
                        <RxCross1 />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div key={videoRenderKey} className="w-full relative h-full">
                  <div>
                    <Video className="w-full h-64 rounded-2xl">
                      <source
                        src={`${combinedClip?.location}`}
                        type="video/mp4"
                        className=""
                      />
                    </Video>
                  </div>
                  {/* <PublishClipModal asset_url={combinedClip?.location} thumbnails={combinedClip?.thumbnails} /> */}
                  <SaveEditClip
                    asset_url={combinedClip?.location}
                    v={combinedClip}
                    thumbnails={combinedClip?.thumbnails}
                    fetchFreshNewVideos={fetchFreshNewVideos}
                    selectedFilter={selectedFilter}
                    videos={videos}
                    setVideos={setVideos}
                    filteredVideos={filteredVideos}
                    setFilteredVideos={setFilteredVideos}
                    videoRenderKey={videoRenderKeyContainer}
                    setVideoRenderKey={setVideoRenderKeyContainer}
                    isOpenEditClipModal={isOpen}
                    setIsOpenEditClipModal={setIsOpen}
                    popoverOpen={popoverOpen}
                    setPopoverOpen={setPopoverOpen}
                  />
                  {/* <ExportedVideoPreviews socialExportedVideoRenderKey={1} videoPaths={[combinedClip]} gridClassName={"!grid-cols-1 lg:!grid-cols-1"} editClip={true} /> */}
                </div>
              )}
            </div>
          </div>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default EditClipModal;
