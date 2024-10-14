import { useEffect } from "react"
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
import StarsCanvas from "../../components/Stars";
import { fetchWeatherData } from "../../redux/reducers/dataSlice";
import { getUserLocation } from "../../helpers/getUserLocation";
import { setLocation } from "../../redux/reducers/locationSlice";
import HourlyChart from "../../components/charts/HourlyChart";



export default function Home() {

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    // const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    //const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })

    const location = useSelector(state => state.location.location)
    const { loading, weatherData } = useSelector(state => state.data)
    const dispatch = useDispatch()



    useEffect(() => {
        // Local storage'dan konumu al
        const storedLocation = localStorage.getItem("location");
        if (storedLocation) {
            // Redux state'e kaydet
            dispatch(setLocation(storedLocation));
            console.log("storedLocation:", storedLocation)
        } else {
            // Eğer local storage'da yoksa, kullanıcıdan al
            getUserLocation(dispatch);
        }
    }, [dispatch]);


    useEffect(() => {
        if (location) {
            dispatch(fetchWeatherData(location))
        } else {
            console.log("Location not found")
        }
    }, [location])


    console.log("loading:", loading)
    console.log("veri:", weatherData?.forecast?.forecastday)  // Hata veriyor çünkü veri yüklenene kadar boş bir array oluyor. Bu yüzden veri yüklendikten sonra kontrol etmek gerekiyor. bunun için weatherData?.forecast?.forecastday şeklinde kontrol yapılabilir. veya weatherData && weatherData.forecast?.forecastday şeklinde kontrol yapılabilir.)



    return (

        <main className="flex flex-col bg-gray-100 max-w-screen">
            {/* <div className=" h-min-h py-5 flex items-center justify-center">
                <form className="grid sm:grid-flow-col gap-2 max-md:w-[95%]" onSubmit={handleSubmit}>
                    <input type="text" className="h-10 rounded px-3 bg-[#DBE2EF] outline-none placeholder:text-white" value={location} name="location" placeholder="Search City" onChange={(e) => dispatch(setLocation(e.target.value))} />
                    <button type="submit" className="bg-[#112d4e] text-white p-2 rounded-lg">Search</button>
                </form>
            </div> */}
            {weatherData && (
                <div className="w-full">

                    <div className="bg-[#F9F7F7] text-lg transition-all duration-700 delay-300">
                        <div className="flex flex-col justify-center rounded-xl bg-[#173a63]" >
                            <div className="relative">
                                <StarsCanvas />
                                <div className="p-10 relative grid max-md:grid-cols-1 grid-cols-2 place-content-center place-items-center">
                                    <div className="flex flex-col w-full h-full max-sm:p-16 justify-center items-center drop-shadow-2xl">
                                        {weatherData.forecast?.forecastday[0].hour.map((hour, index) => (
                                            <div key={index}>
                                                {moment(hour.time).format('H') === moment().format('H') && (
                                                    <div>
                                                        <img
                                                            width={!isMobile ? 300 : 400}
                                                            className="relative contrast-125 hover:contrast-150"
                                                            src={hour.condition.icon}
                                                            alt={hour.condition.text}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div className="font-extrabold max-sm:text-2xl text-3xl text-zinc-100 z-10">
                                            <h2>{weatherData.current?.temp_c} °C</h2>
                                            <h2>{weatherData.location?.name}</h2>
                                        </div>
                                    </div>
                                    <div className="text-zinc-100 opacity-80 text-xl py-10 space-y-2 max-md:hidden z-10">
                                        <div className="flex items-center space-x-2">
                                            <Icon name="maxTemp" size="50" />
                                            <div className="">Max Temp: {weatherData.forecast?.forecastday[0].day?.maxtemp_c}°C</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Icon name="minTemp" size="50" />
                                            <h2 className="">Min Temp: {weatherData.forecast?.forecastday[0].day?.mintemp_c}°C</h2>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Icon name="humidity" size="50" />
                                            <h2>Average Humidity: %{weatherData.forecast?.forecastday[0].day?.avghumidity}</h2>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Icon name="sunRise" size="50" />
                                            <h2 className="">Sunrise: {weatherData.forecast?.forecastday[0].astro?.sunrise}</h2>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Icon name="sunSet" size="50" />
                                            <h2 className="">Sunset: {weatherData.forecast?.forecastday[0].astro?.sunset}</h2>
                                        </div>
                                    </div>
                                </div>
                                <HourlyChart />
                            </div>
                            <Disclosure>
                                {({ open }) => (
                                    <div className={`flex flex-col mx-auto opacity-80 py-8 rounded-md md:py-5 ${open && "bg-gray-800/80 shadow-2xl drop-shadow-2xl duration-300 transition-colors"}`}>
                                        <Disclosure.Button className="px-16 mx-auto md:m-5  bg-[#112d4e] bg-opacity-85 border rounded-md py-7 text-white duration-1000 outline-none transition-all delay-1000 font-semibold relative">
                                            {open ? 'Hide Details' : 'Show Details'}
                                        </Disclosure.Button>
                                        <Transition
                                            enter="transition duration-500 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-300 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                        >
                                            <Disclosure.Panel className="text-white duration-700 transition-all p-10 pt-4">
                                                <div className="grid md:grid-cols-2 gap-2 text-lg">
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="uv" size="50" />
                                                        <h2 className="">UV: {weatherData.forecast?.forecastday[0].day?.uv}</h2>
                                                    </div>


                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="windy" size="50" />
                                                        <h2 className="">Max Wind: {weatherData.forecast?.forecastday[0].day?.maxwind_kph} km/h</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="autoTemp" size="50" />
                                                        <h2 className="">Avg Temp: {weatherData.forecast?.forecastday[0].day?.avgtemp_c}°C</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <span className="material-symbols-outlined">compress</span>
                                                        <h2 className="">Average Pressure: {weatherData.forecast?.forecastday[0].day?.avgtemp_c} mb</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <span className="material-symbols-outlined">rainy</span>
                                                        <h2 className="">Chance of Rain: %{weatherData.forecast?.forecastday[0].day?.daily_chance_of_rain}</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="moonSet" size="50" />
                                                        <h2 className="">Moonset: {weatherData.forecast?.forecastday[0].astro?.moonset}</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="moonSet" size="50" />
                                                        <h2 className="">Moon Phase: {weatherData.forecast?.forecastday[0].astro?.moon_phase}</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="moonSet" size="50" />
                                                        <h2 className="">Condition: {weatherData.forecast?.forecastday[0].day.condition?.text}</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="moonSet" size="50" />
                                                        <h2 className="">Moon Illumination: {weatherData.forecast?.forecastday[0].astro?.moon_illumination}</h2>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border-b md:mx-4 drop-shadow-lg">
                                                        <Icon name="moonSet" size="50" />
                                                        <h2 className="">Moonrise: {weatherData.forecast?.forecastday[0].astro?.moonrise}</h2>
                                                    </div>
                                                </div>
                                            </Disclosure.Panel>
                                        </Transition>
                                    </div>
                                )}
                            </Disclosure>
                        </div>
                    </div>

                    <div className="bg-[#F9F7F7] drop-shadow-2xl container mx-auto rounded-lg mt-10 text-lg flex flex-col items-center relative mb-10">
                        <h1 className="flex justify-center font-extrabold text-3xl text-[#F9F7F7] mb-5 pt-10 z-10">3 Day Forecast</h1>
                        <Swiper
                            spaceBetween={-20}
                            slidesPerView={isMobile ? 2 : 3}
                            parallax={true}

                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className="w-full pb-10"
                        >
                            {weatherData.forecast?.forecastday.map((day) => (
                                <SwiperSlide key={day.date} className="flex justify-center overflow-hidden
                                 border-black items-center text-center px-1">
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
                    <div>
                        {weatherData.alerts && (
                            weatherData.alerts.alert.map((alert, index) => (
                                <div key={index} className="bg-[#F9F7F7] rounded-lg mt-10 text-lg p-10">
                                    <h1 className="font-semibold">{alert?.headline}</h1>
                                    <h2>Areas: {alert?.areas}</h2>
                                    <h2>Description: {alert?.desc}</h2>
                                    <h2>Category: {alert?.category}</h2>
                                    <h2>Severity: {alert?.severity}</h2>
                                    <h2>Note: {alert?.note}</h2>
                                    <h2>Effective: {moment(alert?.effective).format("YYYY-MM-GG HH:MM")}</h2>
                                    <h2>Expires: {moment(alert?.expires).format("YYYY-MM-GG HH:MM")}</h2>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            )}
        </main>
    )
}
