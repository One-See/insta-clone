import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";
import Timeline from "../components/timeline";


export default function Dashboard() {
    return (
        <div>
            <Header />
            <div className="grid grid-cols-3 gap-4 mx-auto max-w-screen-lg justify-between">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}