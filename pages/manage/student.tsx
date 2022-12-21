import { ReactElement, useState } from 'react'
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

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
import Button from '../../comps/Button'
import Table from '../../comps/Table'
import axios from 'axios'
import { tokenToString } from 'typescript'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [token, setToken] = useState<any>('');
  const [tData, setTData] = useState<(any)[][]>();
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const title = ['Код', 'РД','Овог', 'Нэр', 'Хүйс', 'Утас']
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
      label: 'Аймаг/Нийслэл',
      key: '',
      value: [
        {
          key: '1',
          value: 'Улаанбаатар'
        },
        {
          key: '2',
          value: 'Архангай'
        },
        {
          key: '3',
          value: 'Баян-Өлгий'
        },
        {
          key: '4',
          value: 'Баянхонгор'
        },
        {
          key: '5',
          value: 'Булган'
        },
        {
          key: '6',
          value: 'Говь-Алтай'
        },
        {
          key: '7',
          value: 'Говьсүмбэр'
        },
        {
          key: '8',
          value: 'Дархан-Уул'
        },
        {
          key: '9',
          value: 'Дорноговь'
        },
        {
          key: '10',
          value: 'Дорнод'
        },
        {
          key: '11',
          value: 'Дундговь'
        },
        {
          key: '12',
          value: 'Завхан'
        },
        {
          key: '13',
          value: 'Орхон'
        },
        {
          key: '14',
          value: 'Өвөрхангай'
        },
        {
          key: '15',
          value: 'Өмнөговь'
        },
        {
          key: '16',
          value: 'Сүхбаатар'
        },
        {
          key: '17',
          value: 'Сэлэнгэ'
        },
        {
          key: '18',
          value: 'Төв'
        },
        {
          key: '19',
          value: 'Увс'
        },
        {
          key: '20',
          value: 'Ховд'
        },
        {
          key: '21',
          value: 'Хөвсгөл'
        },
        {
          key: '22',
          value: 'Хэнтий'
        },
      ],
    },
    {
      label: 'Сум/Дүүрэг',
      key: '',
      value: [
        {
          key: '1',
          value: 'Багануур'
        },
        {
          key: '2',
          value: 'Баянгол'
        },
        {
          key: '3',
          value: 'Баянзүрх'
        },
        {
          key: '4',
          value: 'Налайх'
        },
        {
          key: '5',
          value: 'Сонгинохайрхан'
        },
        {
          key: '6',
          value: 'Сүхбаатар'
        },
        {
          key: '7',
          value: 'Хан-Уул'
        },
        {
          key: '8',
          value: 'Чингэлтэй'
        },
      ],
    },
    {
      label: 'РД',
      key: '',
      value: '',
    },
    {
      label: 'РД (ENG)',
      key: '',
      value: '',
    },
    {
      label: 'Ургийн овог',
      key: '',
      value: '',
    },
    {
      label: 'Ургийн овог (ENG)',
      key: '',
      value: '',
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
      label: 'хүйс',
      key: '',
      value: [
        {
            key: '1',
            value: 'Эрэгтэй'
        },
        {
            key: '2',
            value: 'Эмэгтэй'
        },
      ],
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
      label: 'Элсэлт',
      key: '',
      value: [
        {
            key: '1',
            value: 'BM45D230110'
        },
        {
            key: '2',
            value: 'BM3M230116'
        },
      ],
    },
    {
      label: 'Төлбөрийн Хөнгөлөлт',
      key: '',
      default: 'Байхгүй',
      id: 1,
      value: [
        {
          key: '1',
          value: 'Байхгүй'
        },
        {
            key: '2',
            value: '10 Хувь'
        },
        {
            key: '3',
            value: '20 Хувь'
        },
        {
          key: '4',
          value: '50 Хувь'
      },
      ],
    },
    {
      label: 'Ажил',
      key: '',
      value: '',
    },
    {
      label: 'Албан тушаал',
      key: '',
      value: '',
    },
    {
      label: 'Боловсрол',
      key: '',
      value: [
        {
          key: '1',
          value: 'Бага'
        },
        {
            key: '2',
            value: 'Дунд'
        },
        {
            key: '3',
            value: 'Бүрэн дунд'
        },
        {
          key: '4',
          value: 'Их дээд'
      },
      ],
    },
    {
      label: 'Цахим шуудан',
      key: '',
      value: '',
    },
    {
      label: 'Утасны дугаар',
      key: '',
      value: '',
    },
    {
      label: 'Ажилийн утас',
      key: '',
      value: '',
    },
    {
      label: 'Гэрийн утас',
      key: '',
      value: '',
    },
    {
      label: 'Гэрийн хаяг',
      key: '',
      value: '',
    },
    {
      label: 'Фэйсбүүк хаяг',
      key: '',
      value: '',
    },
    
  ]
  
  const resData =()=>{
    console.log(token)
    axios.post('/api/hello', {param: 'student/getAll', token: token}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        console.log('result', result)
        tDatatemp.length = 0
        const temp = tData

        result.result.forEach(function(e: any) {
          //temp?.push([e.id, e.code, e.name_mn, e.name_en, <div className='flex justify-center items-center'>{e.letter_time}</div>, <div className='flex justify-end items-center'>{e.price}₮</div>])
          tDatatemp.push([e.id,e.code, e.rg_mn, e.lname_mn,<div className='flex justify-center items-center'>{e.fname_mn}</div>, <div className='flex justify-center items-center'>{e.gender == 1? 'Эрэгтэй': 'Эмэгтэй'}</div>, <div className='flex justify-center items-center'>{e.phone}</div>])
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
        if(token != null && token != ''){
            try{
                verify(token, key)
                resData()
            }catch(e){
              router.push('/login')
            }
        }else if(token == null){
            router.push('/login')
        }
    },[token])
  return <div>
      <div className='text-xl pl-4 pb-2'>Сонсогчийн мэдээлэл</div>
      <div className='bg-white rounded-md'>
        <Table title={title} data={tData} name='Сонсогч' resData={resData} token={token} param={'student'} fdata={fdata}></Table>
      </div>
    </div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <MainLayout index={3}>
          {page}
    </MainLayout>
  )
}

export default Page