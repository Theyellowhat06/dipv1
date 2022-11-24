import Link from "next/link";
import { useState } from "react";
import SideItem from "./SideItem";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WindowRoundedIcon from '@mui/icons-material/WindowRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const MENU_LIST = [
    { icon: <WindowRoundedIcon/>, text: "Хяналтын самбар", href: "/manage" },
    { icon: <BusinessCenterIcon/>, text: "Мэргэжил", href: "/manage" },
    { icon: <PersonRoundedIcon/>, text: "Багш", href: "/manage/teacher" },
    { icon: <SchoolIcon/>, text: "Сонсогч", href: "/manage/student" },
    { icon: <Groups2RoundedIcon/>, text: "Анги", href: "#" },
    { icon: <AccountBalanceIcon/>, text: "Төлбөр", href: "#" },
    { icon: <InsertDriveFileRoundedIcon/>, text: "Дифлом", href: "#" },
    { icon: <AutoStoriesIcon/>, text: "Хичээл", href: "#" },
  ];



export default function Sidebar({index}: any) {
    const [navActive, setNavActive] = useState(false);
    const [activeIdx, setActiveIdx] = useState(index);
    console.log(index);
    return (
        //<div className="w-1/6 p-8 h-screen bg-white flex flex-col justify-between">
        <div className="w-1/6 py-8 border-primary h-screen bg-white flex flex-col justify-between">
            <div className="mr-16 rounded-r-full p-4 pl-12 flex row items-center text-4xl text-white bg-primary">
                <img className='h-14' src="/img/icons/graduate.png"></img>
                <div className="pl-2 font-bold">ССА</div>
            </div>
            <div className="ml-8">
                <div className="text-2xl px-8 py-4 font-semibold text-primary">
                    Цэс
                </div>
                {MENU_LIST.map((menu, i) => (
                    <div onClick={()=>{
                        setActiveIdx(i);
                        setNavActive(false);
                    }} key={menu.text}>
                        <SideItem active={activeIdx === i} {...menu} />
                    </div>
                ))}
            </div>
            <div>
                
            </div>
            {/* {choose == '1'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Мэргэжил</div></Link>: <Link href={"/manage"}><div className="p-2 pl-8 text-white">Мэргэжил</div></Link>}
            {choose == '2'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Багш</div></Link>:<Link href={"/manage/teacher"}><div className="p-2 pl-8 text-white">Багш</div></Link>}
            {choose == '3'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Сонсогч</div></Link>:<Link href={"/manage/student"}><div className="p-2 pl-8 text-white">Сонсогч</div></Link>}
            {choose == '4'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Анги</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Анги</div></Link>}
            {choose == '5'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Төлбөр</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Төлбөр</div></Link>}
            {choose == '6'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Дифлом</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Дифлом</div></Link>}
            {choose == '7'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Хичээл</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Хичээл</div></Link>} */}
        </div>
    )
}