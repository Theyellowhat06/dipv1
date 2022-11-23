import Link from "next/link";
import SideItem from "./SideItem";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function Profilebar({choose}: any) {
    return (
        <div className="w-1/6 p-8 bg-white flex flex-col space-y-4">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-3/5">
                    <img src="https://cdn-icons-png.flaticon.com/512/194/194938.png"></img>
                </div>
                <div>БАТЭРДЭНЭ ХУЛАН</div>
            </div>
            
            <SideItem active={false} href={'/'} text={'Гарах'} icon={<LogoutRoundedIcon/>}/>
        </div>
    )
}