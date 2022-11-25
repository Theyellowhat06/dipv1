import type { ReactElement } from 'react'
import MainLayout from '../../comps/layouts/main'
import Profilebar from '../../comps/Profilebar'
import Sidebar from '../../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import {useEffect} from 'react'
import { useRouter } from 'next/router'

import type { NextPageWithLayout } from '../_app'
import DefaultLayout from '../../comps/layouts/default'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  
  useEffect(()=>{
    console.log('hoho')
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