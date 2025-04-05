"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { getUser, signOut } from "@/_actions/crud";



export default function Profile() {


	const [user, setUser] = useState<string>()
	const [fetch, setFetch] = useState(false)

	

	useEffect(()=> {

		const fetch = async () => {
			try {
				
				let userD: any = await getUser()
				if(userD) setUser(userD[0].name)
				console.log(user)
			} catch (error) {
				console.error(error)
			}finally{
				setFetch(true)
			}
		}

		fetch()
		return ()=> {

		}
		
	}, [])

  const logOut = async ()=> await signOut()



  return (
    <div className="unaffected">
      <DropdownMenu >
        <DropdownMenuTrigger className="unaffected ">
          <button className="drop-button min-w-16 text-white py-2 px-2">
            <span className={`${!fetch && 'w-5 h-5 animate-spin border-y-3 mx-6 border-r-2 rounded-full border-cyan-100'}`}></span>
            {fetch && `Hi ${fetch && user}`}
            <svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60  bg-gray-800 text-white right-0 mt-3 p-3 ">

          <DropdownMenuItem
            className="unaffected"
          >
            <Input type="text" className="drop-search p-2 text-gray-600" placeholder="Search.." id="myInput"  />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="unaffected"
          >
            <Link href="/profile" className="p-2 hover:bg-gray-600 flex text-white text-sm no-underline hover:no-underline gap-2">
              <FaUser className='mt-1' /><p> Profile </p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="unaffected"
          >
            <Link href="/setting" className="p-2 hover:bg-gray-600 flex text-white text-sm no-underline hover:no-underline gap-2">
              <IoMdSettings className='mt-1' /><p> Settings </p>
            </Link>
  <div className="border border-gray-800"></div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="unaffected"
            onClick={logOut}
          >
            <Link href='#'  className="p-2 hover:bg-gray-600 flex logout text-white text-sm no-underline  hover:no-underline gap-2">
              <IoLogOut className='mt-1' /><p> Log Out </p>
            </Link>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

}
