import React from 'react'
import { FaHistory, FaHome } from 'react-icons/fa'
import { FaBoxesPacking } from 'react-icons/fa6'
import { MdAccountCircle } from 'react-icons/md'
import { PiHandDeposit, PiHandWithdraw } from 'react-icons/pi'
import Link from 'next/link'


const Nav = ({currentPage}:{currentPage: string}) => {

	console.log('the current page is: ',currentPage)
	
	return (
		<nav aria-label="alternative nav">
			<div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">

				<div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
					<ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
						<li className="mr-3 flex-1">
							<Link href="/home" className={`block md:flex py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 ${currentPage==='home'? 'border-pink-500' : ''} hover:border-pink-500`}>
								<i className={`fas fa-tasks pr-0 md:pr-3 ${currentPage==='home'? 'text-pink-500' : ''}`}><FaHome className='md:mt-2 ml-5 md:ml-2 ' /></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Home</span>
							</Link>
						</li>
						<li className="mr-3 flex-1">
							<Link href="/deposit" className={`block md:flex py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 ${currentPage==='deposit'? 'border-purple-500' : ''} hover:border-purple-500`}>
								<i className={`fa fa-envelope pr-0 md:pr-3 ${currentPage==='deposit'? 'text-purple-500' : ''}`}><PiHandDeposit className='md:mt-2 ml-5 md:ml-2 ' /></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Deposit</span>
							</Link>
						</li>
						<li className="mr-3 flex-1">
							<Link href="/withdraw" className={`block md:flex py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2  ${currentPage==='withdraw'? 'border-blue-600' : 'border-gray-800'} hover:border-blue-600`}>
								<i className={`fas fa-chart-area pr-0 md:pr-3 ${currentPage==='withdraw'? 'text-blue-600' : ''} `}><PiHandWithdraw className='md:mt-2 ml-5 md:ml-2 ' /></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Withdraw</span>
							</Link>
						</li>
						<li className="mr-3 flex-1">
							<Link href="/history" className={`block md:flex py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 ${currentPage==='history'? 'border-red-500' : ''} hover:border-red-500`}>
							<i className={`fa fa-wallet pr-0 md:pr-3 ${currentPage==='history'? 'text-red-500' : ''}`}><FaHistory className='md:mt-2 ml-5 md:ml-2 ' /></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">History</span>
							</Link>
						</li>
						<li className="mr-3 flex-1">
							<Link href="/package" className={`block md:flex py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 ${currentPage==='package'? 'border-orange-300' : ''} hover:border-orange-300`}>
								<i className={`fa fa-wallet pr-0 md:pr-3 ${currentPage==='package'? 'text-orange-300' : ''}`}><FaBoxesPacking className='md:mt-2 ml-5 md:ml-2 ' /></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Package</span>
							</Link>
						</li>
					</ul>
				</div>


			</div>
		</nav>
	)
}

export default Nav