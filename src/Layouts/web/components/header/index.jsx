import Logo from "./Logo"
import Navbar from "./Navbar"
import Search from "./Search"
import { useMediaQuery } from 'react-responsive'

function Header() {

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

    return (
        <header className="bg-[#112D4E] text-white min-h-24 flex items-center justify-around">
            <Logo/>
            {!isMobile && <Search/>}
            <Navbar/>
        </header>
    )
}

export default Header