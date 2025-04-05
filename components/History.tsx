import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { PiHandWithdrawDuotone } from 'react-icons/pi'
import { MdApproval } from 'react-icons/md'
import { FaWallet } from 'react-icons/fa'
import { DataTable } from './DataTable'
import { columns} from '@/lib/deposits'

const History = () => {
  return (
    <div id="main" className="main-content flex-1 h-full bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
      
      
        <div className="bg-gray-800 pt-3">
            <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
              <h1 className="font-bold pl-2">Withdraw Fund</h1>
            </div>
          </div>
        <div className="flex w-full flex-wrap">
          <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
            <div className='bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5'>
              <div className="flex flex-row items-center">

                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-green-600"><FaWallet className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">

                  <h2 className='font-bold uppercase text-gray-600'>Main Balance </h2>
                  <p className='font-bold text-3xl'>{'$190'}</p>
                </div>
              </div>

            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
            <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-blue-600"><MdApproval className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Total Withdrawal</h2>
                  <p className="font-bold text-3xl">$152</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">

              <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-yellow-600"><PiHandWithdrawDuotone className='text-3xl text-white' /></div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">Available Withdraw</h2>
                    <p className="font-bold text-3xl">$1739 <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>
                  </div>
                </div>
              </div>

            </div>
        </div>
        <div>
        {/* <DataTable columns={columns} data={deposits} /> */}
        </div>
      
    </div>
  )
}

export default History