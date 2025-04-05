'use client'


// components/SignUp.tsx
import { useState } from 'react'
import { useForm, SubmitHandler, Controller} from 'react-hook-form'
import { supabase } from '../../SupabaseClient' 
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { signup } from '@/_actions/crud'

export type Inputs = {
  email: string
  username: string
  phone_no: string
  password: string
}

export default function SignUp() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
          defaultValues: {
            email: '',
            username: '',
            phone_no: '',
            password: '',
          },
        });
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const onSubmit = async (data: Inputs) => {
    if (data.password.length < 6 ){
      return toast({description: 'password cannot be less than 6 characters!'})
    } 

    const err = signup(data)

    if (err) {
      return toast({
        variant: "destructive",
        description: err  
      })
    }
     
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-md border md:my-20">
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Please register below</h2>
           <form className=" rounded px-8  pb-8 " onSubmit={handleSubmit(onSubmit)}>
               <div className="mb-4">
                   <label className="block text-gray-700 text-sm font-bold mb-2" >Email:</label>
                   <Controller
                  name="email" 
        
                  control={control}
                  rules={{ required: 'Email is required' }}
                  render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" {...field} />}
                  />
                  {errors.email && <p className="text-red-500 text-xs italic pt-2" >{errors.email.message}</p>}
              </div>
  
              <div className="mb-4 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2" >Username:</label>
                  <Controller
                  name="username"
                  control={control}
                  rules={{ required: 'First Name is required' }}
                  render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  {...field} />}
                  />
                  {errors.username && <p className="text-red-500 text-xs italic pt-2" >{errors.username.message}</p>}
              </div>
  
               <div className="mb-4 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2" >Phone Number:</label>
                   <Controller
                  name="phone_no"
                  control={control}
                  rules={{ required: 'Phone Number is required'}}
                  render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" {...field} />}
                  />
                  {errors.phone_no && <p className="text-red-500 text-xs italic pt-2" >{errors.phone_no.message}</p>}
              </div>
  
              <div className="mb-4 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2" >Password:</label>
                  <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" {...field} />}
                  />
                  {errors.password && <p className="text-red-500 text-xs italic pt-2" >{errors.password.message}</p>}
              </div>
              
  
              <Button 
       
                id='loginBtn'
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3
                py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-indigo-600" 
                  type="submit">
                    <div className={`${isSubmitting && 'w-5 h-5 animate-spin border-y-3 border-r-2 rounded-full border-cyan-100'}`}>{!isSubmitting && 'Sign up'}</div>
              </Button>
              
           </form>
           <p className="text-center p-4">Already have an account? <Link className="text-center align-bottom italic text-blue-600" href={'/login'}>click here to login</Link></p>
          
       </div>
  )
}

// export default function SignUpForm() {

//   interface IData {
//     email: string;
//     firstName: string;
//     lastName: string;
//     password: string;
//     password2: string;
//   }
      
//     const { control, handleSubmit, formState: { errors } } = useForm({
//       defaultValues: {
//         email: '',
//         firstName: '',
//         lastName: '',
//         password: '',
//         password2: '',
//       },
//     });
  
//     const onSubmit = async (data: IData) => {
      
//       if (data.password !== data.password2) {
//         return toast.error('invalid password confirmation')
//       }
//       const user = await _getUser(data.email)
       
//       if (user) return toast.error('user with this email already exist')  // Handle form submission logic here
//       const details = {
//         email: data.email,
//         password: data.password,
//         firstName: data.firstName,
//         lastName: data.lastName
//       }
//         await _createUser(details)
        
//         await signIn('credentials',
//           { email: data.email, password: data.password, callbackUrl: '/home' }
//         )
//       return toast.success('Account creation successful')
//     };
//     const {theme} = useTheme()
//     return (
//       <div className="w-full max-w-sm mx-auto rounded-md border-2 md: my-[4rem]">
//         <h2 className="text-2xl text-bolder text-center p-10 ">sign up</h2>
//           <form className=" rounded px-8  pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
//               <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" >Email:</label>
//                   <Controller
//                   name="email"
//                   control={control}
//                   rules={{ required: 'Email is required' }}
//                   render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" {...field} />}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs italic pt-2" >{errors.email.message}</p>}
//               </div>
  
//               <div className="mb-4 ">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" >First Name:</label>
//                   <Controller
//                   name="firstName"
//                   control={control}
//                   rules={{ required: 'First Name is required' }}
//                   render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" {...field} />}
//                   />
//                   {errors.firstName && <p className="text-red-500 text-xs italic pt-2" >{errors.firstName.message}</p>}
//               </div>
  
//               <div className="mb-4 ">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" >Last Name:</label>
//                   <Controller
//                   name="lastName"
//                   control={control}
//                   rules={{ required: 'Last Name is required' }}
//                   render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" {...field} />}
//                   />
//                   {errors.lastName && <p className="text-red-500 text-xs italic pt-2" >{errors.lastName.message}</p>}
//               </div>
  
//               <div className="mb-4 ">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" >Password:</label>
//                   <Controller
//                   name="password"
//                   control={control}
//                   rules={{ required: 'Password is required' }}
//                   render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" {...field} />}
//                   />
//                   {errors.password && <p className="text-red-500 text-xs italic pt-2" >{errors.password.message}</p>}
//               </div>
//               <div className="mb-4 ">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" >Confirm Password:</label>
//                   <Controller
//                   name="password2"
//                   control={control}
//                   rules={{ required: 'Password Confirmation is required' }}
//                   render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" {...field} />}
//                   />
//                   {errors.password2 && <p className="text-red-500 text-xs italic pt-2" >{errors.password2.message}</p>}
//               </div>
  
//               <Button variant={ theme === 'dark' ? 'secondary': 'default'} className="w-full" type="submit">Submit</Button>
              
//           </form>
//           <p className="text-center p-4 italic">Already have an account? <Link className="text-sky-600" href={'/login'}>click here to login</Link></p>
          
//       </div>
      
//     );
  
//   }