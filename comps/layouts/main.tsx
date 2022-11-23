import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import Profilebar from "../Profilebar";

export default function MainLayout({children, index}: any) {
    return(
      
        <div className="flex w-screen h-screen bg-backgray font-body">
            <Sidebar index={index}/>
      <div className="p-8 w-4/6">
          {children}
      </div>
      <Profilebar/>
        </div>
    );
}