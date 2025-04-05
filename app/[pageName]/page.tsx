import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Maincontent from '../../components/Maincontent';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


type Props = {

  params: any;
}

const Page = async ( {
    params: { pageName },
  }: Props) => {
    console.log(pageName)
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) 
    console.log('no user authenticated')
  return (
    <div className="bg-gray-800">
    <Header />
    <main>
      <div className="flex flex-col md:flex-row">
        <Nav currentPage={pageName} />
        <Maincontent currentPage={pageName} />
      </div>

    </main>
    
  </div>
  )
}

export default Page