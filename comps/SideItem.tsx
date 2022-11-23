import Link from "next/link";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AbcIcon from '@mui/icons-material/Abc';
import Head from 'next/head'
export default function SideItem({icon, text, href, active}: any){
    return (
        <Link href={href}>
            <div
                className={`p-4 flex items-center rounded-l-full transition-colors 
                ${
                active ? "bg-primary text-white" : "hover:bg-primary hover:bg-opacity-50 hover:text-white text-slate-400"
                }`}
                >
                    {/* "bg-primary text-white" */}
                    <div className="px-4">
                        {icon}
                    </div>
                    {text}
            </div>
        </Link>
      );
};