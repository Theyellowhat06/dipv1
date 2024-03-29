import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from 'react'
import MainLayout from '../../comps/layouts/main'
import Profilebar from '../../comps/Profilebar'
import Sidebar from '../../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import type { NextPageWithLayout } from '../_app'
import { verify } from 'jsonwebtoken'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line, Doughnut } from 'react-chartjs-2'
import Table from '../../comps/Table'
import axios from 'axios'


const Page: NextPageWithLayout = () => {
  //const [tData, setTData] = useState<(any)[][]>();
  const [token, setToken] = useState<any>('');
  const router = useRouter()
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const title = ['Сонсогчийн код','Регистр','Ургийн овог', 'Овог', 'Нэр', 'Мэргэжилийн код', 'Дүн']
  const [tData, setTData] = useState<(any)[][]>();
  const tDatatemp = [
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    [1, 'S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    
  ]
  const fdata = [
    {
      label: 'Сонсогчын код',
      key: '',
      value: '',
    },
    {
      label: 'Нэр',
      key: '',
      value: '',
    },
    {
      label: 'Нэр (ENG)',
      key: '',
      value: '',
    },
    {
      label: 'Үргэлжилэх хугацаа',
      key: '',
      value: [
        {
            key: '1',
            value: '45 хоног'
        },
        {
            key: '2',
            value: '3 сар'
        }
    ]
    },
    {
      label: 'Төлбөр',
      key: '',
      value: '',
    },
  ]
  // const tData = [
  //   [1,'CM22090101','Тэнгэр', 'Хулан', 'CM3M220909', 'CM', <div className='flex justify-center items-center'>96</div>],
  // ]
  
  const resData =()=>{
    console.log(token)
    axios.post('/api/hello', {param: 'student/getDiplom', token: token}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        console.log('result', result)
        tDatatemp.length = 0
        const temp = tData

        result.result.forEach(function(e: any) {
          //temp?.push([e.id, e.code, e.name_mn, e.name_en, <div className='flex justify-center items-center'>{e.letter_time}</div>, <div className='flex justify-end items-center'>{e.price}₮</div>])
          tDatatemp.push([e.id, e.code, e.rg_mn, e.famname_mn, e.lname_mn, e.fname_mn, <div className='flex justify-center items-center'>{e.code.substring(0,2)}</div>,<div className='flex justify-center items-center'>{parseFloat(e.grade_avg.toFixed(2))}</div>])
        });
        // console.log('tdate', temp)
        setTData(tDatatemp);
        //localStorage.setItem('token', result.token)
        //localStorage.setItem('user', JSON.stringify(result.result))
        
        //router.push('/manage')
      }
    })
  }
  
    useEffect(()=>{
      setToken(localStorage.getItem('token'))
        if(token != null && token != ''){
          console.log('mytoken',token)
            try{
              verify(token, key)
              resData()
            }catch(e){
              console.log(e)
              router.push('/login')
            }
        }else if(token == null){
            router.push('/login')
        }
        
    },[token])
  return <div>
  <div className='text-xl pl-4 pb-2'>Дипломын мэдээлэл</div>
  <div className='bg-white rounded-md'>
      <Table title={title} data={tData} name='Мэргэжил' resData={undefined} token={token} param="prof" fdata={fdata} diplom={true}></Table>
  </div>
  </div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <MainLayout index={8}>
          {page}
    </MainLayout>
  )
}

export default Page