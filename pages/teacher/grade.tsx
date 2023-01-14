import type { ReactElement } from 'react'
import MainLayout from '../../comps/layouts/main'
import TeacherLayout from '../../comps/layouts/tLayout'
import Profilebar from '../../comps/Profilebar'
import Sidebar from '../../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'



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
import axios from 'axios'
import Table from '../../comps/Table'

const Page: NextPageWithLayout = () => {
  const [student, setStudent] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [teacher, setTeacher] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [teacher_pt, setTeacher_pt] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [sprof, setSprof] = useState([0,0,0])
  const [tdegree, setTdegree] = useState([0,0,0])
  const router = useRouter()
  const [token, setToken] = useState<any>('');
  const [user, setUser] = useState<any>(`{username: ''}`);
  const [us, setUs] = useState({username: ''})
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
  const resData =()=>{
    var u = JSON.parse(user)
    setUs(u)
    console.log(token)
    axios.post('/api/hello', {param: 'student/getByTeacher', token: token, teacher_code: u.username}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        console.log('result', result)
        tDatatemp.length = 0
        const temp = tData

        result.result.forEach(function(e: any) {
          //temp?.push([e.id, e.code, e.name_mn, e.name_en, <div className='flex justify-center items-center'>{e.letter_time}</div>, <div className='flex justify-end items-center'>{e.price}₮</div>])
          if(e.grade){
            tDatatemp.push([e.id,'*'+e.code, e.rg_mn, e.lname_mn,<div className='flex justify-center items-center'>{e.fname_mn}</div>, <div className='flex justify-center items-center'>{e.gender == 1? 'Эрэгтэй': 'Эмэгтэй'}</div>, <div className='flex justify-center items-center'>{e.phone}</div>])
          }else tDatatemp.push([e.id,e.code, e.rg_mn, e.lname_mn,<div className='flex justify-center items-center'>{e.fname_mn}</div>, <div className='flex justify-center items-center'>{e.gender == 1? 'Эрэгтэй': 'Эмэгтэй'}</div>, <div className='flex justify-center items-center'>{e.phone}</div>])
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
        setUser(localStorage.getItem('user'))
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
    <Table title={title} data={tData} name='Сонсогч' resData={resData} token={token} param={'student'} teacher={us}></Table>
  </div>
</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <TeacherLayout index={2}>
          {page}
    </TeacherLayout>
  )
}

export default Page