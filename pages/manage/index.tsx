import Link from "next/link";
import Layout from "../../comps/Layout";
import Sidebar from "../../comps/Sidebar";

const test = () => {
    return (
        <Layout>
            <Sidebar choose='1'/>
            <div className="w-full flex flex-col items-center justify-center">
                    Hello
                </div>
        </Layout>
        
    )
}
export default test;