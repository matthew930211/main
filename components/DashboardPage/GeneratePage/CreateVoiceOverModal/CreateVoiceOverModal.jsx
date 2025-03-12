"use client";

import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import {
  FaFileInvoice,
  FaRegClipboard,
  FaRegClosedCaptioning,
} from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import { BiError, BiImport } from "react-icons/bi";
// import CreateTitleModal from '../CreateTitleModal/CreateTitleModal';
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { AiOutlineAudio, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiChatVoiceLine, RiUserVoiceLine } from "react-icons/ri";
import { MdKeyboardVoice } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoFilter, IoMaleFemale } from "react-icons/io5";
import SaveEditClip from "../../EditClipModal/SaveEditClip";
import { checkSubscription } from "@/lib/actions/checkSubscription";
import { checkUserQuota } from "@/lib/actions/checkUserQuota";
import { ImFontSize } from "react-icons/im";

const CreateVoiceOverModal = ({
  clip,
  clips,
  setClips,
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
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceScript, setVoiceScript] = useState("");
  const [font, setFont] = useState("");
  const [audioVolumeRatio, setAudioVolumeRatio] = useState(0);
  const [videoVolumeRatio, setVideoVolumeRatio] = useState(0);
  const [captionPosition, setCaptionPosition] = useState("");
  const [captionVisibility, setCaptionVisibility] = useState("");
  const [voiceType, setVoiceType] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [newVideo, setNewVideo] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [videoRenderKey, setVideoRenderKey] = useState(1);

  const { toast } = useToast();
  const { user } = useUser();

  function extractUploadsPath(url) {
    const match = url.match(/\/uploads\/(.+)$/);
    if (match) {
      return "/" + match[1]; // Adds a leading slash to the extracted path
    }
    return null; // Returns null if no match is found
  }

  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Base36 representation of the current timestamp
    const randomPart = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
    return `${timestamp}-${randomPart}`;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    if (!voiceScript) {
      toast({
        variant: "default",
        description: `Please write your voiceover script`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      setIsUpdating(false);
      return;
    }

    if (!audioVolumeRatio) {
      toast({
        variant: "default",
        description: `Please select audio volume`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      setIsUpdating(false);
      return;
    }

    if (!videoVolumeRatio) {
      toast({
        variant: "default",
        description: `Please select video volume`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      setIsUpdating(false);
      return;
    }

    if (!voiceType) {
      toast({
        variant: "default",
        description: `Please select your voice type`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      setIsUpdating(false);
      return;
    }

    if (!captionVisibility) {
      toast({
        variant: "default",
        description: `Please select caption on/off`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      setIsUpdating(false);
      return;
    }

    if (captionVisibility === "on") {
      if (!captionPosition) {
        toast({
          variant: "default",
          description: `Please select caption position`,
          action: (
            <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
              <BiError className="!text-[#FDFFFF]" />
            </div>
          ),
        });
        setIsUpdating(false);
        return;
      }

      if (!font) {
        toast({
          variant: "default",
          description: `Please select caption font`,
          action: (
            <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
              <BiError className="!text-[#FDFFFF]" />
            </div>
          ),
        });
        setIsUpdating(false);
        return;
      }
    }

    try {
      const isPro = await checkSubscription(user?.id);
      const checkQuotaStatus = await checkUserQuota(
        isPro,
        user?.id,
        "create_voice_over_scripts_count",
        1
      );

      if (checkQuotaStatus) {
        const formData = new FormData();
        formData.append("url", String(extractUploadsPath(clip?.location)));
        formData.append("user_id", user?.id);
        formData.append("text", voiceScript);
        formData.append("voice_id", voiceType);
        formData.append("position_option", captionPosition);
        formData.append("caption_visibility", captionVisibility);
        formData.append("font", font);
        formData.append("font_size", 24);
        formData.append("font_color", "white");
        formData.append("audio_volume_ratio", audioVolumeRatio);
        formData.append("video_volume_ratio", videoVolumeRatio);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/create-voice-over`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const data = await response.json();
        console.log("voice_over : ", data);

        if (data?.success) {
          setIsUpdating(false);
          setNewVideo({ ...data?.data });
          setIsCreated(true);
          videoRenderKey(videoRenderKey + 1);
        } else {
          setIsUpdating(false);
        }
      }
    } catch (err) {
      console.log("err", err);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    console.log("setting caption : ", clip?.caption);
    setVoiceScript(clip?.voice_script);
  }, []);

  return (
    <div className={cn("", className)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full !h-full bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all py-4 px-4 rounded flex flex-col items-center justify-start gap-x-2 border-none text-sm font-light"
          >
            <MdKeyboardVoice className="text-[#fff] !text-2xl scale-150" />
            Create Voice-over
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] md:max-w-[500px] min-h-[85vh] bg-black/95 border border-white/10 backdrop-blur-sm text-white">
          {/* 
                    <div className='w-full'>
                        <Video className="w-full h-[400px] rounded-3xl mt-4">
                            <source src={`${clip?.location}`} type='video/mp4' className='' />
                        </Video>
                    </div>
                     */}

          <form onSubmit={handleUpdate} className="mt-6">
            <div className="flex items-center gap-x-2 mb-4">
              <RiUserVoiceLine className="text-sm" />
              <h4 className="text-neutral-400 text-xs">
                Write Your Voice-over Script
              </h4>
            </div>
            <textarea
              value={voiceScript}
              onChange={(e) => setVoiceScript(e.target.value)}
              className="w-full bg-[#fff]/10 text-white rounded-md px-4 py-3 text-sm focus:ring-0 outline-none min-h-[10vh]"
              placeholder="Your voice-over script"
            ></textarea>

            <div className="w-full flex items-center gap-x-2">
              <Select
                onValueChange={(value) => setAudioVolumeRatio(Number(value))}
                className=""
              >
                <SelectTrigger className="w-1/2 text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 !bg-[#333]/50 !drop-shadow-none py-4 px-4 rounded-md">
                  <div className="flex items-center gap-x-2 py-2">
                    <AiOutlineAudio />
                    <SelectValue className="" placeholder="Audio Volume" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"0.1"}>
                    <div className="flex items-center gap-x-2">10%</div>
                  </SelectItem>
                  <SelectItem value={"0.2"}>
                    <div className="flex items-center gap-x-2">20%</div>
                  </SelectItem>
                  <SelectItem value={"0.3"}>
                    <div className="flex items-center gap-x-2">30%</div>
                  </SelectItem>
                  <SelectItem value={"0.4"}>
                    <div className="flex items-center gap-x-2">40%</div>
                  </SelectItem>
                  <SelectItem value={"0.5"}>
                    <div className="flex items-center gap-x-2">50%</div>
                  </SelectItem>
                  <SelectItem value={"0.6"}>
                    <div className="flex items-center gap-x-2">60%</div>
                  </SelectItem>
                  <SelectItem value={"0.7"}>
                    <div className="flex items-center gap-x-2">70%</div>
                  </SelectItem>
                  <SelectItem value={"0.8"}>
                    <div className="flex items-center gap-x-2">80%</div>
                  </SelectItem>
                  <SelectItem value={"0.9"}>
                    <div className="flex items-center gap-x-2">90%</div>
                  </SelectItem>
                  <SelectItem value={"1.0"}>
                    <div className="flex items-center gap-x-2">100%</div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => setVideoVolumeRatio(Number(value))}
                className=""
              >
                <SelectTrigger className="w-1/2 text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 !bg-[#333]/50 !drop-shadow-none py-4 px-4 rounded-md">
                  <div className="flex items-center gap-x-2 py-2">
                    <AiOutlineAudio />
                    <SelectValue className="" placeholder="Video Volume" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"0.1"}>
                    <div className="flex items-center gap-x-2">10%</div>
                  </SelectItem>
                  <SelectItem value={"0.2"}>
                    <div className="flex items-center gap-x-2">20%</div>
                  </SelectItem>
                  <SelectItem value={"0.3"}>
                    <div className="flex items-center gap-x-2">30%</div>
                  </SelectItem>
                  <SelectItem value={"0.4"}>
                    <div className="flex items-center gap-x-2">40%</div>
                  </SelectItem>
                  <SelectItem value={"0.5"}>
                    <div className="flex items-center gap-x-2">50%</div>
                  </SelectItem>
                  <SelectItem value={"0.6"}>
                    <div className="flex items-center gap-x-2">60%</div>
                  </SelectItem>
                  <SelectItem value={"0.7"}>
                    <div className="flex items-center gap-x-2">70%</div>
                  </SelectItem>
                  <SelectItem value={"0.8"}>
                    <div className="flex items-center gap-x-2">80%</div>
                  </SelectItem>
                  <SelectItem value={"0.9"}>
                    <div className="flex items-center gap-x-2">90%</div>
                  </SelectItem>
                  <SelectItem value={"1.0"}>
                    <div className="flex items-center gap-x-2">100%</div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full flex items-center gap-x-2 mt-2">
              <Select
                onValueChange={(value) => setVoiceType(value)}
                className=""
              >
                <SelectTrigger className="w-1/2 text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 !bg-[#333]/50 !drop-shadow-none py-4 px-4 rounded-md">
                  <div className="flex items-center gap-x-2 py-2">
                    <IoMaleFemale />
                    <SelectValue className="" placeholder="Voice Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"pNInz6obpgDQGcFmaJgB"}>
                    <div className="flex items-center gap-x-2">Male</div>
                  </SelectItem>
                  <SelectItem value={"XB0fDUnXU5powFXDhCwa"}>
                    <div className="flex items-center gap-x-2">Female</div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => setCaptionVisibility(value)}
                className=""
              >
                <SelectTrigger className="w-1/2 text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 !bg-[#333]/50 !drop-shadow-none py-4 px-4 rounded-md">
                  <div className="flex items-center gap-x-2 py-2">
                    <FaRegClosedCaptioning />
                    <SelectValue className="" placeholder="Caption On/Off" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"on"}>
                    <div className="flex items-center gap-x-2">On</div>
                  </SelectItem>
                  <SelectItem value={"off"}>
                    <div className="flex items-center gap-x-2">Off</div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex items-center gap-x-2 mt-2">
              <Select
                onValueChange={(value) => setCaptionPosition(value)}
                className=""
              >
                <SelectTrigger className="w-1/2 text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 !bg-[#333]/50 !drop-shadow-none py-4 px-4 rounded-md">
                  <div className="flex items-center gap-x-2 py-2">
                    <FaRegClosedCaptioning />
                    <SelectValue className="" placeholder="Caption Position" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"top"}>
                    <div className="flex items-center gap-x-2">Top</div>
                  </SelectItem>
                  <SelectItem value={"center"}>
                    <div className="flex items-center gap-x-2">Center</div>
                  </SelectItem>
                  <SelectItem value={"bottom"}>
                    <div className="flex items-center gap-x-2">Bottom</div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setFont(value)} className="">
                <SelectTrigger className="w-1/2 text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 !bg-[#333]/50 !drop-shadow-none py-4 px-4 rounded-md">
                  <div className="flex items-center gap-x-2 py-2">
                    <ImFontSize />
                    <SelectValue className="" placeholder="Font" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"AvantGarde-Book"}>
                    <div className="flex items-center gap-x-2">AvantGarde</div>
                  </SelectItem>
                  <SelectItem value={"Helvetica"}>
                    <div className="flex items-center gap-x-2">Helvetica</div>
                  </SelectItem>
                  <SelectItem value={"Times-Roman"}>
                    <div className="flex items-center gap-x-2">Times-Roman</div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              size="sm"
              variant="outline"
              disabled={isUpdating}
              className="w-full mt-2 flex-1 bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all z-10"
            >
              {isUpdating ? (
                <AiOutlineLoading3Quarters className="text-white animate-spin" />
              ) : (
                "Create Voice-over"
              )}
            </Button>
          </form>

          <DialogFooter>
            {isCreated && !isUpdating && newVideo && (
              <div key={videoRenderKey} className="w-full">
                <Video className="w-full h-[400px] rounded-3xl mt-4">
                  <source
                    src={`${newVideo?.location}`}
                    type="video/mp4"
                    className=""
                  />
                </Video>
                <SaveEditClip
                  asset_url={newVideo?.location}
                  v={newVideo}
                  thumbnails={newVideo?.thumbnails}
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
                  quota_type={"create_voice_over_scripts_count"}
                  generatedCounts={1}
                />
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateVoiceOverModal;
