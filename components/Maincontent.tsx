'use client'

import React, { useEffect, useState } from 'react'
import Home from './Home'
import Withdraw from './withdraw'
import Deposit from './deposit'
import History from './History'
import Packages from './packages'
import ProfilePage from './profilepage'
import SettingsPage from './settingPage'
import NotificationPage from './notifications'
import { getBalance, getInvestment, getWithdrawals } from '@/_actions/crud'
import { AccountBalance, Investment } from '@/utils/database/types'
import { Ideposits } from '@/lib/deposits'

export interface IwithDraw {
  
    lastWithdrawal: number;
    totalWithdrawal: number;
    pendingWithdrawals: number;
}

 function Maincontent({currentPage}:{currentPage: string}) {
  const [balance,  setBalance] = useState({
    id: '',
    user_id: '',
    main_balance: 0,
    available_balance: 0,
    withdrawable_balance: 0,
    investment_balance: 0,
    updated_at: '',
  })

  const [fetch, setFetch] = useState(false)
  const [investment, setInvestment] = useState<Ideposits>()
  const [withDrawals, setwithDrawals] = useState<IwithDraw>({
    lastWithdrawal: 0,
    totalWithdrawal: 0,
    pendingWithdrawals: 0
  })

  useEffect(()=>{
    async function acc_bal(){

      try {
        const newBalance = await getBalance()
        if (newBalance) setBalance(newBalance)

        const witdrawalsData = await getWithdrawals() 
        if (witdrawalsData) setwithDrawals(witdrawalsData)

        
        const investment: any = await getInvestment()

        if (investment) setInvestment(investment as any)

      } catch (error) {
        console.error(error)
      } finally {
        setFetch(true)
      }

    }

    acc_bal()
  }, [])
 
   
    
    
  
  
  switch(currentPage){
    case'home':
      return(
        <section className='w-full'>
          <Home balance={balance} investment={investment} fetch={fetch} withDrawals={withDrawals as IwithDraw} />
       </section>
      )

    case'withdraw':
      return(
        <section className="w-full">
          <Withdraw />
        </section>
      )
    case'deposit':
      return(
        <section className="w-full ">
          <Deposit />
        </section>
      )
    case'history':
      return(
        <section className="w-full">
          <History />
        </section>
      )
    case'package':
      return(
        <section className="w-full">
          <Packages />
        </section>
      )
    case'profile':
      return(
        <section className="w-full">
          <ProfilePage />
        </section>

      )
      case'setting':
      return(
        <section className="w-full">
          <SettingsPage />
        </section>
      )
      case'notifications':
        return(
          <section className="w-full">
            <NotificationPage />
          </section>
        )
  }
  
}

export default Maincontent