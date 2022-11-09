import Link from "next/link";

export default function Sidebar({choose}: any) {
    return (
        <div className="w-80 bg-cyan-700 flex flex-col h-full pt-28">
            {choose == '1'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Мэргэжил</div></Link>: <Link href={"/manage"}><div className="p-2 pl-8 text-white">Мэргэжил</div></Link>}
            {choose == '2'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Багш</div></Link>:<Link href={"/manage/teacher"}><div className="p-2 pl-8 text-white">Багш</div></Link>}
            {choose == '3'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Сонсогч</div></Link>:<Link href={"/manage/student"}><div className="p-2 pl-8 text-white">Сонсогч</div></Link>}
            {choose == '4'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Анги</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Анги</div></Link>}
            {choose == '5'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Төлбөр</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Төлбөр</div></Link>}
            {choose == '6'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Дифлом</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Дифлом</div></Link>}
            {choose == '7'? <Link href={"#"}><div className="p-2 pl-8 bg-amber-200">Хичээл</div></Link>:<Link href={"#"}><div className="p-2 pl-8 text-white">Хичээл</div></Link>}
        </div>
    )
}