'use client'

import { useState, useEffect } from 'react'
import { 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  User2,
  Layout,
  Scissors,
  Crown,
  Copy,
  Globe,
  Lock,
  Share2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSidebar({ 
  className,
  isOpen,
  setIsOpen
}) {
  const [collapsed, setCollapsed] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof isOpen !== 'undefined') {
      setCollapsed(!isOpen)
    }
  }, [isOpen])

  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(!collapsed)
    }
  }, [collapsed, setIsOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCollapsed(false)
      } else {
        setCollapsed(true)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <div 
        className={cn(
          "fixed flex flex-col h-screen bg-[#0F1117] border-r border-white/10 transition-all duration-300 z-30",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-[80px]" : "w-[260px]",
          className
        )}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <User2 size={16} className="text-white" />
            </div>
            {!collapsed && <span>fieryssh</span>}
          </Link>
        </div>
        
        <div className="flex-1 px-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              {!collapsed && (
                <h2 className="mb-2 px-2 text-xs tracking-wider text-gray-500 uppercase">Main</h2>
              )}
              <div className="space-y-1">
                <Link href="/">
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
                      collapsed && "justify-center px-2",
                      pathname === "/" && "bg-white/5 text-white"
                    )}
                  >
                    <Layout size={16} />
                    {!collapsed && "Overview"}
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              {!collapsed && (
                <h2 className="mb-2 px-2 text-xs tracking-wider text-gray-500 uppercase">Generate</h2>
              )}
              <div className="space-y-1">
                <Link href="/copy">
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
                      collapsed && "justify-center px-2",
                      pathname === "/copy" && "bg-white/5 text-white"
                    )}
                  >
                    <Copy size={16} />
                    {!collapsed && "Copy Clips"}
                    {!collapsed && <span className="ml-auto text-xs bg-indigo-600/20 text-indigo-400 px-1.5 py-0.5 rounded">Paid</span>}
                  </Button>
                </Link>
                <Link href="/generate">
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
                      collapsed && "justify-center px-2",
                      pathname === "/generate" && "bg-white/5 text-white"
                    )}
                  >
                    <Scissors size={16} />
                    {!collapsed && "Generate Clips"}
                    {!collapsed && <span className="ml-auto text-xs bg-green-600/20 text-green-400 px-1.5 py-0.5 rounded">Free</span>}
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              {!collapsed && (
                <h2 className="mb-2 px-2 text-xs tracking-wider text-gray-500 uppercase">Library</h2>
              )}
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Globe size={16} />
                  {!collapsed && "Public"}
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Lock size={16} />
                  {!collapsed && "Private"}
                </Button>
              </div>
            </div>

            <div>
              {!collapsed && (
                <h2 className="mb-2 px-2 text-xs tracking-wider text-gray-500 uppercase">Clips</h2>
              )}
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Share2 size={16} />
                  {!collapsed && "Published Clips"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
              collapsed && "justify-center px-2"
            )}
          >
            <Settings size={16} />
            {!collapsed && "Settings"}
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5",
              collapsed && "justify-center px-2"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!collapsed && "Collapse"}
          </Button>
          <div className={cn(
            "flex items-center gap-2 p-3 bg-[#1a1d27]/50 rounded-lg",
            collapsed && "flex-col"
          )}>
            {!collapsed && (
              <div className="flex-1">
                <div className="text-sm text-gray-400">Free Plan</div>
              </div>
            )}
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
            >
              <Crown size={14} />
              {!collapsed && "Upgrade"}
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed bottom-4 right-4 lg:hidden z-30 p-3 bg-[#0F1117] rounded-full shadow-lg border border-white/10"
      >
        {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
    </>
  )
}

