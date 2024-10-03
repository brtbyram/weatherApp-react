import { Outlet } from "react-router-dom"
import Footer from "./components/footer"
import Header from "./components/header"


function WebLayout() {
    return (
        <div className="flex flex-col justify-between bg-[#F9F7F7] min-h-screen">
            <Header />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default WebLayout