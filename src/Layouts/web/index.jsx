import { Outlet } from "react-router-dom"
import Footer from "./components/footer"
import Header from "./components/header"


function WebLayout() {
    return (
        <div className="flex flex-col justify-between bg-[#F9F7F7]">
            <Header />
            <main className="bg-[#DBE2EF] container mx-auto flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default WebLayout