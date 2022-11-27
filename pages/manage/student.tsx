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

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [filtered, setFiltered] = useState(false)
  const [filterName, setFilterName] = useState('Шүүлтүүр')
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const title = ['Код', 'Овог', 'Нэр', 'Хүйс', 'Мэргэжил', 'Анги']
  const tData = [
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    ['S234', 'Билгүүн', 'Мөнхэрдэнэ', <div className='flex justify-center items-center'>Эр</div>, <div className='flex justify-center items-center'>HR</div>, <div className='flex justify-center items-center'>HR201009</div>],
    
  ]
  
  
    useEffect(()=>{
        var token = localStorage.getItem('token')
        if(token != null){
            try{
                verify(token, key)
            }catch(e){
              router.push('/login')
            }
        }else{
            router.push('/login')
        }
    },[])
  return <div>
      <div className='text-xl pl-4 pb-2'>Сонсогчийн мэдээлэл</div>
      <div className='bg-white rounded-md'>
        <Table title={title} data={tData} name='Сонсогч'></Table>
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