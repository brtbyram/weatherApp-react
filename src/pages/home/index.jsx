import axios from "axios"
import { useEffect, useState } from "react"
import { convertTurkishToEnglish } from "../../helpers/convert-turkish-to-english";
import moment from "moment";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Disclosure, Transition } from '@headlessui/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from "clsx";
import { Icon } from "../../Icons";
import { useMediaQuery } from 'react-responsive'
import { useSelector, useDispatch } from 'react-redux'
import { setLocation } from "../../features/location/locationSlice";


export default function Home() {

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    // const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    //const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })

    const location = useSelector(state => state.location.value)
    const dispatch = useDispatch()

    const [weatherData, setWeatherData] = useState(null)


    useEffect(() => {
        // Kullanıcının konumunu al
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=tr`);
                        dispatch(setLocation(data.city))
                        console.log(location)
                    } catch (error) {
                        console.log("Adres bilgisi alınamadı.");
                    }
                }
            );
        }
    }, []);


    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${convertTurkishToEnglish(location)}&days=3&aqi=no&alerts=yes`)
                setWeatherData(response.data)
                console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }  
        }
        fetchWeatherData()
    }, [location])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(location)
    }   

    return (

        <main className="flex flex-col container bg-white mx-auto">
            <div className=" h-min-h py-5 flex items-center justify-center">
                <form className="grid sm:grid-flow-col gap-2 max-md:w-[95%]" onSubmit={handleSubmit}>
                    <input type="text" className="h-10 rounded px-3 bg-[#DBE2EF] outline-none placeholder:text-white" value={location} name="location" placeholder="Search City" onChange={(e) => dispatch(setLocation(e.target.value))} />
                    <button type="submit" className="bg-[#112d4e] text-white p-2 rounded-lg">Search</button>
                </form>
            </div>
            {weatherData && (
                <div className="w-full md:w-[80%] mx-auto">

                    <div className="bg-[#F9F7F7] rounded-lg text-lg transition-all duration-700 delay-300">
                        <div className={clsx(" rounded-lg p-10 w-full h-full bg-cover shadow-2xl", {
                            "bg-[url(https://p4.wallpaperbetter.com/wallpaper/505/189/268/clear-sky-sky-blue-stars-4k-wallpaper-preview.jpg)]": weatherData.current.is_day === 1,
                            "bg-[url(https://p4.wallpaperbetter.com/wallpaper/777/422/528/night-sky-wallpaper-preview.jpg)]": weatherData.current.is_day === 0

                        })}>
                            <div className="grid md:grid-cols-2 place-content-center place-items-center">
                                <div className="flex justify-center items-center drop-shadow-2xl">
                                    {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                                        <div key={index}>
                                            {moment(hour.time).format('H') === moment().format('H') && (
                                                <div className="">
                                                    <img width={200} className="z-10" src={hour.condition.icon} alt="" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="font-extrabold text-3xl text-zinc-100 z-10">
                                        <h2 className="">{weatherData.current.temp_c} °C</h2>
                                        <h2>{weatherData.location.name}</h2>
                                    </div>
                                </div>
                                <div className="text-zinc-100 text-xl py-10 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Icon name="maxTemp" size="50" />
                                        <div className="">Max Temp: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Icon name="minTemp" size="50" />
                                        <h2 className="">Min Temp: {weatherData.forecast.forecastday[0].day.mintemp_c}°C</h2>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Icon name="humidity" size="50" />
                                        <h2>Average Humidity: %{weatherData.forecast.forecastday[0].day.avghumidity}</h2>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Icon name="sunRise" size="50" />
                                        <h2 className="">Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</h2>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Icon name="sunSet" size="50" />
                                        <h2 className="">Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</h2>
                                    </div>
                                </div>
                            </div>
                            <Disclosure>
                                <Disclosure.Button className="py-2 text-white duration-700 transition-all font-semibold">
                                    More Details
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-500 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-300 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="text-white duration-700 transition-all">
                                        <div className="grid md:grid-cols-2 gap-2 mt-8  text-lg">
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="uv" size="50" />
                                                <h2 className="">UV: {weatherData.forecast.forecastday[0].day.uv}</h2>
                                            </div>


                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="windy" size="50" />
                                                <h2 className="">Max Wind: {weatherData.forecast.forecastday[0].day.maxwind_kph} km/h</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="autoTemp" size="50" />
                                                <h2 className="">Avg Temp: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <span className="material-symbols-outlined">compress</span>
                                                <h2 className="">Average Pressure: {weatherData.forecast.forecastday[0].day.avgtemp_c} mb</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <span className="material-symbols-outlined">rainy</span>
                                                <h2 className="">Chance of Rain: %{weatherData.forecast.forecastday[0].day.daily_chance_of_rain}</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="moonSet" size="50" />
                                                <h2 className="">Moonset: {weatherData.forecast.forecastday[0].astro.moonset}</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="moonSet" size="50" />
                                                <h2 className="">Moon Phase: {weatherData.forecast.forecastday[0].astro.moon_phase}</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="moonSet" size="50" />
                                                <h2 className="">Condition: {weatherData.forecast.forecastday[0].day.condition.text}</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="moonSet" size="50" />
                                                <h2 className="">Moon Illumination: {weatherData.forecast.forecastday[0].astro.moon_illumination}</h2>
                                            </div>
                                            <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                <Icon name="moonSet" size="50" />
                                                <h2 className="">Moonrise: {weatherData.forecast.forecastday[0].astro.moonrise}</h2>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </Disclosure>
                        </div>


                    </div>

                    <div className="bg-[#F9F7F7] rounded-lg mt-10 text-lg flex flex-col items-center relative mb-10">
                        <h1 className="flex justify-center font-extrabold text-3xl text-[#F9F7F7] mb-5 pt-10 z-10">3 Day Forecast</h1>
                        <Swiper
                            spaceBetween={-20}
                            slidesPerView={isMobile ? 2 : 3 }
                            parallax={true}

                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className="w-full pb-10"
                        >
                            {weatherData.forecast.forecastday.map((day) => (
                                <SwiperSlide key={day.date} className="flex justify-center border-black items-center text-center px-1">
                                    <div className={clsx("flex flex-col border items-center font-medium px-4 pb-5 text-md justify-start w-60 h-80 bg-[#F9F7F7] opacity-85", {
                                        "!bg-[#112D4e] text-white": moment(day.date).format('DD') === moment().format('DD')
                                    })}>
                                        <h6 className="pt-4 text-2xl font-bold w-full mx-auto">{moment(day.date).format("ddd").toUpperCase()}</h6>
                                        <img className="w-32" src={day.day.condition.icon} alt={day.day.condition.text} />
                                        <h6>{day.day.avgtemp_c} °C - {day.day.mintemp_c} °C</h6>
                                        <h6 className="flex-1">{day.day.condition.text}</h6>
                                        <h6>{day.day.daily_chance_of_rain} %</h6>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <img className="w-full h-full absolute opacity-50 rounded-lg" src="https://t4.ftcdn.net/jpg/02/66/38/15/360_F_266381525_alVrbw15u5EjhIpoqqa1eI5ghSf7hpz7.jpg" alt="" />
                    </div>

                    <div className="bg-[#F9F7F7] rounded-lg mt-10 text-lg p-10">
                        <h1 className="flex item-start font-semibold text-xl p-10">Saatlik Tahmin</h1>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={isMobile ? 4 : 6 }
                            parallax={true}
                            initialSlide={moment().format('H') - 1}
                            loop={true}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className=" rounded p-10 text-lg"
                        >
                            {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                                <SwiperSlide key={index} className="flex  flex-col items-center justify-center mx-auto w-24">
                                    <div className={clsx("rounded", {
                                        "bg-[#3F72AF] text-white p-5": moment(hour.time).format('H') === moment().format('H'),
                                    })}>
                                        <img width={60} height={60} src={hour.condition.icon} alt={hour.condition.text} />
                                        <h6>{hour.temp_c} °C</h6>
                                        <h6>{moment(hour.time).format('LT')}</h6>
                                    </div>
                                </SwiperSlide>
                            ))
                            }
                        </Swiper>
                    </div>

                    <div>
                        {weatherData.alerts && (
                            weatherData.alerts.alert.map((alert, index) => (
                                <div key={index} className="bg-[#F9F7F7] rounded-lg mt-10 text-lg p-10">
                                    <h1 className="font-semibold">{alert.headline}</h1>
                                    <h2>Areas: {alert.areas}</h2>
                                    <h2>Description: {alert.desc}</h2>
                                    <h2>Category: {alert.category}</h2>
                                    <h2>Severity: {alert.severity}</h2>
                                    <h2>Note: {alert.note}</h2>
                                    <h2>Effective: {moment(alert.effective).format("YYYY-MM-GG HH:MM")}</h2>
                                    <h2>Expires: {moment(alert.expires).format("YYYY-MM-GG HH:MM")}</h2>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            )}

        </main>
    )
}
