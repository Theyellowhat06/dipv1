import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

export default function DefaultLayout({children}: any) {
    console.log(children);
    return(
        <div className="flex w-screen h-screen font-body">
            {children}
        </div>
    );
}