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
import axios from 'axios'

const Page: NextPageWithLayout = () => {
  const [token, setToken] = useState<any>('');
  const [tData, setTData] = useState<(any)[][]>();
  const router = useRouter()
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const title = ['Код', 'Овог', 'Нэр', 'Багшлах хэлбэр', 'Зэрэг', 'Албан тушаал']
  const tDatatemp = [
    [1,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    [2,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    [2,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    [2,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    [2,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    [2,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    [2,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
    [2,'NT26', 'Төгөлдөр', 'Энхжин', <div className='flex justify-center items-center'>Үндсэн</div>, <div className='flex justify-center items-center'>Магистр</div>, <div className='flex justify-center items-center'>Ахлах багш</div>],
  ]
  const fdata = [
    {
      label: 'Код',
      key: '',
      value: '',
    },
    {
      label: 'Албан тушаал',
      key: '',
      value: [
        {
            key: '1',
            value: 'Захирал'
        },
        {
            key: '2',
            value: 'Ахлах багш'
        },
        {
          key: '3',
          value: 'Дадлагажигч'
      }
    ],
    },
    {
      label: 'Овог',
      key: '',
      value: '',
    },
    {
      label: 'Овог (ENG)',
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
      label: 'Утасны дугаар',
      key: '',
      value: '',
    },
    {
      label: 'Зэрэг',
      key: '',
      value: [
        {
            key: '1',
            value: 'Бакалавр'
        },
        {
            key: '2',
            value: 'Магистр'
        },
        {
          key: '3',
          value: 'Доктор'
      }
    ]
    },
    {
      label: 'Багшлах хэлбэр',
      key: '',
      value: [
        {
            key: '1',
            value: 'Үндсэн'
        },
        {
            key: '2',
            value: 'Цагийн'
        }
    ]
    },
  ]
  const resData =()=>{
    console.log(token)
    axios.post('/api/hello', {param: 'teacher/getAll', token: token}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        console.log('result', result)
        tDatatemp.length = 0
        const temp = tData

        result.result.forEach(function(e: any) {
          //temp?.push([e.id, e.code, e.name_mn, e.name_en, <div className='flex justify-center items-center'>{e.letter_time}</div>, <div className='flex justify-end items-center'>{e.price}₮</div>])
          tDatatemp.push([e.id,e.code, e.lname_mn, e.fname_mn, <div className='flex justify-center items-center'>{e.type_name}</div>, <div className='flex justify-center items-center'>{e.degree_name}</div>, <div className='flex justify-center items-center'>{e.position_name}</div>])
        });
        console.log('tdate', temp)
        setTData(tDatatemp);
        //localStorage.setItem('token', result.token)
        //localStorage.setItem('user', JSON.stringify(result.result))
        
        //router.push('/manage')
      }
    })
  }
    useEffect(()=>{
      setToken(localStorage.getItem('token'))
      console.log('token', token)
      if(token != null && token != ''){
            try{
                verify(token, key)
                resData()
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
        <Table title={title} data={tData} name='Багш' fdata={fdata} resData={resData} token={token} param={'teacher'}></Table>
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