import Sidebar from "../Sidebar"
import Profilebar from "../Profilebar";
import { useEffect } from "react";

export default function MainLayout({children, index}: any) {
    return(
      
        <div className="flex w-screen h-screen bg-backgray font-body">
            <Sidebar index={index}/>
            <div className="p-4 w-4/6 overflow-y-auto">
                <div >
                    {children}
                </div>
            </div>
            
            <Profilebar/>
        </div>
    );
}