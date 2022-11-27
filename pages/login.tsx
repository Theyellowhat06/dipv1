import axios from 'axios'
import Link from 'next/link'
import type { ReactElement } from 'react'
import DefaultLayout from '../comps/layouts/default'
import Button from '../comps/Button'
import { useState } from 'react'

import type { NextPageWithLayout } from './_app'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Page: NextPageWithLayout = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const login = () => {
    const myPromise = new Promise((resolve, reject) => axios.post('./api/hello', {param: 'user/login', username: username, password: password}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.result))
        
        router.push('/manage')
        resolve
      }else{
        reject()
        toast(result.msg, { hideProgressBar: true, autoClose: 2000, type: 'error', position: 'top-center' })
      }
    }))
    toast.promise(myPromise, {
      pending: "Түр хүлээнэ үү",
      success: "Амжилттай",
    })
  }
  return (
      <div className='w-screen flex flex-row'>
        <div className='w-1/2 h-screen  bg-gradient-to-r from-secondary to-primary flex items-center justify-center '>
            <div className='relative h-96 w-96'>
                <div className='rounded-full h-96 w-96 absolute inset-0 border-dashed  border-2 border-white '></div>
                <div className='h-48 w-48 m-24 absolute inset-0 bg-white rounded-full'></div>
                <div className='h-48 w-48 m-24 animate-ping absolute inset-0 bg-white rounded-full'></div>
                <img className='h-96 absolute inset-0 animate-wiggle' src='/img/icons/hello.png'></img>
            </div>
        </div>
        <div className='w-1/2 h-screen bg-white flex flex-col justify-center space-y-4 items-center'>
          <div className='w-1/2 flex flex-col space-y-4'>
            <p className='text-2xl' style={{color: ''}}>Нэвтрэх</p>
            <input className='rounded-md bg-slate-100 p-4 focus:outline-none focus:bg-slate-200 transition-colors' placeholder='Нэвтрэх нэр' value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input className='rounded-md bg-slate-100 p-4 focus:outline-none focus:bg-slate-200 transition-colors' placeholder='Нууц үг' type={'password'} value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <div>
            <input type='checkbox'></input><label className='pl-2'>Намайг сана</label>
            </div>
            {/* <Link href="/manage"> */}
            
            <div onClick={login}><Button text='Нэвтрэх' extra='p-4 rounded-md text-center'></Button></div>
            {/* </Link> */}
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