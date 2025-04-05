import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { FaWallet } from 'react-icons/fa'
import { PiHandWithdraw, PiHandWithdrawDuotone } from 'react-icons/pi'
import { MdApproval } from 'react-icons/md'
import WithdrawForm from './WithdrawForm'

const Withdraw = () => {
  return (
    <div id="main" className="main-content flex-1 bg-slate-50 mt-12 md:mt-2 pb-24 md:pb-5">
      
      
        <div className="bg-gray-800 pt-3">
            <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
              <h1 className="font-bold pl-2">Withdraw Fund</h1>
            </div>
          </div>
        
        <div>
          {/* <Card>
            <CardHeader>
              <CardTitle><h3>Withdraw Fund</h3></CardTitle>
              <p>PLease provide where your fund should be sent to below</p>
            </CardHeader>
            <CardContent>

            </CardContent>
          </Card> */}

          <WithdrawForm />
        </div>
      
    </div>
  )
}

export default Withdraw