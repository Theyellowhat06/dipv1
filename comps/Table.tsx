import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import Button from './Button';
import Modal from './Modal';
import InputBordered from './InputBordered';
import { useEffect, useState } from 'react';
import ModalConfirm from './ModalConfrim';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import MySelect from './MySelect';

interface TableData{
    title: string[],
    data: any[][] | undefined,
    name: string,
    resData: any,
    token: string,
    param: string,
    fdata: myFormData[]
}
interface myFormData{
  label: string,
  key: string,
  default?: string,
  value: any
}
export default function Table({title, data, name, resData, token, param, fdata}: TableData){
    const [filtered, setFiltered] = useState(false)
    const [filterName, setFilterName] = useState('Шүүлтүүр')
    const [showModal, setShowModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showDelete, setShowDelete] = useState(false) 
    const [showView, setShowView] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [indexid, setIndexid] = useState({index: -1, id: -1}) 
    const [formData, setFormData] = useState<myFormData[]>([{label: '...', key: '...', value: '...'}])
    const [emptyData, setEmptyData] = useState(fdata)
    
    const viewData = (id: number, isEdit: boolean) => {
      console.log('id', id);
      setIndexid({index: -1, id: id})
      axios.post('/api/hello', {param: `${param}/getById`, token: token, id: id}).then(res => {
        console.log(res.data);
        var result = res.data.result;
        if(result.success){
          var temp = formData;
          temp.length = 0;
          result.result.forEach((element: myFormData) => {
            temp.push({label: element.label, key: element.key, value: element.value, default: element.default})
          });
          // for(var key in result.result.label){
          //   temp.push({name: result.result.label[key], value: result.result[key]})
          // }
          console.log('asdasd',temp)
          setFormData(temp)
          console.log('hh', formData)
          if(isEdit){
            setShowEditModal(true);
          }else{
            setShowViewModal(true);
          }
          
          //console.log('result', result)
          //resData()
          //rd()
          //location.reload();
          //localStorage.setItem('token', result.token)
          //localStorage.setItem('user', JSON.stringify(result.result))
          
          //router.push('/manage')
        }
      })
    }
    useEffect(()=>{
        let formDataTemp =[{label: '...', key: '...', value: '...'}];
        formDataTemp.pop();
        title.forEach(element => {
            console.log(element)
            formDataTemp.push({
                key: '',
                label: element,
                value: ''
            })
        });
        setFormData(formDataTemp)
    }, [])
    return(
        <>
          <div className='flex justify-between items-center p-4'>
            <div className='flex items-center space-x-2'>
              <div>
                <div onClick={()=>{setFiltered(!filtered)}}>
                  <Button text={<><div></div><div>{filterName}</div><KeyboardArrowDownIcon/></>} extra='p-2 rounded-lg w-44 flex justify-between'/>
                </div>
                <div className={`absolute bg-white w-44 rounded-lg drop-shadow-sm ${filtered? ``: `hidden`}`}>
                  {title.map((row)=>(
                    <div className='p-2 hover:bg-primary/70 hover:text-white rounded-lg cursor-pointer  transition-colors' onClick={()=>{setFilterName(row); setFiltered(false)}}>{row}</div>
                  ))}
                </div>
              </div>
              
              <input className='border-2 rounded-lg p-2 outline-none' onFocus={()=>{setFiltered(false)}} placeholder='Хайх'></input>
              <div ><Button text={<SearchIcon/>} extra='p-2 rounded-full'/></div>
            </div>
              <div onClick={()=>setShowModal(true)}><Button text={<><AddIcon/><div className='px-2'>{name} нэмэх</div></>} extra='rounded-full p-2 flex items-center' /></div>
          </div>
          <div className='pb-4 h-[calc(100vh-145px)] overflow-y-scroll'>
        <table className='w-full rounded-md'>
                  <thead className='text-white bg-primary rounded-md'>
                      <tr>
                          <th className='p-4'>№</th>
                          {title.map((row)=>(
                            <th>{row}</th>
                          ))}
                          <th></th>
                      </tr>
                  </thead>
                  <tbody className='h-16 overflow-y-scroll'>
                    
                      {data?.map((row, index)=>(
                          <tr className={index % 2 == 0? `bg-white`: `bg-slate-100`}>
                              <td><div className='flex justify-center items-center'>{index+1}</div></td>
                              {row.map((col, i)=>(
                                i != 0? <td className='pl-2'>{col}</td>:<></>
                              ))}
                              
                              {/* <td className='pl-2'>{row.lname}</td>
                              <td className='pl-2'>{row.fname}</td>
                              <td className='pl-2'><div className='flex justify-center items-center'>{row.gender}</div></td>
                              <td className='pl-2'><div className='flex justify-center items-center'>{row.profession}</div></td>
                              <td className='pl-2'><div className='flex justify-center items-center'>{row.class}</div></td> */}
                              <td className='w-16'><div className='flex justify-center p-2 bg-gray'>
                                <div onClick={()=>{viewData(row[0], false);}} className='p-2 rounded-full hover:bg-blue-200 active:bg-blue-300 hover:text-white text-slate-500'><VisibilityIcon/></div>
                                <div onClick={()=>{viewData(row[0], true);}} className='p-2 ml-2 rounded-full hover:bg-primary/30 active:bg-primary/50 hover:text-white text-slate-500'><EditIcon/></div>
                                <div onClick={()=>{setIndexid({index: index, id: row[0]}); setShowDelete(true)}} className='p-2 ml-2 rounded-full text-slate-500 hover:bg-red-200 active:bg-red-300 hover:text-white'><DeleteIcon/></div>
                              </div></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              </div>
              <Modal isVisible={showModal} onClose={()=>setShowModal(false)} buttons={[<Button text={'Хадгалах'} extra={'p-2 rounded-md'} onClick={()=>setShowConfirm(true)}/>, <Button onClick={()=>setShowModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>{name} нэмэх</div>
                    <div className='grid grid-cols-2 gap-4 w-[600px] p-4'>
                        {emptyData.map((row, index)=>(
                            !Array.isArray(row.value)?<InputBordered disabled={false} type='text' label={row.label} value={row.value} onChange={(e)=>{let arr = [...emptyData]; arr[index].value = e.target.value; setEmptyData(arr)}}/> : <MySelect extra='' data={row.value} label={row.label} onChange={(value: string)=>{let arr = [...emptyData]; arr[index].default = value; setEmptyData(arr)}}></MySelect>
                        ))}
                        
                    </div>
                </div>
              </Modal>
              <Modal isVisible={showViewModal} onClose={()=>setShowViewModal(false)} buttons={[<Button onClick={()=>setShowViewModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>{name}</div>
                    <div className='grid grid-cols-2 gap-4 w-[600px] p-4'>
                        {formData.map((row, index)=>(
                            <InputBordered disabled={true} type='text' label={row.label} value={Array.isArray(row.value)?row.default:row.value} />
                        ))}
                    </div>
                </div>
              </Modal>
              <Modal isVisible={showEditModal} onClose={()=>setShowEditModal(false)} buttons={[<Button text={'Засах'} extra={'p-2 rounded-md'} onClick={()=>setShowEdit(true)}/>, <Button onClick={()=>setShowEditModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>{name} засах</div>
                    <div className='grid grid-cols-2 gap-4 w-[600px] p-4'>
                        {formData.map((row, index)=>(
                            !Array.isArray(row.value)?<InputBordered disabled={false} type='text' label={row.label} value={row.value} onChange={(e)=>{let arr = [...formData]; arr[index].value = e.target.value; setFormData(arr)}}/> : <MySelect extra='' data={row.value} label={row.label} defStr={row.default} onChange={(value: string)=>{let arr = [...formData]; arr[index].default = value; setFormData(arr)}}></MySelect>
                        ))}
                    </div>
                </div>
              </Modal>
              <ModalConfirm color='bg-primary' isVisible={showConfirm} onClose={()=>setShowConfirm(false)} button={<Button text='Тийм' extra='p-2 rounded-md' onClick={()=>{
                axios.post('/api/hello', {param: `${param}/add`, data: emptyData}).then(res => {
                  console.log(res.data);
                  var result = res.data.result;
                  if(result.success){
                    toast(result.msg, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-center' })
                    console.log('result', result)
                    resData()
                  }
                })
                setShowConfirm(false); setShowModal(false)}
                }></Button>}>
                Хадгалахдаа итгэлтэй байн уу?
              </ModalConfirm>
              <ModalConfirm color='bg-primary' isVisible={showEdit} onClose={()=>setShowEdit(false)} button={<Button text='Тийм' extra='p-2 rounded-md' onClick={()=>{
                axios.post('/api/hello', {param: `${param}/edit`, data: formData, id: indexid.id}).then(res => {
                  console.log(res.data);
                  var result = res.data.result;
                  if(result.success){
                    toast(result.msg, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-center' })
                    console.log('result', result)
                    resData()
                  }
                })
                setShowEdit(false); setShowEditModal(false)}
                }></Button>}>
                Хадгалахдаа итгэлтэй байн уу?
              </ModalConfirm>
              <ModalConfirm color='bg-red-500' isVisible={showDelete} onClose={()=>setShowDelete(false)} button={<Button text='Устгах' extra='p-2 rounded-md bg-red-500 hover:bg-red-500/80 active:bg-red-500' onClick={()=>{
                axios.post('/api/hello', {param: `${param}/delete`, data: formData, id: indexid.id}).then(res => {
                  console.log(res.data);
                  var result = res.data.result;
                  if(result.success){
                    toast(result.msg, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-center' })
                    console.log('result', result)
                    resData()
                  }
                });
                setShowDelete(false)}}></Button>}>
                {indexid.index+1} дугаартай {name}-г устгахдаа итгэлтэй байн уу?
              </ModalConfirm>
              </>
    );
}