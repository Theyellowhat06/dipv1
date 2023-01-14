import type { JSXElementConstructor, ReactElement, ReactFragment } from 'react'
import MainLayout from '../../comps/layouts/main'
import TeacherLayout from '../../comps/layouts/tLayout'
import Profilebar from '../../comps/Profilebar'
import Sidebar from '../../comps/Sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
import axios from 'axios'
import Button from '../../comps/Button'
import Modal from '../../comps/Modal'
import InputBordered from '../../comps/InputBordered'
import MySelect from '../../comps/MySelect'

const Page: NextPageWithLayout = () => {
  const [student, setStudent] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [teacher, setTeacher] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [teacher_pt, setTeacher_pt] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [sprof, setSprof] = useState([0,0,0])
  const [tdegree, setTdegree] = useState([0,0,0])
  const [showModal, setShowModal] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [filterName, setFilterName] = useState('Анги')
  const [emptyData, setEmptyData] = useState([
    {
      label: 'Багшын код',
      key: '',
      value: '',
    },
    {
        label: 'Хичээлийн код',
        key: '',
        value: '',
      },
      {
        label: 'Хичээл орох өдөр',
        key: '',
        id: 0,
        default: 'Даваа',
        value: [
            {
                key: '1',
                value: 'Даваа'
            },
            {
                key: '2',
                value: 'Мягмар'
            },
            {
              key: '3',
              value: 'Лхагва'
          },
        {
            key: '4',
            value: 'Пүрэв'
        },
        {
            key: '5',
            value: 'Баасан'
        },
        {
            key: '6',
            value: 'Бямба'
        },
        {
            key: '7',
            value: 'Ням'
        },
        ],
      },
      {
        label: 'Хичээл орох цаг',
        key: '',
        id: 0,
        value: [
            {
                key: '1',
                value: '1'
            },
            {
                key: '2',
                value: '2'
            },
            {
              key: '3',
              value: '3'
          },
        {
            key: '4',
            value: '4'
        },
        {
            key: '5',
            value: '5'
        },
        {
            key: '6',
            value: '6'
        },
        {
            key: '7',
            value: '7'
        },
        {
            key: '7',
            value: '8'
        },
        ],
      },
      {
        label: 'Хичээл орох анги',
        key: '',
        value: '',
      },
      {
        label: 'Хичээллэх төрөл',
        key: '',
        id: 0,
        default: 'Даваа',
        value: [
            {
                key: '1',
                value: 'Лекц'
            },
            {
                key: '2',
                value: 'Семинар'
            },
            {
              key: '3',
              value: 'Бие даалт'
          },
        ],
      },
      
    ]
      )
  const [classNumber, setClassNumber] = useState([{class_number: "-"}])
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
    axios.post('/api/hello', {param: 'schedule/getClassNumber'}).then(res => {
      console.log(res.data);
      var result = res.data.result;
      if(result.success){
        setClassNumber(result.result)
        console.log(classNumber)
      }
    })
  }
    useEffect(()=>{
        var token = localStorage.getItem('token')
        if(token != null){
            try{
                verify(token, key)
                resData()
            }catch(e){
              router.push('/login')
            }
        }else{
            router.push('/login')
        }
    },[])
  return <div>
  <div className='text-xl pl-4 pb-2'>Хичээлийн хуваар</div>
  <div className='bg-white rounded-md'>
    <div className='w-full flex justify-between p-4'>
        <div>
            <div onClick={()=>{setFiltered(!filtered)}}>
                <Button text={<><div></div><div>{filterName}</div><KeyboardArrowDownIcon/></>} extra='p-2 rounded-lg w-44 flex justify-between'/>
            </div>
            <div className={`absolute bg-white w-44 rounded-lg drop-shadow-sm ${filtered? ``: `hidden`}`}>
                {classNumber.map((row)=>(
                <div className='p-2 hover:bg-primary/70 hover:text-white rounded-lg cursor-pointer  transition-colors' onClick={()=>{setFilterName(row.class_number); setFiltered(false);
                    axios.post('/api/hello', {param: 'schedule/getByClassNumber', class_number: row.class_number}).then(res => {
                        console.log(res.data);
                        var result = res.data.result;
                        if(result.success){
                        setSchedule(result.result)
                        console.log(classNumber)
                        }
                    })
                }}>{row.class_number}</div>
                ))}
            </div>
        </div>
        <div>
            <div onClick={()=>{setShowModal(true)}}><Button text={<><AddIcon/><div className='px-2'>Хичээлийн хуваар нэмэх</div></>} extra='rounded-full p-2 flex items-center' /></div>
        </div>
    </div>
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
    <Modal isVisible={showModal} onClose={()=>setShowModal(false)} buttons={[<Button text={'Хадгалах'} extra={'p-2 rounded-md'} onClick={()=>{}}/>, <Button onClick={()=>setShowModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>Хичээлийн хуваар нэмэх</div>
                    <div className='grid grid-cols-2 gap-4 w-[600px] p-4 max-h-[80vh] overflow-scroll'>
                        {emptyData?.map((row, index)=>(
                            !Array.isArray(row.value)?<InputBordered disabled={false} type='text' label={row.label} value={row.value} onChange={(e)=>{let arr = [...emptyData]; arr[index].value = e.target.value; setEmptyData(arr)}}/> : <MySelect extra='' data={row.value} label={row.label} onChange={(value: string, id: number)=>{let arr = [...emptyData]; arr[index].default = value; arr[index].id = id; setEmptyData(arr)}}></MySelect>
                        ))}
                        
                    </div>
                </div>
              </Modal>
    {/* <div>
        {
        data.map((e,i) => (
            <div className='flex'>
                {i < 1? e.map((el, index)=>(
                    index > 0
                        ? <div className='w-[10%] h-12 m-2 flex justify-center items-center'>{index}</div> 
                        : <div className='w-[5%] h-12 m-2 flex justify-center items-center'></div>
                )): e.map((el, index)=>(
                    index > 0
                        ? el == 0
                            ? <div className='w-[10%] h-12 m-2 rounded-md bg-backgray flex justify-center items-center'></div>
                            : <div className='w-[10%] h-12 m-2 rounded-md bg-primary flex justify-center items-center text-white'>{el}</div> 
                        : <div className='w-[5%] h-12 m-2 rounded-md flex justify-center items-center'>{i}</div>
                ))}
            </div>
        ))
        }
    </div> */}
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
    <MainLayout index={5}>
          {page}
    </MainLayout>
  )
}

export default Page