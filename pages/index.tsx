import type { ReactElement } from 'react'
import MainLayout from '../comps/layouts/main'
import Profilebar from '../comps/Profilebar'
import Sidebar from '../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import {useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import type { NextPageWithLayout } from './_app'
import DefaultLayout from '../comps/layouts/default'

const Page: NextPageWithLayout = () => {
  
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(()=>{
    sessionStorage.setItem('test', 'test');
    console.log(sessionStorage.getItem('test'));
    if(!session){
      axios.get('https://retoolapi.dev/YhQvnM/data').then(res=>{
        console.log(res.data);
      })
      //router.push('/login')
    }
  })
  return <div></div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout index={0}>
          {page}
    </DefaultLayout>
  )
}

export default Page