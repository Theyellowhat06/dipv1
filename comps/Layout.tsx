import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

export default function Layout({children}: any) {
    return(
        <div>
            <Navbar/>
            <div className="flex flex-row h-screen w-screen pt-12">
                {children}
            </div>
        </div>
    );
}