import React from 'react'
import { FaWallet } from 'react-icons/fa'
import { MdApproval } from 'react-icons/md'
import { PiHandWithdrawDuotone } from 'react-icons/pi'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import PricePlan from './priceplan'

const Packages = () => {
  return (
    <div id="main" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
      
      
        <div className="bg-gray-800 pt-3">
            <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
              <h1 className="font-bold pl-2">Available Packages</h1>
            </div>
          </div>
        <div>
        <PricePlan />
        </div>
      
    </div>
  )
}

export default Packages