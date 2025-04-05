import React from 'react'
import { FaWallet } from 'react-icons/fa'
import { GiProfit } from 'react-icons/gi'
import { MdApproval, MdPending } from 'react-icons/md'
import { PiHandDeposit, PiHandWithdraw } from 'react-icons/pi'
import { DataTable } from './DataTable'
import PricePlan from './priceplan'
import { ITdeposits, Ideposits, columns } from '@/lib/deposits'
import Feature from './Features'
import Footer from './Footer'
import { AccountBalance, Investment } from '@/utils/database/types'
import { IwithDraw } from './Maincontent'

const Home = ({
  balance,
  fetch,
  withDrawals,
  investment
}: {
  balance: AccountBalance,
  fetch: boolean,
  withDrawals: IwithDraw,
  investment: Ideposits | undefined
}) => {
  const processedInvestment = investment
    ? investment.map(pack => {
      let profitPercentage = Number(pack.profit.slice(0, -1))
      const dailyProfitAmount = pack.price * (profitPercentage / 100);

      return ({
        ...pack,
        dailyProfit: '$' + dailyProfitAmount
      })
    } ): []




  return (
    <>
      <div id="main" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
        <div className="bg-gray-800 pt-3">
          <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h1 className="font-bold pl-2">Analytics</h1>
          </div>
        </div>
        <div className="flex w-full flex-wrap">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">

            <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-green-600"><FaWallet className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Main Balance</h2>
                  <div className="font-bold text-3xl flex items-center justify-center"><div className={`${!fetch && 'border-x-4 border-b-4 border-blue-500 border-solid animate-spin rounded-full h-6 w-6'}`}>{fetch && '$' + balance.main_balance }</div></div>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">

            <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-pink-600"><PiHandDeposit className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Available Balance</h2>
                  <p className={`font-bold text-3xl `}><div className={`${!fetch && 'animate-ping border-blue-400 h-11 w-11'}`}>{fetch && '$' + balance.available_balance }</div> <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></p>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">

            <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-yellow-600"><GiProfit className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Total Profit</h2>
                  <p className="font-bold text-3xl"><div className={`${!fetch && 'animate-spin border-b-blue-400 h-11 w-11'}`}>{fetch && '$' + balance.investment_balance }</div><span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">

            <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-blue-600"><PiHandWithdraw className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Last Withdrawal</h2>
                  <p className="font-bold text-3xl"><div className={`${!fetch && 'animate-spin border-b-blue-400 h-11 w-11'}`}>{fetch && '$' + withDrawals.lastWithdrawal }</div></p>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">

            <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-indigo-600"><MdApproval className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Withdrew Total</h2>
                  <p className="font-bold text-3xl"><div className={`${!fetch && 'animate-spin border-b-blue-400 h-11 w-11'}`}>{fetch && '$' + withDrawals.totalWithdrawal }</div></p>
                </div>
              </div>
            </div>


          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">

            <div className="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded-full p-5 bg-red-600"><MdPending className='text-3xl text-white' /></div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h2 className="font-bold uppercase text-gray-600">Pending Withdrawal</h2>
                  <p className="font-bold text-3xl"><div className={`${!fetch && 'animate-spin border-b-blue-400 h-11 w-11'}`}>{fetch && '$' + withDrawals.pendingWithdrawals }</div></p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      <DataTable columns={columns} data={processedInvestment as any} tName='Transanction History' />
      {/* <div className="flex items-center gap-4 justify-center h-screen"><p className='animate-pulse'>please wait...</p>
          <div className="border-x-4 border-blue-500 border-solid animate-spin rounded-full h-6 w-6"></div>
        </div> /> */}
      <Feature />
      <Footer />
    </>
  )
}

export default Home

// 