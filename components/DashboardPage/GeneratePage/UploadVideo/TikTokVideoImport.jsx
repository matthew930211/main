import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Clock, Film, Loader2, Play } from 'lucide-react'
import React from 'react'
import { FaTiktok } from 'react-icons/fa'
import { ImSpinner3 } from 'react-icons/im'

const TikTokVideoImport = ({ socialExportedVideoRenderKey, isImportingSocialVideo, setIsImportingSocialVideo, socialVideoLink, setSocialVideoLink, handleSocialVideoImport }) => {
    return (
        <div className="w-full mt-9">
            <div className={cn(
                "p-6 bg-black/20 backdrop-blur-sm rounded-xl border-[3px] border-dashed border-white/10 transition-all min-h-[160px] flex items-center justify-center",
                socialVideoLink ? "border-2" : "border-white/5"
            )}>
                <div className="flex flex-col items-center gap-6 max-w-xl mx-auto w-full">
                    <div className="w-16 h-16 bg-[#1D1B4C] rounded-xl flex items-center justify-center">
                        {isImportingSocialVideo ? (
                            <Loader2 className="w-8 h-8 text-[#7274C9] animate-spin" />
                        ) : (
                            <FaTiktok className="w-8 h-8 text-[#7274C9]" />
                        )}
                    </div>
                    <div className="text-center w-full space-y-6">
                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">
                                {isImportingSocialVideo ? 'Importing...' : 'Import from TikTok'}
                            </h3>
                            <p className="text-sm text-gray-400">
                                Save videos from TikTok easily by pasting your link here
                            </p>
                        </div>

                        <div className="space-y-4">
                            <form onSubmit={handleSocialVideoImport} className="flex gap-2">
                                <Input
                                    type="url"
                                    placeholder="Paste TikTok URL here"
                                    className="bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                                    value={socialVideoLink}
                                    onChange={(e) => setSocialVideoLink(e.target.value)}
                                    disabled={isImportingSocialVideo}
                                />
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-b from-[#494781] to-[#7274C9]/80 hover:from-[#494781]/70 hover:to-[#7274C9]/70 text-white whitespace-nowrap"
                                    disabled={isImportingSocialVideo || !socialVideoLink}
                                >
                                    {isImportingSocialVideo ? 'Importing...' : 'Import'}
                                </Button>
                            </form>

                            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 flex-wrap lg:flex-nowrap">
                                <span className="flex items-center">
                                    <Play className="w-4 h-4 mr-1" /> Any TikTok Video
                                </span>
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" /> Full Video
                                </span>
                                <span className="flex items-center">
                                    <Film className="w-4 h-4 mr-1" /> Single File
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TikTokVideoImport