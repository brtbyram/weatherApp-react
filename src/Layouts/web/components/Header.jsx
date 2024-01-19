import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="bg-[#194569] text-white h-32 flex items-center justify-around">
            <div>WeatherHub</div>
            <h1 className="text-center  font-extrabold text-3xl">Günlük Hava Durumu</h1>
            <nav className="grid grid-flow-col gap-5">
                
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    )
}

export default Header