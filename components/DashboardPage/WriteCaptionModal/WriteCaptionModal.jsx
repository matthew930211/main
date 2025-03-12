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
import { BiImport } from "react-icons/bi";
// import CreateTitleModal from '../CreateTitleModal/CreateTitleModal';
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const WriteCaptionModal = ({ clip, clips, setClips, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/write-caption`,
        {
          caption: caption,
          user_id: user?.id,
          clip_id: clip?._id,
        }
      );

      const data = res?.data;

      if (data?.success) {
        const filterArr = clips?.map((item) => {
          if (item?._id === clip?._id) {
            // Perform the update logic here
            return {
              ...item, // Keep all existing fields
              caption: data?.clip?.caption || clip?.caption,
            };
          }
          // Return the item unchanged if no match
          return item;
        });

        setClips(filterArr);

        toast({
          variant: "default",
          description: "Caption Updated",
          action: (
            <div className="!bg-[#39b64e]/80 p-1 flex items-center justify-center rounded-full">
              <FaCheck className="!text-[#FDFFFF]" />
            </div>
          ),
        });
        setIsUpdating(false);
      }
    } catch (err) {
      console.log(err);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    console.log("setting caption : ", clip?.caption);
    setCaption(clip?.caption);
  }, []);

  return (
    <div className={cn("", className)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full !h-full bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 transition-all py-4 px-4 rounded flex flex-col items-center justify-start gap-x-2 border-none text-sm font-light"
          >
            <FaRegClosedCaptioning className="text-[#fff] !text-2xl scale-150" />
            Write Caption
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] md:max-w-[500px] min-h-[85vh] bg-black/95 border border-white/10 backdrop-blur-sm text-white">
          <div className="w-full">
            <Video className="w-full h-[400px] rounded-3xl mt-4">
              <source src={`${clip?.location}`} type="video/mp4" className="" />
            </Video>
          </div>

          <div className="flex items-center gap-x-2">
            <FaRegClosedCaptioning className="text-sm" />
            <h4 className="text-neutral-400 text-xs">Write Caption</h4>
          </div>

          <form onSubmit={handleUpdate} className="-mt-6">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-[#fff]/10 text-white rounded-md px-4 py-3 text-sm focus:ring-0 outline-none min-h-[10vh]"
              placeholder="Your Caption"
            ></textarea>
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

export default WriteCaptionModal;
