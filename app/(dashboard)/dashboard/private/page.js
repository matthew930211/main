"use cache";

import VideosContainer from "@/components/DashboardPage/VideosContainer/VideosContainer";
import { MdCollections, MdOutlinePublish, MdRebaseEdit } from "react-icons/md";
import { auth } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LibraryPage = async () => {
  const { userId } = await auth();

  return (
    <div className="w-[90%] lg:w-full mx-auto">
      <div className="border-b border-[#162845]/50 pb-4 flex flex-col gap-y-2">
        <h1 className="flex items-center gap-x-2 font-semibold text-[#FDFFFF] text-2xl md:text-3xl lg:text-4xl pt-6 pb-0 flex-wrap md:flex-nowrap mb-0 ">
          <MdCollections className="text-[#FDFFFF] text-3xl lg:text-3xl xl:text-4xl" />
          Your Library
        </h1>
        <p className="text-gray-400">
          All your private draft clips are here for editing and publishing
        </p>
      </div>

      <div className="mt-6">
        <VideosContainer userId={userId} asset_status={"DRAFT"} />
      </div>
    </div>
  );
};

export default LibraryPage;
