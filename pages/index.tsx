import type { ReactElement } from 'react'
import MainLayout from '../comps/layouts/main'
import Profilebar from '../comps/Profilebar'
import Sidebar from '../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import {useEffect} from 'react'
import { useRouter } from 'next/router'

import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(()=>{
    if(!session){
      router.push('/login')
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