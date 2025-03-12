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
import { FaRegClipboard, FaRegClosedCaptioning } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import { BiError, BiImport } from "react-icons/bi";
// import CreateTitleModal from '../CreateTitleModal/CreateTitleModal';
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiDuration } from "react-icons/gi";
import { Input } from "@/components/ui/input";

const EditLengthModal = ({ clip, clips, setClips, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [startDuration, setStartDuration] = useState(0);
  const [endDuration, setEndDuration] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const { toast } = useToast();
  const { user } = useUser();

  const copyToClipboard = async (text) => {
    console.log("clipboard : ", text);
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        variant: "default",
        action: (
          <div className="!bg-[#3faa56] p-1 flex items-center justify-center rounded-full">
            <FaCheck className="!text-[#FDFFFF]" />
          </div>
        ),
      });
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // const res = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/write-caption`, {
      //     caption: caption, user_id: user?.id, clip_id: clip?._id
      // })

      function extractUploadsPath(url) {
        const match = url.match(/\/uploads\/(.+)$/);
        if (match) {
          return "/" + match[1];
        }
        return null;
      }

      const bodyData = new FormData();
      bodyData.append("url", String(extractUploadsPath(clip?.location)));
      bodyData.append("user_id", user?.id);
      bodyData.append("start_time", startDuration);
      bodyData.append("end_time", endDuration);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/trim-video`,
        {
          method: "POST",
          body: bodyData,
        }
      );

      const data = await res.json();

      if (data?.success) {
        // const filterArr = clips?.map(item => {
        //     if (item?._id === clip?._id) {
        //         return {
        //             ...item,
        //             caption: data?.clip?.caption || clip?.caption
        //         };
        //     }
        //     return item;
        // })

        // setClips(filterArr)

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/trim-video`,
          {
            duration: data?.data?.duration,
            location: data?.data?.location,
            user_id: user?.id,
            clip_id: clip?._id,
          }
        );

        const res_data = response?.data;

        if (res_data?.success) {
          const filterArr = clips?.map((item) => {
            if (item?._id === clip?._id) {
              return {
                ...item,
                location: res_data?.clip?.location || clip?.location,
                video_duration:
                  res_data?.clip?.duration || data?.data?.duration,
              };
            }
            return item;
          });
          setStartDuration(0);
          console.log("after trimming clip : ", res_data);
          setEndDuration(res_data?.clip?.video_duration);
          setClips(filterArr);
          toast({
            variant: "default",
            description: "Clip Updated",
            action: (
              <div className="!bg-[#39b64e]/80 p-1 flex items-center justify-center rounded-full">
                <FaCheck className="!text-[#FDFFFF]" />
              </div>
            ),
          });
          setIsUpdating(false);
          setIsOpen(false);
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "default",
        description: `Something went wrong`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    console.log("setting duration : ", clip?.video_duration);
    setEndDuration(clip?.video_duration);
  }, []);

  return (
    <div className={cn("", className)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full !h-full bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all py-4 px-4 rounded flex flex-col items-center justify-start gap-x-2 border-none text-sm font-light"
          >
            <GiDuration className="text-[#fff] !text-2xl scale-150" />
            Edit Length
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] lg:max-w-[500px] min-h-[85vh] bg-black/95 border border-white/10 backdrop-blur-sm text-white">
          <div className="w-full">
            <Video className="w-full h-[400px] rounded-3xl mt-4">
              <source src={`${clip?.location}`} type="video/mp4" className="" />
            </Video>
          </div>

          <div className="flex items-center gap-x-2">
            <GiDuration className="text-sm" />
            <h4 className="text-neutral-400 text-xs">Edit Length</h4>
          </div>

          <form onSubmit={handleUpdate} className="-mt-6">
            {/* <textarea value={caption} onChange={e => setCaption(e.target.value)} className='w-full bg-[#fff]/10 text-white rounded-md px-4 py-3 text-sm focus:ring-0 outline-none min-h-[10vh]' placeholder='Your Caption'>

                        </textarea> */}

            <div className="w-full flex items-center gap-x-2 gap-y-2 flex-col lg:flex-row mt-4">
              <div className="flex flex-col gap-y-2 w-full lg:w-1/2">
                <label className="text-neutral-100 text-xs">
                  Start {"(s)"}
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-[#fff]/10 text-white rounded-md px-4 py-2.5 text-xs focus:ring-0 outline-none border-none"
                  value={startDuration}
                  min={0}
                  step={0.01}
                  onChange={(e) => {
                    if (
                      e.target.value < clip?.video_duration &&
                      e.target.value >= 0
                    ) {
                      setStartDuration(e.target.value);
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-y-2 w-full lg:w-1/2">
                <label className="text-neutral-100 text-xs">End {"(s)"}</label>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-[#fff]/10 text-white rounded-md px-4 py-2.5 text-xs focus:ring-0 outline-none border-none"
                  value={endDuration}
                  min={0}
                  step={0.01}
                  onChange={(e) => {
                    if (
                      e.target.value <= clip?.video_duration &&
                      e.target.value >= 0
                    ) {
                      setEndDuration(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
            <Button
              type="submit"
              size="sm"
              variant="outline"
              disabled={isUpdating}
              className="w-full mt-4 flex-1 bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all z-10"
            >
              {isUpdating ? (
                <AiOutlineLoading3Quarters className="text-white animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </form>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditLengthModal;
