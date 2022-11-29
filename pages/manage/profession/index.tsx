import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from 'react'
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
  const [tData, setTData] = useState([
    ['BM', 'Бизнесийн удирдлага', 'Business Management', <div className='flex justify-center items-center'>45 хоног</div>, <div className='flex justify-end items-center'>400,000.00₮</div>],
    ['BM', 'Бизнесийн удирдлага', 'Business Management', <div className='flex justify-center items-center'>3 сар</div>, <div className='flex justify-end items-center'>600,000.00₮</div>],
    ['HR', 'Хүний нөөцийн удирдлага', 'Human Resource Management', <div className='flex justify-center items-center'>45 хоног</div>, <div className='flex justify-end items-center'>500,000.00₮</div>],
    ['HR', 'Хүний нөөцийн удирдлага', 'Human Resource Management', <div className='flex justify-center items-center'>3 сар</div>, <div className='flex justify-end items-center'>1,195,000.00₮</div>],
    ['CM', 'Соёлын удирдлага', 'Culture Management', <div className='flex justify-center items-center'>3 сар</div>, <div className='flex justify-end items-center'>300,000.00₮</div>],
  ]);
  const router = useRouter()
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const title = ['Код', 'Нэр', 'Нэр (ENG)', 'Үргэлжилэх хугацаа', 'Төлбөр']
  const tDatatemp = [
    ['BM', 'Бизнесийн удирдлага', 'Business Management', <div className='flex justify-center items-center'>45 хоног</div>, <div className='flex justify-end items-center'>400,000.00₮</div>],
    ['BM', 'Бизнесийн удирдлага', 'Business Management', <div className='flex justify-center items-center'>3 сар</div>, <div className='flex justify-end items-center'>600,000.00₮</div>],
    ['HR', 'Хүний нөөцийн удирдлага', 'Human Resource Management', <div className='flex justify-center items-center'>45 хоног</div>, <div className='flex justify-end items-center'>500,000.00₮</div>],
    ['HR', 'Хүний нөөцийн удирдлага', 'Human Resource Management', <div className='flex justify-center items-center'>3 сар</div>, <div className='flex justify-end items-center'>1,195,000.00₮</div>],
    ['CM', 'Соёлын удирдлага', 'Culture Management', <div className='flex justify-center items-center'>3 сар</div>, <div className='flex justify-end items-center'>300,000.00₮</div>],
  ]

  
    useEffect(()=>{
        var token = localStorage.getItem('token')
        if(token != null){
            try{
                verify(token, key)
                axios.post('/api/hello', {param: 'prof/getAll', token: token}).then(res => {
                  console.log(res.data);
                  var result = res.data.result;
                  if(result.success){
                    console.log('result', result)
                    tDatatemp.length = 0
                    result.result.forEach(function(e: {
                      letter_time: any; code: string | JSX.Element; name_mn: string | JSX.Element; name_en: string | JSX.Element; period_id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined 
}) {
                      tDatatemp.push([e.code, e.name_mn, e.name_en, <div className='flex justify-center items-center'>{e.letter_time}</div>, <div className='flex justify-end items-center'>{e.price}₮</div>])
                    });
                    console.log('tdate', tData)
                    setTData(tDatatemp);
                    //localStorage.setItem('token', result.token)
                    //localStorage.setItem('user', JSON.stringify(result.result))
                    
                    //router.push('/manage')
                  }
                })
            }catch(e){
              //router.push('/login')
            }
        }else{
            router.push('/login')
        }
        
    },[])
  return <div>
  <div className='text-xl pl-4 pb-2'>Мэргэжилийн мэдээлэл</div>
  <div className='bg-white rounded-md'>
      <Table title={title} data={tData} name='Мэргэжил'></Table>
  </div>
  </div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <MainLayout index={1}>
          {page}
    </MainLayout>
  )
}

export default Page