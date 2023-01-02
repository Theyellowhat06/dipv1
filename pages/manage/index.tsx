import type { ReactElement } from 'react'
import MainLayout from '../../comps/layouts/main'
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
  const router = useRouter()
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const dataStudent = {
    labels: ["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
    datasets: [
      {
        label: "Шинэ сурагчид",
        data: student,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ]
  };
  const dataTeacher = {
    labels: ["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
    datasets: [
      {
        label: "Шинэ багш",
        data: teacher,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#5677ad"
      },
    ]
  };
  const dataPartTime = {
    labels: ["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
    datasets: [
      {
        label: "Шинэ цагын багш",
        data: teacher_pt,
        fill: true,
        backgroundColor: "rgba(255, 205, 86,0.2)",
        borderColor: "rgb(255, 205, 86)"
      },
    ]
  };
  const dataPStudent = {
    labels: [
      'BM',
      'HR',
      'CM'
    ],
    datasets: [{
      label: 'Сонсогч мэргэжилээр',
      data: sprof,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const dataPTeacher = {
    labels: [
      'Бакалавр',
      'Магистр',
      'Доктор'
    ],
    datasets: [{
      label: 'Багш боловсролын зэргээр',
      data: tdegree,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  const resData =()=>{
    axios.post('/api/hello', {param: 'student/getData'}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        setStudent(result.result.studentgraph)
        setTeacher(result.result.teachergraph)
        setTeacher_pt(result.result.teacher_ptgraph)
      }
    })
  }
  const resData1 =()=>{
    axios.post('/api/hello', {param: 'student/getPie'}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        setSprof(result.result.sprofgraph)
        setTdegree(result.result.tdegreegraph)
      }
    })
  }
    useEffect(()=>{
        var token = localStorage.getItem('token')
        if(token != null){
            try{
                verify(token, key)
                resData();
                resData1();
            }catch(e){
              router.push('/login')
            }
        }else{
            router.push('/login')
        }
    },[])
  return <div>
      <div className='text-xl pb-2 pl-4'>Үзүүлэлтүүд</div>
      <div className='flex space-x-4'>
        <div className='bg-white rounded-md w-1/3'>
          <Line data={dataStudent}/>
        </div>
        <div className='bg-white rounded-md w-1/3'>
          <Line data={dataTeacher}/>
        </div>
        <div className='bg-white rounded-md w-1/3'>
          <Line data={dataPartTime}/>
        </div>
      </div>
      
      <div className='flex space-x-4'>
        <div className='w-1/2'>
          <div className='text-xl py-2 pt-4 pl-4'>Сонсогч мэргэжилээр</div>
          <div className='bg-white rounded-md'>
            <Doughnut data={dataPStudent}/>
          </div>
        </div>
        <div className='w-1/2'>
          <div className='text-xl py-2 pt-4 pl-4'>Багш боловсролын зэргээр</div>
          <div className='bg-white rounded-md'>
            <Doughnut data={dataPTeacher}/>
          </div>
        </div>
      </div>
    </div> 
}

Page.getLayout = function getLayout(page: ReactElement) {
  
  
  return (
    <MainLayout index={0}>
          {page}
    </MainLayout>
  )
}

export default Page