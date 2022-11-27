import Link from "next/link";
import SideItem from "./SideItem";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Button from './Button'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';


export default function Profilebar() {
    const [user, setUser] = useState({fname: '...', lname: '...'})
    useEffect(()=>{
        const str = localStorage.getItem('user')
        if(str != null){
            setUser(JSON.parse(str))
        }
    },[])
    const logout = () => {
        localStorage.removeItem('token')
    }
    return (
        <div className="w-1/6 bg-white flex flex-col space-y-4">
            <div className="px-8 pt-8">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-3/5">
                    <img src="https://cdn-icons-png.flaticon.com/512/194/194938.png"></img>
                </div>
                <div>{`${user.lname} ${user.fname}`}</div>
            </div>
            <div className='p-4 flex items-center rounded-full transition-colors hover:bg-primary hover:bg-opacity-50 active:bg-primary/80 hover:text-white text-slate-400 cursor-pointer'>
                <div className="px-4">
                    <PersonRoundedIcon/>
                </div>
                Хувийн мэдээлэл
            </div>
            <div onClick={logout} className='p-4 flex items-center rounded-full transition-colors hover:bg-primary hover:bg-opacity-50 active:bg-primary/80 hover:text-white text-slate-400 cursor-pointer'>
                <div className="px-4">
                    <LogoutRoundedIcon/>
                </div>
                Гарах
            </div>
            <div className="pt-2 flex items-center">
                <div className="pr-2 font-bold text-lg text-primary">Мэдээлэл</div>
                <div className="bg-primary h-[2px] w-full"></div>
            </div>
            </div>
            <div className="max-h-[calc(100vh-330px)] overflow-y-scroll space-y-2 px-8 pb-8">
                <div className="rounded-lg bg-white p-4 shadow-lg shadow-primary/50">
                    <div className="font-semibold">Сургалтад гарсан өөрчилөлт</div>
                    <div className="pb-2 text-sm text-slate-500">11/10/2022 18:13</div>
                    <div>2022/23А улиралд E, U шалгалт өгөх оюутны захиалгыг бүрэлдэхүүн сургуулийн сургалтын алба 11 дүгээр сарын 1-нээс 12 дугаар сарын 02-ны өдрүүдэд авна.</div>
                    <div className="flex justify-end"><Button text="Дэлэгрэнгүй" extra="p-2 rounded-md"/></div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-lg shadow-primary/50">
                    <div className="font-semibold">Сургалтад гарсан өөрчилөлт</div>
                    <div className="pb-2 text-sm text-slate-500">11/10/2022 18:13</div>
                    <div>2022/23А улиралд E, U шалгалт өгөх оюутны захиалгыг бүрэлдэхүүн сургуулийн сургалтын алба 11 дүгээр сарын 1-нээс 12 дугаар сарын 02-ны өдрүүдэд авна.</div>
                    <div className="flex justify-end"><Button text="Дэлэгрэнгүй" extra="p-2 rounded-md"/></div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-lg shadow-primary/50">
                    <div className="font-semibold">Сургалтад гарсан өөрчилөлт</div>
                    <div className="pb-2 text-sm text-slate-500">11/10/2022 18:13</div>
                    <div>2022/23А улиралд E, U шалгалт өгөх оюутны захиалгыг бүрэлдэхүүн сургуулийн сургалтын алба 11 дүгээр сарын 1-нээс 12 дугаар сарын 02-ны өдрүүдэд авна.</div>
                    <div className="flex justify-end"><Button text="Дэлэгрэнгүй" extra="p-2 rounded-md"/></div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-lg shadow-primary/50">
                    <div className="font-semibold">Сургалтад гарсан өөрчилөлт</div>
                    <div className="pb-2 text-sm text-slate-500">11/10/2022 18:13</div>
                    <div>2022/23А улиралд E, U шалгалт өгөх оюутны захиалгыг бүрэлдэхүүн сургуулийн сургалтын алба 11 дүгээр сарын 1-нээс 12 дугаар сарын 02-ны өдрүүдэд авна.</div>
                    <div className="flex justify-end"><Button text="Дэлэгрэнгүй" extra="p-2 rounded-md"/></div>
                </div>
            </div>
        </div>
    )
}