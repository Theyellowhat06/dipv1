import { ReactElement, useState } from 'react'
import MainLayout from '../../../comps/layouts/main'
import Profilebar from '../../../comps/Profilebar'
import Sidebar from '../../../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

import type { NextPageWithLayout } from '../../_app'
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
import Table from '../../../comps/Table'

const Page: NextPageWithLayout = () => {
  const [token, setToken] = useState<any>('');
  const router = useRouter()
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const title = ['Код', 'Овог', 'Нэр', 'Багшлах хэлбэр', 'Зэрэг', 'Албан тушаал']
  const tData = [
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    ['NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
  ]
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
    useEffect(()=>{
      setToken(localStorage.getItem('token'))
      console.log('token', token)
      if(token != null && token != ''){
            try{
                verify(token, key)
            }catch(e){
              console.log('catch', e)
              router.push('/login')
            }
        }else if(token == null){
          router.push('/login')
      }
    },[token])
  return <div>
    <div className='text-xl pl-4 pb-2'>Багшийн мэдээлэл</div>
    <div className='bg-white rounded-md'>
        <Table title={title} data={tData} name='Багш' fdata={fdata} resData={undefined} token={token} param={'teacher'}></Table>
    </div>
    </div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <MainLayout index={2}>
          {page}
    </MainLayout>
  )
}

export default Page