import type { ReactElement } from 'react'
import MainLayout from '../../comps/layouts/main'
import Profilebar from '../../comps/Profilebar'
import Sidebar from '../../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react'
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

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
  const dataStudent = {
    labels: ["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
    datasets: [
      {
        label: "Шинэ сурагчид",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 13, 0],
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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 2, 0],
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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 0],
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
      data: [200, 150, 50],
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
      'BM',
      'HR',
      'CM'
    ],
    datasets: [{
      label: 'Багш мэргэжилээр',
      data: [7, 5, 4],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  
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
          <div className='text-xl py-2 pt-4 pl-4'>Багш мэргэжилээр</div>
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