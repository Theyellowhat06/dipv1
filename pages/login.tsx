import Link from 'next/link'
import type { ReactElement } from 'react'
import DefaultLayout from '../comps/layouts/default'

import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return (
      <div className='w-screen flex flex-row'>
        <div className='w-1/2 h-screen  bg-gradient-to-r from-secondary to-primary flex items-center justify-center '>
            <div className='relative h-96 w-96'>
                <div className='rounded-full animate-spin h-96 w-96 absolute inset-0 border-dashed  border-2 border-white '></div>
                <div className='h-48 w-48 m-24 absolute inset-0 bg-white rounded-full'></div>
                <div className='h-48 w-48 m-24 animate-ping absolute inset-0 bg-white rounded-full'></div>
                <img className='h-96 absolute inset-0 animate-wiggle' src='/img/icons/hello.png'></img>
            </div>
        </div>
        <div className='w-1/2 h-screen bg-white flex flex-col justify-center space-y-4 items-center'>
          <div className='w-1/2 flex flex-col space-y-4'>
            <p className='text-2xl' style={{color: ''}}>Нэвтрэх</p>
            <input className='rounded-md bg-slate-100 p-4 focus:outline-none focus:bg-slate-200 transition-colors' placeholder='Нэвтрэх нэр'></input>
            <input className='rounded-md bg-slate-100 p-4 focus:outline-none focus:bg-slate-200 transition-colors' placeholder='Нууц үг'></input>
            <div>
            <input type='checkbox'></input><label className='pl-2'>Намайг сана</label>
            </div>
            <Link href="/manage">
            <div className='text-white rounded-md p-4 text-center bg-primary active:bg-opacity-80'>Нэвтрэх</div>
            </Link>
          </div>
        </div>
      </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Page