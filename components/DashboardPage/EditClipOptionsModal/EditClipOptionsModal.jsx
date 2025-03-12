"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { FaVideo } from "react-icons/fa6";
import EditClipModal from "../EditClipModal/EditClipModal";
import WriteCaptionModal from "../WriteCaptionModal/WriteCaptionModal";
import EditLengthModal from "../GeneratePage/EditLengthModal/EditLengthModal";
import CreateVoiceOverModal from "../GeneratePage/CreateVoiceOverModal/CreateVoiceOverModal";

const EditClipOptionsModal = ({
  v,
  clip_url,
  fetchFreshNewVideos,
  videos,
  setVideos,
  filteredVideos,
  setFilteredVideos,
  selectedFilter,
  videoRenderKey,
  setVideoRenderKey,
  videoRenderKeyContainer,
  setVideoRenderKeyContainer,
  popoverOpen,
  setPopoverOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="grow mt-2 bg-white/10 text-white hover:text-white hover:bg-white/20 py-2 px-3 rounded flex items-center justify-start gap-x-2 transition-all duration-200 text-sm !border-0"
        >
          <FaVideo />
          Edit Clip
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-3xl lg::max-w-3xl h-[50vh] sm:h-[40vh] mx-auto !bg-[#000000] border-none flex flex-col gap-y-0 items-start justify-start overflow-y-auto">
        <h3 className="text-neutral-200 flex items-center gap-x-2 text-sm">
          <FaVideo />
          Edit Your Clip
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
          <EditClipModal
            clip_url={v?.location}
            fetchFreshNewVideos={fetchFreshNewVideos}
            selectedFilter={selectedFilter}
            videos={videos}
            setVideos={setVideos}
            filteredVideos={filteredVideos}
            setFilteredVideos={setFilteredVideos}
            videoRenderKey={videoRenderKey}
            setVideoRenderKey={setVideoRenderKey}
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
          />
          <WriteCaptionModal
            clip={v}
            clips={!selectedFilter ? videos : filteredVideos}
            setClips={!selectedFilter ? setVideos : setFilteredVideos}
          />
          <EditLengthModal
            clip={v}
            clips={!selectedFilter ? videos : filteredVideos}
            setClips={!selectedFilter ? setVideos : setFilteredVideos}
          />
          <CreateVoiceOverModal
            clip={v}
            clips={!selectedFilter ? videos : filteredVideos}
            setClips={!selectedFilter ? setVideos : setFilteredVideos}
            clip_url={v?.location}
            fetchFreshNewVideos={fetchFreshNewVideos}
            selectedFilter={selectedFilter}
            videos={videos}
            setVideos={setVideos}
            filteredVideos={filteredVideos}
            setFilteredVideos={setFilteredVideos}
            videoRenderKeyContainer={videoRenderKey}
            setVideoRenderKeyContainer={setVideoRenderKey}
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditClipOptionsModal;
