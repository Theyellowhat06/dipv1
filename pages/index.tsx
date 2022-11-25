import type { ReactElement } from 'react'
import MainLayout from '../comps/layouts/main'
import Profilebar from '../comps/Profilebar'
import Sidebar from '../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import {useEffect} from 'react'
import { useRouter } from 'next/router'
<<<<<<< HEAD
import { getSession } from './lib/get-session'
=======
import axios from 'axios'
>>>>>>> a21ad89a867636bf8d5f97a40ac22297c7044321

import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(()=>{
    sessionStorage.setItem('test', 'test');
    console.log(sessionStorage.getItem('test'));
    if(!session){
<<<<<<< HEAD
=======
      axios.get('https://retoolapi.dev/YhQvnM/data').then(res=>{
        console.log(res.data);
      })
>>>>>>> a21ad89a867636bf8d5f97a40ac22297c7044321
      //router.push('/login')
    }
  })
  return <div></div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout index={0}>
          {page}
    </MainLayout>
  )
}

export default Page