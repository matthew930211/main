import React from 'react'
import ImportAssetModal from './ImportAssetModal'
import { assets } from '@/data/community_creations'

const PublicLibraryAssets = () => {



    return (
        <div className='grid grid-rows-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-2 mt-6'>
            {
                assets?.length > 0 && assets?.map((item, index) => (
                    <ImportAssetModal key={index} title={item?.title} url={item?.url} cover={item?.cover} category={item?.category} source={item?.source} id={item?.id}
                        className={`
                            ${index === 0 && "h-full row-span-1 xl:row-span-3"} 
                            ${index === 1 && "h-full row-span-1 xl:row-span-2"} 
                            ${index === 2 && "h-full row-span-1 xl:row-span-3"} 
                            ${index === 3 && "h-full row-span-1 xl:row-span-1"}
                            ${index === 4 && "h-full row-span-1 xl:row-span-4"}
                            ${index === 5 && "h-full row-span-1 xl:row-span-2"}  
                            ${index === 6 && "h-full row-span-1 xl:row-span-2"}  
                            ${index === 7 && "h-full row-span-1 xl:row-span-1"}  
                            ${index === 8 && "h-full col-span-1 xl:col-span-2"}  
                            ${index === 9 && "h-full row-span-1 xl:row-span-1"}  
                            ${index === 10 && "h-full row-span-1 xl:row-span-2"}  
                            ${index === 11 && "h-full col-span-1 xl:col-span-2"}  
                            ${index === 11 && "h-full col-span-1 xl:col-span-2"}  
                            `} />
                ))
            }
        </div>
    )
}

export default PublicLibraryAssets