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
import { verify } from 'jsonwebtoken'

const Page: NextPageWithLayout = () => {
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`;
  const router = useRouter()
  useEffect(()=>{
    var token = localStorage.getItem('token');
    if(token == null){
      router.push('/login')
    }else{
      try{
        verify(token, key)
        router.push('/manage')
      }catch(e){
        router.push('/login')
      }
    }
  },[])
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