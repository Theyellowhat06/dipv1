import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../comps/Layout'
import Button from '../comps/Button'
import bgImg from '../public/classroom.jpg'

export default function Home() {
  return (
      <div className='w-screen flex flex-row'>
        
        <div className='w-1/3 bg-white shadow-md h-screen flex flex-col justify-center p-14 space-y-4'>
          <p className='text-2xl text-teal-900'>Нэвтрэх</p>
          <input className='rounded-md bg-slate-100 p-4' placeholder='Нэвтрэх нэр'></input>
          <input className='rounded-md bg-slate-100 p-4' placeholder='Нууц үг'></input>
          <div>
          <input type='checkbox'></input><label className='pl-2'>Намайг сана</label>
          </div>
          
          <Link href="/manage">
            <div className='bg-emerald-600 text-white rounded-md p-4 text-center'>Нэвтрэх</div>
          </Link>
        </div>
        <img className='w-screen h-screen' src='/img/classroom.jpg'></img>
      </div>
  )
}
