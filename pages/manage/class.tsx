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
  const title = ['Код', 'Эхлэх', 'Дуусах', 'Мэргэжил код', 'Төлөв']
  const fdata = [
    {
      label: 'Код',
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
  const tData = [
    [1,'BM45D230110', '2023-01-10', '2023-02-24', <div className='flex justify-center items-center'>BM45D</div>, <div className='flex justify-end items-center'>Элсэлт явагдаж буй</div>],
    [1,'BM3M230116', '2023-01-16', '2023-04-16', <div className='flex justify-center items-center'>BM3M</div>, <div className='flex justify-end items-center'>Элсэлт явагдаж буй</div>],
    [1,'HR45D221210', '2023-12-10', '2023-12-24', <div className='flex justify-center items-center'>HR45D</div>, <div className='flex justify-end items-center'>Эхэлсэн</div>],
    [1,'HR3M221215', '2023-12-16', '2023-12-16', <div className='flex justify-center items-center'>HR3M</div>, <div className='flex justify-end items-center'>Эхэлсэн</div>],
    [1,'CM3M220909', '2023-09-09', '2023-12-08', <div className='flex justify-center items-center'>CM3M</div>, <div className='flex justify-end items-center'>Дууссан</div>],
  ]
  
//   const resData =()=>{
//     console.log(token)
//     axios.post('/api/hello', {param: 'prof/getAll', token: token}).then(res => {
//       console.log(res.data);
//       var result = res.data.result;
//       if(result.success){
//         console.log('result', result)
//         tDatatemp.length = 0
//         const temp = tData

//         result.result.forEach(function(e: any) {
//           //temp?.push([e.id, e.code, e.name_mn, e.name_en, <div className='flex justify-center items-center'>{e.letter_time}</div>, <div className='flex justify-end items-center'>{e.price}₮</div>])
//           tDatatemp.push([e.id, e.code, e.name_mn, e.name_en, <div className='flex justify-center items-center'>{e.letter_time}</div>, <div className='flex justify-end items-center'>{e.price}₮</div>])
//         });
//         console.log('tdate', temp)
//         setTData(tDatatemp);
//         //localStorage.setItem('token', result.token)
//         //localStorage.setItem('user', JSON.stringify(result.result))
        
//         //router.push('/manage')
//       }
//     })
//   }
  
    useEffect(()=>{
      setToken(localStorage.getItem('token'))
        if(token != null && token != ''){
          console.log('mytoken',token)
            try{
              verify(token, key)
              //resData()
            }catch(e){
              console.log(e)
              router.push('/login')
            }
        }else if(token == null){
            router.push('/login')
        }
        
    },[token])
  return <div>
  <div className='text-xl pl-4 pb-2'>Ангын мэдээлэл</div>
  <div className='bg-white rounded-md'>
      <Table title={title} data={tData} name='Анги' resData={undefined} token={token} param="prof" fdata={fdata}></Table>
  </div>
  </div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <MainLayout index={6}>
          {page}
    </MainLayout>
  )
}

export default Page