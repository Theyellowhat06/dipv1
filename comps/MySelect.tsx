import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from "./Button";

interface myData{
    key: string,
    value: string
}
interface mySelect{
    label: string,
    extra: string,
    data: myData[],
    defStr?: string
    onChange?: any,
}

export default function MySelect({extra, data, label, defStr, onChange}: mySelect) {
    const [filtered, setFiltered] = useState(false)
    const [filterName, setFilterName] = useState('')
    
    var asd = [{
        key: 'hoho',
        value: 'asd'
    },{
        key: 'hoho1',
        value: 'asd1'
    }]
    useEffect(()=>{
        if(defStr && filterName == '')setFilterName(defStr)
    })
    
    
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <div onClick={()=>{setFiltered(!filtered)}}>
            <Button text={<><div></div><div>{filterName}</div><KeyboardArrowDownIcon/></>} className='' extra='p-2 rounded-lg hover:text-white flex justify-between bg-gray-50 outline-primary border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
        </div>
        <div className={`absolute bg-white w-64 rounded-lg drop-shadow-sm ${filtered? ``: `hidden`}`}>
            {data.length > 0 ?data.map((row)=>(
            <div className='p-2 hover:bg-primary/70 hover:text-white rounded-lg cursor-pointer  transition-colors' onClick={()=>{setFilterName(row.value); setFiltered(false); onChange(row.value)}}>{row.value}</div>
            )): ''}
        </div>
        </div>
    )
}