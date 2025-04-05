import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"




export default async function LoggedInLayout({children}:{children: React.ReactNode})
{
    
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()

if(user){

    return redirect('/home')
    // return<>
      
    //     <div className="flex items-center gap-4 justify-center h-screen"><p className='animate-pulse'>please wait...</p>
    //       <div className="border-x-4 border-blue-500 border-solid animate-spin rounded-full h-6 w-6"></div>
    //     </div>

      
    // </>
}


    return <>
    {children}
    </>
}