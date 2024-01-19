import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"


function WebLayout() {
    return (
        <div className="flex flex-col justify-between h-dvh">
            <Header />
            <main className="flex flex-col shrink h-full bg-[#5F84A2]">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default WebLayout