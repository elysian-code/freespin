import React from 'react'

type Props = {
	price: number
	packgeName: string
	description: string
	profit: string
	roi: string
}

const Plan = (props: Props) => {
	
	return (
		<div className="rounded-2xl bg-gray-50 py-10 text-center lg:max-w-md my-4 lg:mx-4 ring-1 ring-inset ring-gray-900/5 lg:flex lg:justify-center lg:py-16">
		<div className="mx-auto max-w-xs px-8">
			<p className="text-base font-semibold text-gray-600">{`${props.profit.slice(0,2)}% Daily Return`}</p>
			<p className="mt-6 flex items-baseline justify-center gap-x-2">
				<span className="text-5xl font-bold tracking-tight text-gray-900">${props.price}</span>
				<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
			</p>
			<p className="mt-6 text-xs leading-5 text-gray-600">{props.description}</p>
			<a href="#" className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a>
		</div>
	</div>
  )
}

export default Plan