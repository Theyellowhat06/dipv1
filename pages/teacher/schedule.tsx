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

const Page: NextPageWithLayout = () => {
  const [student, setStudent] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [teacher, setTeacher] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [teacher_pt, setTeacher_pt] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [sprof, setSprof] = useState([0,0,0])
  const [tdegree, setTdegree] = useState([0,0,0])
  const [user, setUser] = useState<any>('')
  const [schedule, setSchedule] = useState<any>([
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ])
  const router = useRouter()
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const data = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,'BGU108',0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,'ONH107',0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ]
  const resData =()=>{
    console.log(JSON.parse(user))
    var u = JSON.parse(user)
    axios.post('/api/hello', {param: 'schedule/getByTeacherCode', teacher_code: u.username}).then(res => {
        console.log(res.data);
        var result = res.data.result;
        if(result.success){
            setSchedule(result.result)
        }
    })
  }
    useEffect(()=>{
        setUser(localStorage.getItem('user'))
        if(user != null && user != ''){
            resData()
        }else if(user == null){
            router.push('/login')
        }
    },[user])
  return <div>
  <div className='text-xl pl-4 pb-2'>Хичээлийн хуваар</div>
  <div className='bg-white rounded-md'>
  <div className='pb-4'>
        {
        schedule.map((e: any[],i: number) => (
            i < 1
                ? <><div className='flex'>{
                    e.map((el, index)=>(
                        index > 0
                            ? <div className='w-[10%] h-12 m-2 flex justify-center items-center'>{(index + 1) + '-р цаг'}</div> 
                            : <><div className='w-[5%] h-12 m-2 flex justify-center items-center'></div><div className='w-[10%] h-12 m-2 flex justify-center items-center'>{(index + 1) + '-р цаг'}</div> </>
                    ))
                }</div>
                <div className='flex'>
                    {e.map((el, index)=>(
                        index > 0
                            ? el == 0
                                ? <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
                                : <div className='w-[10%] h-12 m-2 rounded-md bg-primary flex justify-center items-center text-white'>{el.subject_code}/{el.type == 1? 'Лекц' : el.type == 2? 'Сем' : 'БД'}</div> 
                            : <><div className='w-[5%] h-12 m-2 rounded-md flex justify-center items-center'>{'Өдөр '+(i + 1)}</div>
                            {el == 0
                                ? <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
                                : <div className='w-[10%] h-12 m-2 rounded-md bg-primary flex justify-center items-center text-white'>{el.subject_code}/{el.type == 1? 'Лекц' : el.type == 2? 'Сем' : 'БД'}</div> }</> 
                    ))}
                </div>
                </>
                : <div className='flex'>
                    {i < 1? <></>
                        : e.map((el, index)=>(
                        index > 0
                            ? el == 0
                                ? <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
                                : <div className='w-[10%] h-12 m-2 rounded-md bg-primary flex justify-center items-center text-white'>{el.subject_code}/{el.type == 1? 'Лекц' : el.type == 2? 'Сем' : 'БД'}</div> 
                            : <><div className='w-[5%] h-12 m-2 rounded-md flex justify-center items-center'>{'Өдөр '+(i + 1)}</div>
                            {el == 0
                                ? <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
                                : <div className='w-[10%] h-12 m-2 rounded-md bg-primary flex justify-center items-center text-white'>{el.subject_code}/{el.type == 1? 'Лекц' : el.type == 2? 'Сем' : 'БД'}</div> }</> 
                    ))}
                </div>
        ))
        }
    </div>
    {/* <div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>1</div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>2</div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>3</div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>4</div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>5</div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>6</div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>7</div>
            <div className='w-[10%] h-12 m-2 flex justify-center items-center'>8</div>
        </div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 rounded-md flex justify-center items-center'>1</div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
        </div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 rounded-md flex justify-center items-center'>2</div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
        </div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 rounded-md flex justify-center items-center'>3</div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-primary flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
        </div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 rounded-md flex justify-center items-center'>4</div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
        </div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 rounded-md flex justify-center items-center'>5</div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-primary flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
        </div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 rounded-md flex justify-center items-center'>6</div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
        </div>
        <div className='flex'>
            <div className='w-[10%] h-12 m-2 rounded-md flex justify-center items-center'>7</div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
            <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
        </div>
        
    </div> */}
  </div>
</div> 
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <TeacherLayout index={1}>
          {page}
    </TeacherLayout>
  )
}

export default Page