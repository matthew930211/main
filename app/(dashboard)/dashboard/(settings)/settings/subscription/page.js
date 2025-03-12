import Pricing from '@/components/DashboardPage/SettingsPage/Pricing/Pricing'
import React from 'react'

const SubscriptionPage = () => {
  return (
    <div>
      <h4 className='font-semibold text-white text-2xl md:text-3xl lg:text-xl '>Subscription</h4>
      <p className='text-neutral-500 mt-2'>
        Manage your Subscription and Billing
      </p>

      <div>
          <div className='w-full flex items-center justify-center'>
              <Pricing />
          </div>
      </div>
    </div>
  )
}

export default SubscriptionPage