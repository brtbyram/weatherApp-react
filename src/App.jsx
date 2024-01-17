


import axios from "axios"
import { useEffect, useState } from "react"

function App() {

  const [location, setLocation] = useState()
  const [dayNumbers, setDayNumbers] = useState()

  const [weatherData, setWeatherData] = useState(null)
  const [formData, setFormData] = useState({
    location: "trabzon",
    dayNumbers: 7
  })

  const fetchData = async (location, dayNumbers) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=${dayNumbers}&aqi=yes&alerts=yes`)
      setWeatherData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({
      location,
      dayNumbers
    })
  }


  useEffect(() => {
    if (formData.location && formData.dayNumbers) {
      fetchData(formData.location, formData.dayNumbers)
    }
  }, [formData])

  return (
    <div className="flex flex-col">
      <header className="bg-gray-300 h-32 flex items-center justify-center">
        <h1 className="text-center font-extrabold text-3xl">Günlük Hava Durumu</h1>
      </header>
      <div className="bg-gray-400 h-20 flex items-center justify-center">
        <form className="grid grid-flow-col gap-2" onSubmit={handleSubmit}>
          <input type="text" className="h-10" value={location} name="location" placeholder="Şehir giriniz" onChange={(e) => setLocation(e.target.value)} />
          <input type="number" className="h-10" value={dayNumbers} name="dayNumbers" placeholder="Gün sayısı giriniz" onChange={(e) => setDayNumbers(e.target.value)} />
          <button type="submit" className="bg-blue-700 text-white p-2 rounded-lg ">Gönder</button>
        </form>
      </div>
      {weatherData && (
        <div className="bg-blue-700 text-white">
          <div className="flex items-center justify-center">
            <h2>{weatherData.location.name}</h2>
            <h3>{weatherData.current.temp_c} °C</h3>
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            <h4>{weatherData.current.condition.text}</h4>
          </div>
          <div className="flex flex-col justify-center items-center bg-blue-900">
            <h5>7 Günlük Hava Durumu</h5>
            <div className="flex items-center justify-center">{weatherData.forecast.forecastday.map((day) => (
              <div key={day.date} className="border flex flex-col items-center justify-center text-center w-60 h-60 bg-blue-900">
                <h6>{day.date}</h6>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <h6>{day.day.avgtemp_c} °C</h6>
                <h6>{day.day.condition.text}</h6>
              </div>
            ))}</div>
          </div>
        </div>
      )
      }
      <footer className="bg-black/90 text-white/70 h-96 flex-shrink">
        <p>Created by <a href="brtbyram">Berat Murathan Bayram</a></p>
      </footer>
    </div >
  )
}

export default App