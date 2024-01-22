import { Link } from "react-router-dom"

function Logo() {
  return (
    <div>
        <h1 className="text-3xl font-bold">
            <Link to="/">WeatherHub</Link>
        </h1>
    </div>
  )
}

export default Logo