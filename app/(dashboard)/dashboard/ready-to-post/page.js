'use cache'

import VideosContainer from '@/components/DashboardPage/VideosContainer/VideosContainer'
import { MdCollections, MdOutlinePublish, MdRebaseEdit } from 'react-icons/md'
import { auth } from '@clerk/nextjs/server'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PublishedPage = async () => {
    const { userId } = await auth()

    return (
        <div className=''>
            <div className='border-b border-[#162845]/50 pb-4 flex flex-col gap-y-2'>
                <h1 className='flex items-center gap-x-2 font-semibold text-[#FDFFFF] text-2xl md:text-3xl lg:text-4xl pt-6 pb-0 flex-wrap md:flex-nowrap mb-0'>
                    <MdCollections className='text-[#FDFFFF] text-3xl lg:text-3xl xl:text-4xl' />
                    Ready to post your clips
                </h1>
                <p className="text-gray-400">Post your favourite clips instantly from InstaClip within a minute</p>

            </div>
            
            <div className='mt-6'>
                {/* <VideosContainer userId={userId} asset_status={"DRAFT"} /> */}

                <Tabs defaultValue="draft_clips" className="w-full !bg-transparent">
                    <TabsList className="w-fit bg-[#08090C] flex items-center justify-start gap-x-2 !px-0">
                        <TabsTrigger disabled={false} value="draft_clips" className="w-fit">
                            <div className='flex items-center gap-x-2 text-sm py-1 px-1'>
                                {/* <MdUploadFile className='text-[1.1rem]' /> */}
                                <MdRebaseEdit className='text-[1.1rem]' />

                                Draft Clips
                            </div>
                        </TabsTrigger>
                        <TabsTrigger disabled={false} value="published_clips" className="w-fit">
                            <div className='flex items-center gap-x-2 text-sm py-1 px-1'>
                                {/* <PiYoutubeLogo className='text-[1.1rem]' /> */}
                                <MdOutlinePublish className='text-[1.1rem]' />

                                Published Clips
                            </div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="draft_clips">
                        <VideosContainer userId={userId} asset_status={"DRAFT"} />
                    </TabsContent>

                    <TabsContent value="published_clips">
                        {/* social link input field */}
                        <div className='w-full'>
                            <VideosContainer userId={userId} asset_status={"PUBLISHED"} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default PublishedPage