import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import Button from './Button';
import Modal from './Modal';
import InputBordered from './InputBordered';
import { useEffect, useState } from 'react';
import ModalConfirm from './ModalConfrim';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import MySelect from './MySelect';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import * as XLSX from 'xlsx';
import { idText } from 'typescript';

interface TableData{
    title: string[],
    data: any[][] | undefined,
    name: string,
    resData: any,
    token: string,
    param: string,
    fdata?: myFormData[],
    diplom?: boolean,
    student?: boolean,
    teacher?: {username: string}
}
interface myFormData{
  label: string,
  key: string,
  default?: string,
  value: any,
  id?: number
}
interface myExcel{
  code: string,
  register: string,
  
}

export default function Table({title, data, name, resData, token, param, fdata, diplom, student, teacher}: TableData){
    const [filtered, setFiltered] = useState(false)
    const [filterName, setFilterName] = useState('Шүүлтүүр')
    const [showModal, setShowModal] = useState(false)
    const [excelModal, setExcelModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [showPrintModal, setShowPrintModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showDelete, setShowDelete] = useState(false) 
    const [showGrade, setShowGrade] = useState(false)
    const [myindex, setMyindex] = useState(1) 
    const [grade, setGrade] = useState([{subject_code: 'ASD', name: 'aassdd', grade: '10'}])
    const [studentGrade, setStudentGrade] = useState([{subject_code: '', name: '', grade: '', letter_grade: ''}])
    const [studentCode, setStudentCode] = useState('')
    const [studentInfo, setStudentInfo] = useState({code: '', famname: '', lname: '', fname: '', register: '', profCode: ''})
    const [showView, setShowView] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [indexid, setIndexid] = useState({index: -1, id: -1}) 
    const [formData, setFormData] = useState<myFormData[]>([{label: '...', key: '...', value: '...'}])
    const [emptyData, setEmptyData] = useState(fdata)
    const [items, setItems] = useState([]);
  const elenent = 1
  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target?.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d: any) => {
      console.log(d)
      setItems(d);
      console.log(items)
    });
  };
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
    const profName = (code: string) =>{
      var name = '';
      console.log('code is: ',code)
      if(code.toUpperCase() == 'CM'){
        name = 'Соёлын удирдлага'
      }else if(code.toUpperCase() == 'HR'){
        name = 'Хүний нөөцийн удирдлага'
      }else{
        name = 'Бизнесийн удирдлага'
      }
      return name
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
            <div className='flex'>
              {student? <div className='mr-2' onClick={()=>setExcelModal(true)}><Button text={<><AttachFileIcon/><div className='px-2'>Excel-ээс татах</div></>} extra='rounded-full p-2 flex items-center' /></div>: <></>}
              {diplom || !fdata? <></>: <div onClick={()=>setShowModal(true)}><Button text={<><AddIcon/><div className='px-2'>{name} нэмэх</div></>} extra='rounded-full p-2 flex items-center' /></div>}
              </div>
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
                                i != 0? col.length > 30? <td className='pl-2 max-w-[200px] text-ellipsis overflow-hidden'>{col}</td>:<td className='pl-2'>{col}</td>:<></>
                              ))}
                              
                              {/* <td className='pl-2'>{row.lname}</td>
                              <td className='pl-2'>{row.fname}</td>
                              <td className='pl-2'><div className='flex justify-center items-center'>{row.gender}</div></td>
                              <td className='pl-2'><div className='flex justify-center items-center'>{row.profession}</div></td>
                              <td className='pl-2'><div className='flex justify-center items-center'>{row.class}</div></td> */}
                              <td className='w-16'><div className='flex justify-center p-2 bg-gray'>
                                {diplom? <div onClick={()=>{
                                  setStudentInfo({
                                    code: row[1],
                                    register: row[2],
                                    famname: row[3],
                                    lname: row[4],
                                    fname: row[5],
                                    profCode: row[6].props.children
                                  })
                                  setMyindex(index)
                                  axios.post('/api/hello', {param: `student/getGradeByStudent`, token: token, student_code: row[1]}).then(res => {
                                    console.log(res.data);
                                    var result = res.data.result;
                                    if(result.success){
                                      setStudentGrade(result.result)
                                      setShowPrintModal(true)
                                    }
                                  })
                                  
                                }} className='p-2 rounded-full hover:bg-blue-200 active:bg-blue-300 hover:text-white text-slate-500'><PrintIcon/></div>
                                : fdata?<><div onClick={()=>{viewData(row[0], false);}} className='p-2 rounded-full hover:bg-blue-200 active:bg-blue-300 hover:text-white text-slate-500'><VisibilityIcon/></div>
                                <div onClick={()=>{viewData(row[0], true);}} className='p-2 ml-2 rounded-full hover:bg-primary/30 active:bg-primary/50 hover:text-white text-slate-500'><EditIcon/></div>
                                <div onClick={()=>{setIndexid({index: index, id: row[0]}); setShowDelete(true)}} className='p-2 ml-2 rounded-full text-slate-500 hover:bg-red-200 active:bg-red-300 hover:text-white'><DeleteIcon/></div></>
                                : <div onClick={()=>{
                                  axios.post('/api/hello', {param: `student/getGrade`, token: token, student_code: row[1], teacher_code: teacher?.username}).then(res => {
                                    console.log(res.data);
                                    var result = res.data.result;
                                    if(result.success){
                                      setGrade(result.result)
                                      setStudentCode(row[1])
                                      setShowGrade(true)
                                    }
                                  })
                                  }} className='p-2 ml-2 rounded-full hover:bg-primary/30 active:bg-primary/50 hover:text-white text-slate-500'><EditIcon/></div>} 
                              </div></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              </div>
              <Modal isVisible={showModal} onClose={()=>setShowModal(false)} buttons={[<Button text={'Хадгалах'} extra={'p-2 rounded-md'} onClick={()=>setShowConfirm(true)}/>, <Button onClick={()=>setShowModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>{name} нэмэх</div>
                    <div className='grid grid-cols-2 gap-4 w-[600px] p-4 max-h-[80vh] overflow-scroll'>
                        {emptyData?.map((row, index)=>(
                            !Array.isArray(row.value)?<InputBordered disabled={false} type='text' label={row.label} value={row.value} onChange={(e)=>{let arr = [...emptyData]; arr[index].value = e.target.value; setEmptyData(arr)}}/> : <MySelect extra='' data={row.value} label={row.label} onChange={(value: string, id: number)=>{let arr = [...emptyData]; arr[index].default = value; arr[index].id = id; setEmptyData(arr)}}></MySelect>
                        ))}
                        
                    </div>
                </div>
              </Modal>
              <Modal isVisible={showGrade} onClose={()=>setShowModal(false)} buttons={[<Button text={'Хадгалах'} extra={'p-2 rounded-md'} onClick={()=>setShowConfirm(true)}/>, <Button onClick={()=>setShowGrade(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>Дүгнэх цонх</div>
                    <div className='min-w-[600px] p-4 max-h-[80vh] overflow-scroll'>
                        {grade?.map((row, index)=>(
                            <div className='flex items-center justify-center'>
                              <div className='w-20'>{row.subject_code}</div>
                              <div className='w-96'>{row.name}</div>
                              <InputBordered disabled={false} type='text' label='Дүн' value={row.grade} onChange={(e)=>{let arr = [...grade]; arr[index].grade = e.target.value; setGrade(arr)}}></InputBordered>
                            </div>
                          ))}
                        
                    </div>
                </div>
              </Modal>
              <Modal isVisible={excelModal} onClose={()=>setShowModal(false)} buttons={[<Button text={'Хадгалах'} extra={'p-2 rounded-md'} onClick={()=>{setShowConfirm(true); console.log(items)}}/>, <Button onClick={()=>{setExcelModal(false); setItems([])}} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>{name} Excel import</div>
                    <div className=' w-[600px] p-4 max-h-[80vh] overflow-scroll'>
                        <input type={'file'} onChange={(e)=>{ const file = e.target.files? e.target.files[0]: null; readExcel(file)}}></input>
                    </div>
                </div>
              </Modal>
              <Modal isVisible={showPrintModal} onClose={()=>setShowPrintModal(false)} buttons={[<Button text={'Хэвлэх'} extra={'p-2 rounded-md'} onClick={()=> {
                //console.log()
            var divContents = document.getElementById("diplom")?.innerHTML;
            //console.log(divContents)
            const a = window.open('', 'Print-Window');
            a?.document.write('<html>'); 
            a?.document.write('<body>');
            a?.document.write(divContents? divContents: '');
            a?.document.write('</body></html>');
            a?.document.close();
            a?.print();
            setTimeout(function(){a?.close();}, 10)
            
}}/>, <Button onClick={()=>setShowPrintModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div id='diplom' className='font-serif'>
                    <div className='w-[850px] p-4 max-h-[80vh] overflow-scroll text-lg' style={{width: '850px', fontSize: '1.125rem', lineHeight: '1.75rem', padding: '1rem'}}>
                      <div className='w-[800px] p-16 h-[1100px] drop-shadow-md bg-white rounded-md' style={{height: '1000px', padding: '4rem'}}>
                        <div className='text-center text-2xl pt-52' style={{fontSize: '1.5rem', lineHeight: '2rem', paddingTop: '13rem', textAlign: 'center'}}>
                          <div><b>МОНГОЛ УЛС</b></div>
                          <div><b>УЛС ТӨР МЕНЕЖМЕНТИЙН АКАДЕМИ</b></div>
                          <div><b>МЭРГЭШҮҮЛЭХ ДИПЛОМ</b></div>
                          <div className=' text-lg pt-14' style={{fontSize: '1.125rem', lineHeight: '1.75rem', paddingTop: '3.5rem'}}>Дугаар № 2023010{myindex + 1}</div>
                        </div>
                        <div className='text-justify pt-16' style={{textAlign: 'justify', paddingTop: '4rem'}}>
                        Монгол улсын иргэн <b>{studentInfo.famname.toUpperCase()}</b> овогийн <b>{studentInfo.lname}ийн {studentInfo.fname}</b> /{studentInfo.register}/ нь 2022 оны хичээлийн жилд Улс Төр Менежментийн Академид <b>"{profName(studentInfo.profCode)}"</b> -аар мэргэшүүлэх сургалтын хөтөлбөрийг амжилттай дүүргэсэн тул "Төгсөлтийн ажил хамгаалуулах зөвлөл" -ийн шийдвэрийг үндэслэн академийн Ерөнхийлөгчийн 2022 оны 12 -р сарын 03 -ний өдөрийн 030 тоот тушаалаар <b>"{profName(studentInfo.profCode).substring(0,profName(studentInfo.profCode).length-1)}ын менежер"</b> -ээр мэргэшүүлэх <b>Диплом</b> олгов  
                        </div>
                        <div className='text-center pt-16' style={{textAlign: 'center', paddingTop: '4rem'}}>
                          <div>УЗ -ийн дарга, Ерөнхийлөгч</div>
                          <div className='h-[100px]' style={{height: '100px'}}></div>
                          <div>/Профессор/</div>
                        </div>
                      </div>
                      <div className='w-[800px] p-16 h-[1100px] drop-shadow-md bg-white rounded-md mt-4' style={{height: '1000px', padding: '4rem'}}>
                        <div className='text-center pt-32' style={{textAlign: 'center', paddingTop: '8rem'}}>
                          <div><b>"{profName(studentInfo.profCode)}"</b> -аар мэргэшүүлэх сургэлтын</div>
                          <div>хөтөлбөрийн 2023010{myindex + 1} дугаартай дипломын 1-р хавсралт</div>
                        </div>
                        <div className='text-justify pt-8' style={{textAlign:'justify', paddingTop: '2rem'}}>
                          {studentInfo.famname.length > 12?<> <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[150px]' style={{width: '150px'}}>Ургийн овог: </div>
                            <div className='max-w-[150px]' style={{width: '150px'}}>{studentInfo.famname}</div>
                            </div>
                            <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[200px]' style={{width: '200px'}}>Регистрийн дугаар: </div>
                            <div className='w-[150px]' style={{width: '150px'}}>{studentInfo.register}</div>
                          </div></>: <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[150px]' style={{width: '150px'}}>Ургийн овог: </div>
                            <div className='max-w-[150px]' style={{width: '150px'}}>{studentInfo.famname}</div>
                            <div className='w-[200px]' style={{width: '200px'}}>Регистрийн дугаар: </div>
                            <div className='w-[150px]' style={{width: '150px'}}>{studentInfo.register}</div>
                          </div>}
                          {studentInfo.lname.length > 12?<>
                            <div className='flex' style={{display: 'flex'}}>
                              <div className='w-[150px]' style={{width: '150px'}}>Эцэг/эх/-ийн нэр: </div>
                              <div className='max-w-[150px]' style={{width: '150px'}}>{studentInfo.lname}</div>
                              </div>
                              <div className='flex' style={{display: 'flex'}}>
                              <div className='w-[200px]' style={{width: '200px'}}>Үнэмлэх дипломын №: </div>
                              <div className='w-[150px]' style={{width: '150px'}}>20230101</div>
                            </div>
                          </>:<div className='flex' style={{display: 'flex'}}>
                            <div className='w-[150px]' style={{width: '150px'}}>Эцэг/эх/-ийн нэр: </div>
                            <div className='max-w-[150px]' style={{width: '150px'}}>{studentInfo.lname}</div>
                            <div className='w-[200px]' style={{width: '200px'}}>Үнэмлэх дипломын №: </div>
                            <div className='w-[150px]' style={{width: '150px'}}>2023010{myindex + 1}</div>
                          </div>}
                          {studentInfo.fname.length > 12?<>
                            <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[150px]' style={{width: '150px'}}>Өөрийн нэр: </div>
                            <div className='w-[150px]' style={{width: '150px'}}>{studentInfo.fname}</div>
                            </div>
                            <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[200px]' style={{width: '200px'}}>Бүртгэлийн дугаар: </div>
                            <div className='w-[150px]' style={{width: '150px'}}>{studentInfo.code}</div>
                          </div>
                          </>:<div className='flex' style={{display: 'flex'}}>
                            <div className='w-[150px]' style={{width: '150px'}}>Өөрийн нэр: </div>
                            <div className='w-[150px]' style={{width: '150px'}}>{studentInfo.fname}</div>
                            <div className='w-[200px]' style={{width: '200px'}}>Бүртгэлийн дугаар: </div>
                            <div className='w-[150px]' style={{width: '150px'}}>{studentInfo.code}</div>
                          </div>}
                        </div>
                        <div className='text-justify pt-8' style={{textAlign: 'justify', paddingTop: '2rem'}}>
                          <div className='flex font-bold' style={{display: 'flex', fontWeight: 'bold'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>Код</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Судалсан Хичээл</div>
                            <div className='w-[70px]' style={{width: '70px'}}>Багц цаг</div>
                            <div className='w-[70px]' style={{width: '70px'}}>Оноо</div>
                            <div className='w-[70px]' style={{width: '70px'}}>Дүн</div>
                          </div>
                          {studentGrade.map((element)=>(
                            <div className='flex' style={{display: 'flex'}}>
                              <div className='w-[100px]' style={{width: '100px'}}>{element.subject_code}</div>
                              <div className='w-[400px]' style={{width: '400px'}}>{element.name}</div>
                              <div className='w-[70px]' style={{width: '70px'}}>{elenent}</div>
                              <div className='w-[70px]' style={{width: '70px'}}>{element.grade}</div>
                              <div className='w-[40px] text-end' style={{width: '40px', textAlign: 'end'}}>{element.letter_grade}</div>
                            </div>
                          ))}
                          
                          {/* <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>HGU111</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Хаадын гүн ухаан</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div>
                          <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>HHH101</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Хувь хүний хөгжил төлөвшил</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div>
                          <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>HSZ106</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Харилцааны сэтгэл зүй</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div>
                          <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>HYZ103</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Хувь хүний хандлага, ёс зүй</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div>
                          <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>ILU104</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Илтгэх урлаг</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div>
                          <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>LOG109</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Логик сэтгэлгээ</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div>
                          <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>MAN105</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Манлайлал</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div>
                          <div className='flex' style={{display: 'flex'}}>
                            <div className='w-[100px]' style={{width: '100px'}}>MCS102</div>
                            <div className='w-[400px]' style={{width: '400px'}}>Мэргэшлийн чиглүүлэх сургалт</div>
                            <div className='w-[70px]' style={{width: '70px'}}>1</div>
                            <div className='w-[70px]' style={{width: '70px'}}>96</div>
                            <div className='w-[70px]' style={{width: '70px'}}>A</div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                </div>
              </Modal>
              <Modal isVisible={showViewModal} onClose={()=>setShowViewModal(false)} buttons={[<Button onClick={()=>setShowViewModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>{name}</div>
                    <div className='grid grid-cols-2 gap-4 w-[600px] p-4 max-h-[80vh] overflow-scroll'>
                        {formData.map((row, index)=>(
                            <InputBordered disabled={true} type='text' label={row.label} value={Array.isArray(row.value)?row.default:row.value} />
                        ))}
                    </div>
                </div>
              </Modal>
              <Modal isVisible={showEditModal} onClose={()=>setShowEditModal(false)} buttons={[<Button text={'Засах'} extra={'p-2 rounded-md'} onClick={()=>setShowEdit(true)}/>, <Button onClick={()=>setShowEditModal(false)} text="Хаах" extra="rounded-md p-2 bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>]}>
                <div>
                    <div className='px-4 pb-4 text-lg'>{name} засах</div>
                    <div className='grid grid-cols-2 gap-4 w-[600px] p-4 max-h-[80vh] overflow-scroll'>
                        {formData.map((row, index)=>(
                            !Array.isArray(row.value)?<InputBordered disabled={false} type='text' label={row.label} value={row.value} onChange={(e)=>{let arr = [...formData]; arr[index].value = e.target.value; setFormData(arr)}}/> : <MySelect extra='' data={row.value} label={row.label} defStr={row.default} onChange={(value: string, id: number)=>{let arr = [...formData]; arr[index].default = value; arr[index].id = id; setFormData(arr)}}></MySelect>
                        ))}
                    </div>
                </div>
              </Modal>
              <ModalConfirm color='bg-primary' isVisible={showConfirm} onClose={()=>setShowConfirm(false)} button={<Button text='Тийм' extra='p-2 rounded-md' onClick={()=>{
                if(teacher){
                  axios.post('/api/hello', {param: `student/setGrade`, data: grade, student_code: studentCode, teacher_code: teacher.username}).then(res => {
                    console.log(res.data);
                    var result = res.data.result;
                    if(result.success){
                      toast(result.msg, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-center' })
                      console.log('result', result)
                      resData()
                      setShowConfirm(false)
                      setShowGrade(false)
                    }
                  })
                }else{
                  if(items.length > 0){
                    axios.post('/api/hello', {param: `${param}/addArr`, data: items}).then(res => {
                      console.log(res.data);
                      var result = res.data.result;
                      if(result.success){
                        toast(result.msg, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-center' })
                        console.log('result', result)
                        resData()
                      }
                    })
                  }else{
                    axios.post('/api/hello', {param: `${param}/add`, data: emptyData}).then(res => {
                      console.log(res.data);
                      var result = res.data.result;
                      if(result.success){
                        toast(result.msg, { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-center' })
                        console.log('result', result)
                        resData()
                      }
                    })
                  }
                }
                
                setShowConfirm(false); setShowModal(false); setExcelModal(false)}
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