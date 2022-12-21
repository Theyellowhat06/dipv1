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
  const title = ['Код', 'Нэр', 'Нэр (ENG)', 'Мэргэжил код', 'Багш код']
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
        label: 'Мэргэжил',
        key: '',
        value: [
          {
              key: '1',
              value: 'Бизнесийн удирдлага 45 хоног'
          },
          {
              key: '2',
              value: 'Бизнесийн удирдлага 3 сар'
          },
          {
              key: '3',
              value: 'Хүний нөөцийн удирдлага 45 хоног'
          },
          {
              key: '4',
              value: 'Хүний нөөцийн удирдлага 3 сар'
          },
          {
              key: '5',
              value: 'Соёлын удирдлага 3 сар'
          }
        ],
      },
    {
      label: 'Төлбөр',
      key: '',
      value: '',
    },
  ]
  const tData = [
    [1,'BGU108', 'Гүн ухаан', 'Philosophy', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>NT26</div>],
    [1,'HGU111', 'Хаадын гүн ухаан', 'Kings philosophy', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>BE25</div>],
    [1,'HHH101', 'Хувь хүний хөгжил төлөвшил', 'Individual development and upbringing', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DU11</div>],
    [1,'HSZ106', 'Харилцааны сэтгэл зүй', 'Relation psychology', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>TO14</div>],
    [1,'HYZ103', 'Хувь хүний хандлага, ёс зүй ', 'Personal ethics, attitude', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>TO14</div>],
    [1,'ILU104', 'Илтгэх урлаг', 'Art of speaking ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>BB15</div>],
    [1,'LOG109', 'Логик сэтгэлгээ', 'Logic mindset ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DN20</div>],
    [1,'MAN105', 'Манлайлал ', 'Leadership ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DU11</div>],
    [1,'MCS102', 'Мэргэшлийн чиглүүлэх сургалт', ' Instructing training for specializing', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>TG12</div>],
    [1,'ONH107', 'Олон нийтийн харилцаа, сошиал медиа маркетинг', 'Public relation', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>EP16</div>],
    [1,'UGU100', 'Уламжлалт гүн ухаан', 'Traditional philosophy', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DT24</div>],
    [1,'AHH209', 'Албан хэрэг хөтлөлт ', 'Documentation ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>TO14</div>],
    [1,'AHM212', 'Ахуйн харилцааны менежмент', 'Being relation aesthetics', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>TO14</div>],
    [1,'BBB205', 'Баг бүрдүүлэлт, багийн менежмент', 'Team recruiting, team management', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>TO14</div>],
    [1,'BOB207', 'Байгаль орчны удирдлага', 'Manage of nature environment', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>BB15</div>],
    [1,'BSM201', 'Менежмент, байгууллагын системийн менежмент', 'Management system of organization', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>ZO17</div>],
    [1,'BUD203', 'Бүтээмжийн удирдлага', 'Productive management', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>EP16</div>],
    [1,'CHA204', 'Чанарын удирдлага', 'Quality management ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>EP16</div>],
    [1,'GEZ210', 'Гэрээний эрх зүй ', 'Contract law', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>TG12</div>],
    [1,'HAB208', 'ХАБЭА-н менежмент систем ', 'Management system of OSSHA', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DE19</div>],
    [1,'HNM221', 'Хүний нөөцийн менежмент', 'Human resource namagement ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DU11</div>],
    [1,'IBH215', 'Имиж бүрдүүлэлт, харилцааны гоо зүй', 'Image making, relation aesthetics', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DD22</div>],
    [1,'MAR202', 'Маркетинг, PR ', 'Marketing and PR ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>BG18</div>],
    [1,'SBA214', 'Судалгааны арга зүй ', 'Research writing and methods', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DU11</div>],
    [1,'TIH213', 'Төр, иргэний нийгэм, хувийн хэвшлийн түншлэл', 'Partnership of polity ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>DU11</div>],
    [1,'ZUD206', 'Зөрчлийн удирдлага ', 'Conflict management ', <div className='flex justify-center items-center'>Бүгд</div>, <div className='flex justify-end items-center'>CI21</div>],
    [1,'DAD391', 'Дадлагын тайлан хамгаалах', 'Announcer’s ability', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>BB15</div>],
    [1,'LOG376', 'Логик сэтгэлгээ1 ', 'Logic mindset', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>TO14</div>],
    [1,'SAU373', 'Соёлын ажлын удирдлага, зохион байгуулалт', 'Cultural work administration, management', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>TG12</div>],
    [1,'SBO377', 'Соёлын боловсрол', 'Cultural education', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>TT30</div>],
    [1,'SCM380', 'Соёлын чөлөөт цагийн менежмент', 'Spare time management of culture', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>DN20</div>],
    [1,'SIN384', 'Соёлын инноваци', 'Cultural innovation', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>LT29</div>],
    [1,'SMA375', 'Соёлын маркетинг ', 'Cultural marketing ', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>DN20</div>],
    [1,'SME374', 'Соёлын менежмент', 'Cultural management', <div className='flex justify-center items-center'>CM</div>, <div className='flex justify-end items-center'>TT30</div>],

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
  <div className='text-xl pl-4 pb-2'>Хичээлийн мэдээлэл</div>
  <div className='bg-white rounded-md'>
      <Table title={title} data={tData} name='Хичээл' resData={undefined} token={token} param="prof" fdata={fdata}></Table>
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