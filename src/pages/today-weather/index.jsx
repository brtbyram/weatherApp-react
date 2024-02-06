import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector} from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { convertTurkishToEnglish } from '../../helpers/convert-turkish-to-english'
// import { setLocation } from "../../features/location/locationSlice";
import moment from 'moment';
import { Icon } from '../../Icons';
import { Disclosure, Transition } from '@headlessui/react';
import { useMediaQuery } from 'react-responsive'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from 'clsx';

function TodayWeather() {
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })


    const day = moment().format('D')
    const month = moment().format('M')
    const year = moment().format('YYYY')

    const [astronomyData, setAstronomyData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    const location = useSelector(state => state.location.value)
    // const dispatch = useDispatch()

    console.log(location)

    const fetchData = async (location) => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${convertTurkishToEnglish(location)}&days=14&aqi=yes&alerts=yes`)
            setWeatherData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAstronomyData = async (lat, lon) => {
        try {
            const response = await axios.get(`https://moonphases.co.uk/service/getMoonDetails.php?day=${day}&month=${month}&year=${year}&lat=${lat}&lng=${lon}&len=1&tz=0`)
            setAstronomyData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     fetchData(location)
    //     dispatch(setLocation(""))
    // }

    useEffect(() => {
        fetchData(location)
    }, [location])


    const [lat, setLat] = useState("")
    const [lon, setLon] = useState("")

    useEffect(() => {
        if (weatherData) {
            setLat(weatherData.location.lat)
            setLon(weatherData.location.lon)
        }
        fetchAstronomyData(lat, lon)
    }, [weatherData])

    // const usEpaIndex = [
    //     {
    //         id: 1,
    //         label: 'Good'
    //     },
    //     {
    //         id: 2,
    //         label: 'Moderate'
    //     },
    //     {
    //         id: 3,
    //         label: 'Unhealthy for sensitive group'
    //     },
    //     {
    //         id: 4,
    //         label: 'Unhealthy'
    //     },
    //     {
    //         id: 5,
    //         label: 'Very Unhealthy'
    //     },
    //     {
    //         id: 6,
    //         label: 'Hazardous'
    //     },

    // ]

    const airQuality = () => {
        if (weatherData.current.air_quality['us-epa-index'] === 1) {
            return (
                <div className='flex flex-col items-center space-y-4 text-center'>
                    <div className='bg-green-600/70 p-4 h-64 w-64 flex items-center text-center justify-center text-white text-4xl font-semibold rounded-full'>Good</div>
                    <div className='text-center'>Air quality is considered satisfactory, and air pollution poses little or no risk.</div>
                </div>)
        } else if (weatherData.current.air_quality['us-epa-index'] === 2) {
            return (
                <div className='flex flex-col items-center space-y-4 text-center'>
                    <div className='bg-yellow-600 p-4 w-64 h-64 flex items-center text-center justify-center text-white text-4xl font-semibold rounded-full'>Moderate</div>
                    <div>Air quality is acceptable; however, for some pollutants, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.</div>
                </div>)
        } else if (weatherData.current.air_quality['us-epa-index'] === 3) {
            return (
                <div className='flex flex-col items-center space-y-4 text-center'>
                    <div className='bg-orange-600 p-4 w-64 h-64 flex items-center text-center justify-center text-white text-4xl font-semibold rounded-full'>Unhealthy for sensitive group</div>
                    <div>Members of sensitive groups may experience health effects. The general public is not likely to be affected.</div>
                </div>)
        } else if (weatherData.current.air_quality['us-epa-index'] === 4) {
            return (
                <div className='flex flex-col items-center space-y-4 text-center'>
                    <div className='bg-red-600 p-4 w-64 h-64 flex items-center text-center justify-center text-white text-4xl font-semibold rounded-full'>Unhealthy</div>
                    <div >Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.</div>
                </div>)
        } else if (weatherData.current.air_quality['us-epa-index'] === 5) {
            return (
                <div className='flex flex-col items-center space-y-4 text-center'>
                    <div className='bg-red-700 p-4 w-64 h-64 flex items-center text-center justify-center text-white text-4xl font-semibold rounded-full'>Very Unhealthy</div>
                    <div>Health alert: everyone may experience more serious health effects.</div>
                </div>)
        } else if (weatherData.current.air_quality['us-epa-index'] === 6) {
            return (
                <div className='flex flex-col items-center space-y-4 text-center'>
                    <div className='bg-red-900 p-4 w-64 h-64 flex items-center text-center justify-center text-white text-4xl font-semibold rounded-full'>Hazardous</div>
                    <div>Health warnings of emergency conditions. The entire population is more likely to be affected.</div>
                </div>)
        }
    }


    return (
        <main className='h-full'>
            {weatherData && (
                <div className='grid gap-y-5 '>
                    <div className='text-white py-10 min-w-full flex flex-col justify-between items-center bg-[url(https://media.istockphoto.com/id/825778252/tr/foto%C4%9Fraf/mavi-g%C3%B6ky%C3%BCz%C3%BC-ve-bulutlar-beyaz-arka-plan.jpg?s=612x612&w=0&k=20&c=Ej5iKzuVujUEbYZ_a8rM4koHLoAWeKGg_6EcuPGhd6E=)] bg-cover '>
                        {/* <div className=" h-min-h  text-black mb-10 flex items-center justify-center">
                            <form className="grid sm:grid-flow-col gap-2" onSubmit={handleSubmit}>
                                <input type="text" className="h-10 rounded px-3 bg-transparent/20 outline-none" value={location} name="location" placeholder="Search City" onChange={(e) => dispatch(setLocation(e.target.value))} />
                                <button type="submit" className="bg-[#112d4e]/80 text-white p-2 rounded-lg">Search</button>
                            </form>
                        </div> */}
                        <div className='flex'>
                            <img width={150} src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                            <h2 className='font-bold text-5xl'>{weatherData.current.temp_c}°C</h2>
                        </div>
                        <h2 className='text-2xl font-bold'>{weatherData.location.name}</h2>
                        <h2>{weatherData.current.condition.text}</h2>
                        <div className='flex flex-1 items-center space-x-2 mt-1'>
                            <div style={{ transform: `rotate(${weatherData.current.wind_degree + 90}deg)` }}>
                                <Icon name='arrow' size='24' />
                            </div>
                            <div>{weatherData.current.wind_dir}</div>
                            <div>{weatherData.current.wind_kph} km/h</div>
                        </div>
                        <div className=''>Last update: {moment(weatherData.current.last_updated).format('HH:MM')}</div>
                        <div className='container mx-auto'>
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={isMobile ? 3 : isTablet ? 6 : 12}
                                parallax={true}
                                initialSlide={moment().format('H') - 1}
                                className="rounded pt-14 pb-4 text-lg"
                            >
                                {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                                    <SwiperSlide key={index} className={clsx("rounded", {
                                        "bg-[#3F72AF]/40 mx-2 p-5": moment(hour.time).format('H') === moment().format('H'),
                                    })}>
                                        <div className='w-full flex flex-col items-center justify-center text-center'>
                                            <img width={60} height={60} src={hour.condition.icon} alt={hour.condition.text} />
                                            <h6>{hour.temp_c} °C</h6>
                                            <h6>{moment(hour.time).format('LT')}</h6>
                                            <div className='flex flex-col items-center space-y-1'>
                                                <div className='flex items-center space-x-2'>
                                                    <div style={{ transform: `rotate(${hour.wind_degree + 90}deg)` }}>
                                                        <Icon name='arrow' size='24' />
                                                    </div>
                                                    <div>{hour.wind_dir}</div>
                                                </div>
                                                <div>{hour.wind_kph} km/h</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                                }
                            </Swiper>
                        </div>
                    </div>

                    <div className='container mx-auto grid md:grid-cols-2 bg-white p-10 rounded-xl'>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="cloud" size="40" />
                            <h2>Cloudly: %{weatherData.current.cloud}</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="visibility" size="40" />
                            <h2>Visibility: {weatherData.current.vis_km}km</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="uv" size="40" />
                            <h2>UV: {weatherData.current.uv}</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="humidity" size="40" />
                            <h2>Humidity: %{weatherData.current.humidity}</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="maxTemp" size="40" />
                            <h2>Maximum Temperature: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="minTemp" size="40" />
                            <h2>Minimum Temperature: {weatherData.forecast.forecastday[0].day.mintemp_c}°C</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="sensedTemp" size="40" />
                            <h2>Sensed Temperature: {weatherData.current.feelslike_c}°C</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="autoTemp" size="40" />
                            <h2>Average Temperature: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="changeRain" size="40" />
                            <h2>Chance of rain: %{weatherData.forecast.forecastday[0].day.daily_chance_of_rain}</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="changeSnow" size="40" />
                            <h2>Chance of snow: %{weatherData.forecast.forecastday[0].day.daily_chance_of_snow}</h2>
                        </div>
                        <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                            <Icon name="totalSnow" size="40" />
                            <h2>Total snow: {weatherData.forecast.forecastday[0].day.totalsnow_cm}cm</h2>
                        </div>
                    </div>

                    {astronomyData && (
                        <div className='container py-10 mx-auto grid lg:grid-flow-col place-content-center place-items-center bg-white md:p-10 rounded-xl'>
                            <div className="flex flex-col items-center font-semibold text-xl">
                                <img style={{ transform: `rotate(${day.moonsign_deg}deg)` }} className={`drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-full px-2 w-96`} src={`/images/moon-phases/${astronomyData.days[0].phase_img}`} alt="" />
                                <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                    <Icon name="moonSet" size="40" />
                                    <h2>Moon Rise: {moment(astronomyData.days[0].moonrise).format('HH:mm')} PM</h2>
                                </div>
                                <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                    <Icon name="moonSet" size="40" />
                                    <h2>Moon Set: {moment(astronomyData.days[0].moonset).format('hh:mm')} AM</h2>
                                </div>
                            </div>
                            <div>
                                <p className='text-lg leading-8 p-10'>As we examine the information regarding the state of the Moon, it is quite intriguing. As of today,
                                    the Moon's celestial position is rather fascinating. The Moon will rise at {moment(astronomyData.days[0].moonset).format('hh:mm')} AM and set at {moment(astronomyData.days[0].moonrise).format('hh:mm')} PM.
                                    The Moon is identified to be in the {astronomyData.days[0].moonsign} zodiac sign, and its current phase is {astronomyData.days[0].phase_name} with an age of {astronomyData.days[0].age} days.
                                    The illumination of the Moon in the sky is {astronomyData.days[0].illumination} percent.
                                    The Moon is situated at a distance of {astronomyData.days[0].distance} kilometers from Earth with a diameter of {astronomyData.days[0].diameter} units.
                                    Its tilt is at {astronomyData.days[0].tilt} degrees. The next full moon is expected to occur on {moment(astronomyData.next_full).format('MMMM DD YYYY hh:mm')}  PM. In the coming days,
                                    the Moon's rise and set times will change; it will rise at {moment(astronomyData.next_moonrise).format('hh:mm')} PM tomorrow and set at {moment(astronomyData.next_moonset).format('hh:mm')} AM the next day.
                                    The Moon's next new phase will occur on {moment(astronomyData.next_new).format('MMMM DD YYYY hh:mm')} PM. Evaluating all these pieces of information,
                                    the Moon's movement in the sky and its changing phases provide an enchanting experience for observers.
                                    These details offer significant insights into the Moon's celestial position and phases,
                                    presenting an exciting opportunity for astronomy enthusiasts.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className='bg-white flex-col p-10 container mx-auto rounded-xl grid md:grid-cols-2'>
                        <div className='flex items-center text-lg justify-center max-md:py-10'>
                            <div>{airQuality(weatherData.current.air_quality['us-epa-index'])}</div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>Nitrogen dioxide NO2:</strong> <span>{weatherData.current.air_quality.no2}</span></h3>
                            </div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>gb-defra-index :</strong> {weatherData.current.air_quality['gb-defra-index']}</h3>
                            </div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>Carbon monoxide CO:</strong> {weatherData.current.air_quality.co}</h3>
                            </div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>pm10 :</strong> {weatherData.current.air_quality.pm10}</h3>
                            </div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>pm2_5 :</strong> {weatherData.current.air_quality.pm2_5}</h3>
                            </div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>Ozone O3:</strong> {weatherData.current.air_quality.o3}</h3>
                            </div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>Sulphur dioxide SO2:</strong> {weatherData.current.air_quality.so2}</h3>
                            </div>
                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg p-2">
                                <h3 className='flex w-full'><strong className='flex-1'>us-epa-index :</strong> {weatherData.current.air_quality['us-epa-index']}</h3>
                            </div>
                        </div>

                    </div>

                    <div className='bg-white container mx-auto p-10 rounded-xl'>
                        <h1 className='font-semibold text-2xl pb-3'>3-Day Forecast</h1>
                        {weatherData.forecast.forecastday.map((day, index) => (
                            <div key={index} className=''>
                                <Disclosure>
                                    {({ open }) => (
                                        <div className={`${open && 'bg-gray-400/30'} border md:px-3 my-2 rounded-xl`}>
                                            <Disclosure.Button className=" flex items-center w-full px-4 outline-none ">
                                                <div className={`py-2 flex flex-1 items-center md:space-x-5 ${open && 'border-b border-gray-400/30'}`}>
                                                    <h2>{day.date}</h2>
                                                    <img src={day.day.condition.icon} />
                                                    <h2>{day.day.maxtemp_c} / {day.day.mintemp_c}°C</h2>
                                                    {!isMobile && <h2>{day.day.condition.text}</h2>}
                                                </div>
                                                <div className={open ? 'rotate-180 transform transition-all duration-300' : 'transition-all duration-300'}>
                                                    <Icon name="arrowButton" size="32" />
                                                </div>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-500 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-300 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel className={`text-black duration-700 transition-all`}>
                                                    <div className="grid md:grid-cols-2 gap-2 my-6 text-lg">
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="uv" size="50" />
                                                            <h2 className="">UV: {day.day.uv}</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="windy" size="50" />
                                                            <h2 className="">Max Wind: {day.day.maxwind_kph} km/h</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="autoTemp" size="50" />
                                                            <h2 className="">Avg Temp: {day.day.avgtemp_c}°C</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <span className="material-symbols-outlined">compress</span>
                                                            <h2 className="">Average Pressure: {day.day.avgtemp_c} mb</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="changeRain" size="50" />
                                                            <h2 className="">Chance of Rain: %{day.day.daily_chance_of_rain}</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="moonSet" size="50" />
                                                            <h2 className="">Moonset: {day.astro.moonset}</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="moonSet" size="50" />
                                                            <h2 className="">Moon Phase: {day.astro.moon_phase}</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="moonSet" size="50" />
                                                            <h2 className="">Condition: {day.day.condition.text}</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="moonSet" size="50" />
                                                            <h2 className="">Moon Illumination: {day.astro.moon_illumination}</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 border-b border-gray-400/30 md:mx-4 drop-shadow-lg">
                                                            <Icon name="moonSet" size="50" />
                                                            <h2 className="">Moonrise: {day.astro.moonrise}</h2>
                                                        </div>
                                                        <div className="flex items-center space-x-2 md:mx-4 drop-shadow-lg">
                                                            <Icon name="moonSet" size="50" />
                                                            <h2>Visibility: {day.day.avgvis_km}km</h2>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </div>
                                    )}
                                </Disclosure>
                            </div>
                        ))}
                    </div>

                    {weatherData.alerts.alert.length > 0 && (
                        <div className='bg-white container mx-auto rounded-t-xl p-10'>
                            <h2 className='font-semibold text-2xl'>Alerts</h2>
                            {weatherData.alerts.alert.map((alert, index) => (
                                <div key={index} className='border md:px-3 my-2 rounded-xl'>
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className=" flex items-center w-full px-4 outline-none ">
                                                    <div className='flex flex-1 py-4'>
                                                        <h3 className='font-semibold text-lg'>{alert.headline}</h3>
                                                    </div>
                                                    <div className={open ? 'rotate-180 transform transition-all duration-300' : 'transition-all duration-300'}>
                                                        <Icon name="arrowButton" size="32" />
                                                    </div>
                                                </Disclosure.Button>
                                                <Transition
                                                    enter="transition duration-500 ease-out"
                                                    enterFrom="transform scale-95 opacity-0"
                                                    enterTo="transform scale-100 opacity-100"
                                                    leave="transition duration-300 ease-out"
                                                    leaveFrom="transform scale-100 opacity-100"
                                                    leaveTo="transform scale-95 opacity-0"
                                                >
                                                    <Disclosure.Panel className="text-black duration-700 transition-all">
                                                        <div className='grid gap-y-4'>
                                                            <p>{alert.desc}</p>
                                                            <p>{alert.note}</p>
                                                            <p><strong>instruction:</strong> {alert.instruction}</p>
                                                            <div><strong>Duration of effect:</strong> {alert.effective}</div>
                                                            <div><strong>Estimated completion time:</strong> {alert.expires}</div>
                                                            <p><strong>severity:</strong> {alert.severity}</p>
                                                            <p><strong>category:</strong> {alert.category}</p>
                                                            <p><strong>certainty:</strong> {alert.certainty}</p>
                                                            <p><strong>urgency:</strong> {alert.urgency}</p>
                                                            <p><strong>Areas:</strong> {alert.areas}</p>
                                                            <p><strong>Event:</strong> {alert.event}</p>
                                                        </div>
                                                    </Disclosure.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>

                            ))}
                        </div>
                    )}


                </div>
            )}
        </main>
    )
}

export default TodayWeather