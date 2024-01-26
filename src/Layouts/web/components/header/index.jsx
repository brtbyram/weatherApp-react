import Logo from "./Logo"
import Navbar from "./Navbar"

function Header() {
    return (
        <header className="bg-[#112D4E] text-white min-h-24 flex items-center justify-around">
            <Logo/>
            <Navbar/>
        </header>
    )
}

export default Header