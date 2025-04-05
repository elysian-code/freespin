'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FaHome, FaUser } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { getUser, signOut } from '@/_actions/crud'
import Link from 'next/link'
import Profile from './Profile'

interface user {
	id: string;
	email: string;
	name: string;
	password_hash: string;
	is_verified: string;
	created_at: string;
}[]

const Header = () => {

	/*Toggle dropdown list*/
	// function toggleDD(myDropMenu: string) {
	// 	const drop = document.getElementById(myDropMenu);
	// 	drop && drop.classList.toggle("invisible")
	// }
	// /*Filter dropdown options*/
	// function filterDD(myDropMenu: string, myDropMenuSearch: string) {
	// 	var input, div, filter, ul, li, a, i;
	// 	input = document.getElementById(myDropMenuSearch);
	// 	filter = input?.nodeValue?.toUpperCase();
	// 	div = document.getElementById(myDropMenu);
	// 	a = div?.getElementsByTagName("a");
	// 	if (a) {

	// 		for (i = 0; i < a.length; i++) {
	// 			if (a[i].innerHTML.toUpperCase().indexOf(filter as string) > -1) {
	// 				a[i].style.display = "";
	// 			} else {
	// 				a[i].style.display = "none";
	// 			}
	// 		}
	// 	}
	// }
	// //Close the dropdown menu if the user clicks outside of it
	// window.onclick = function (event) {
	// 	if ((event.target instanceof Element && !event.target?.matches('.drop-button')) && (event.target instanceof Element && !event.target?.matches('.drop-search'))) {
	// 		var dropdowns = document.getElementsByClassName("dropdownlist");
	// 		for (var i = 0; i < dropdowns.length; i++) {
	// 			var openDropdown = dropdowns[i];
	// 			if (!openDropdown.classList.contains('invisible')) {
	// 				openDropdown.classList.add('invisible');
	// 			}
	// 		}
	// 	}
	// }


	// const [user, setUser] = useState<string>()
	// const [fetch, setFetch] = useState(false)

	

	// useEffect(()=> {

	// 	const fetch = async () => {
	// 		try {
				
	// 			let userD: any = await getUser()
	// 			if(userD) setUser(userD[0].name)
	// 			console.log(user)
	// 		} catch (error) {
	// 			console.error(error)
	// 		}finally{
	// 			setFetch(true)
	// 		}
	// 	}

	// 	fetch()
	// 	return ()=> {

	// 	}
		
	// }, [])

	
	// const logout = document.querySelector('.logout')

	// logout && logout.addEventListener('click', ()=>{
	// 	signOut()
	// })

	return (
		<header className='w-full'>

			<nav aria-label="menu nav" className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">

				<div className="flex flex-wrap items-center">
					<div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
						<Link href="/profile" aria-label="Home">
							<span className="text-xl bg-slate-500 w-14 h-12 rounded-[50%] px-4 ml-2 mt-2 p-3">M</span>
						</Link>
					</div>

					<div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
						<span className="relative w-full">
							<Input aria-label="search" type="search" id="search" placeholder="Search" className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal" />
							<div className="absolute search-icon top-[1rem] left-[.8rem]">
								<svg className="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
								</svg>
							</div>
						</span>
					</div>

					<div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
						<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
							<li className="flex-1 md:flex-none md:mr-3">
								<Link className="inline-block py-2 px-4 text-white no-underline" href="/notifications">Notifications</Link>
							</li>
							<li className="flex-1 md:flex-none md:mr-3">
								<Link className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">blog</Link>
							</li>
							<li className="flex-1 md:flex-none md:mr-3">
								<div className="relative inline-block">
									<Profile />
									{/* <Button onClick={
										 () => {
											toggleDD('myDropdown')
											

										}
									} className="drop-button min-w-16 text-white py-2 px-2"> <span className={`${!fetch && 'w-5 h-5 animate-spin border-y-3 mx-6 border-r-2 rounded-full border-cyan-100'}`}><i className="em em-robot_face"></i></span>
									{fetch && `Hi ${fetch && user}`}<svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
									</Button>
									<div id="myDropdown" className="dropdownlist w-60 absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible">
										<Input type="text" className="drop-search p-2 text-gray-600" placeholder="Search.." id="myInput" onKeyUp={() => { filterDD('myDropdown', 'myInput') }} />
										<Link href="/profile" className="p-2 hover:bg-gray-600 flex text-white text-sm no-underline hover:no-underline gap-2"><FaUser className='mt-1' /><p> Profile </p></Link>
										<Link href="/setting" className="p-2 hover:bg-gray-600 flex text-white text-sm no-underline hover:no-underline gap-2"><IoMdSettings className='mt-1' /><p> Settings </p></Link>
										<div className="border border-gray-800"></div>
										<Link href='#'  className="p-2 hover:bg-gray-600 flex logout text-white text-sm no-underline hover:no-underline gap-2"><IoLogOut className='mt-1' /><p> Log Out </p></Link>
									</div> */}
								</div>
							</li>
						</ul>
					</div>
				</div>

			</nav>
		</header>

	)
}

export default Header